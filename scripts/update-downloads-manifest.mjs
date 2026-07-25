import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const defaultRepository = 'campfirium/foliole';
const defaultOutput = 'content/downloads.json';

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function versionFromTag(tag) {
  const version = String(tag || '').replace(/^v/u, '');
  if (!/^\d+\.\d+\.\d+(?:[-+].+)?$/u.test(version)) {
    throw new Error(`Unsupported release tag: ${tag}`);
  }
  return version;
}

function findAsset(assets, preferredNames, fallbackPattern, platform) {
  const preferred = preferredNames.map((name) => assets.find((asset) => asset.name === name)).find(Boolean);
  if (preferred) return preferred;

  const candidates = assets.filter((asset) => fallbackPattern.test(asset.name));
  if (candidates.length !== 1) {
    throw new Error(`Expected one ${platform} installer, found ${candidates.length}`);
  }
  return candidates[0];
}

export function createDownloadsManifest(release) {
  if (!release || release.draft) throw new Error('Release must be public');
  const version = versionFromTag(release.tag_name);
  const assets = Array.isArray(release.assets) ? release.assets : [];
  const macos = findAsset(
    assets,
    [`Foliole-macOS-arm64-${version}.dmg`, `Foliole-${version}-mac-arm64.dmg`],
    /foliole.*(?:macos|mac).*\.dmg$/iu,
    'macOS'
  );
  const windows = findAsset(
    assets,
    [`Foliole-Windows-x64-${version}.exe`, `Foliole-Setup-${version}-win-x64.exe`],
    /foliole.*(?:windows|win).*\.exe$/iu,
    'Windows'
  );

  return {
    version,
    tag: release.tag_name,
    releaseUrl: release.html_url,
    allReleasesUrl: `https://github.com/${defaultRepository}/releases`,
    macos: { assetName: macos.name, url: macos.browser_download_url },
    windows: { assetName: windows.name, url: windows.browser_download_url }
  };
}

async function fetchRelease(repository, tag) {
  const endpoint = tag
    ? `https://api.github.com/repos/${repository}/releases/tags/${encodeURIComponent(tag)}`
    : `https://api.github.com/repos/${repository}/releases/latest`;
  const headers = { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const response = await fetch(endpoint, { headers });
  if (!response.ok) throw new Error(`GitHub release request failed: ${response.status}`);
  return response.json();
}

async function main() {
  const repository = argumentValue('--repository') || defaultRepository;
  const output = path.resolve(argumentValue('--output') || defaultOutput);
  const releaseFile = argumentValue('--release-file');
  const release = releaseFile
    ? JSON.parse(await readFile(path.resolve(releaseFile), 'utf8'))
    : await fetchRelease(repository, argumentValue('--tag'));
  const manifest = createDownloadsManifest(release);
  await writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`[downloads] ${manifest.tag}: ${manifest.macos.assetName}, ${manifest.windows.assetName}`);
}

if (pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
