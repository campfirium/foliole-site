import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const defaultDirectoryUrl = 'https://campfirium.github.io/foliole/releases/downloads.json';
const defaultOutput = 'content/downloads.json';
const trustedDownloadPrefix = 'https://github.com/campfirium/foliole/releases/download/';

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function validateAvailablePlatform(platform, id) {
  for (const field of ['asset', 'channel', 'releaseUrl', 'tag', 'url', 'version']) {
    if (typeof platform[field] !== 'string' || !platform[field]) throw new Error(`${id}.${field} is required`);
  }
  if (!platform.url.startsWith(trustedDownloadPrefix) || !platform.url.endsWith(`/${platform.asset}`)) {
    throw new Error(`${id}.url must identify its exact Foliole Release asset`);
  }
  if (platform.tag !== `v${platform.version}` || !platform.url.includes(`/download/${platform.tag}/`)) {
    throw new Error(`${id} version, tag, and download URL must match`);
  }
  return platform;
}

export function createDownloadsManifest(directory) {
  if (directory?.schemaVersion !== 1 || !directory.platforms || typeof directory.platforms !== 'object') {
    throw new Error('Foliole platform download directory is invalid');
  }
  const platforms = Object.fromEntries(Object.entries(directory.platforms).map(([id, platform]) => {
    if (!platform || !['available', 'retired', 'unavailable'].includes(platform.status)) {
      throw new Error(`${id}.status is invalid`);
    }
    return [id, platform.status === 'available' ? validateAvailablePlatform(platform, id) : platform];
  }));
  return { ...directory, platforms };
}

async function fetchDirectory(url) {
  if (url !== defaultDirectoryUrl) throw new Error('Only the verified Foliole platform download directory is allowed');
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Foliole download directory request failed: ${response.status}`);
  return response.json();
}

async function main() {
  const output = path.resolve(argumentValue('--output') || defaultOutput);
  const directoryFile = argumentValue('--directory-file');
  const directory = directoryFile
    ? JSON.parse(await readFile(path.resolve(directoryFile), 'utf8'))
    : await fetchDirectory(argumentValue('--directory-url') || defaultDirectoryUrl);
  const manifest = createDownloadsManifest(directory);
  await writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`[downloads] product=${manifest.productVersion} platforms=${Object.keys(manifest.platforms).join(',')}`);
}

if (pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
