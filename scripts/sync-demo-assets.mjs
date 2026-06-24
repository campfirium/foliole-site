import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.resolve(process.env.FOLIOLE_DEMO_DIST ?? path.join(root, '..', 'foliole', 'dist', 'demo'));
const targetDir = path.join(root, 'public', 'assets', 'demo');
const targetManifestPath = path.join(targetDir, 'demo-manifest.json');

function assertRelativeAssetPath(value) {
  if (typeof value !== 'string' || !value.startsWith('assets/') || value.includes('..') || path.isAbsolute(value)) {
    throw new Error(`Invalid Demo runtime asset path: ${value}`);
  }
}

async function pathExists(filePath) {
  try {
    await readFile(filePath);
    return true;
  } catch (error) {
    if (error?.code === 'ENOENT') return false;
    throw error;
  }
}

async function readSourceManifest() {
  const manifestPath = path.join(sourceDir, 'demo-manifest.json');
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read Demo manifest at ${manifestPath}: ${error.message}`);
  }

  if (manifest.contractVersion !== 3) {
    throw new Error(`Unsupported Demo manifest contractVersion: ${manifest.contractVersion}`);
  }
  if (manifest.runtime?.entry !== 'index.html') {
    throw new Error(`Unsupported Demo runtime entry: ${manifest.runtime?.entry}`);
  }
  if (!Array.isArray(manifest.runtime?.assets) || manifest.runtime.assets.length === 0) {
    throw new Error('Demo manifest must include runtime assets.');
  }
  if (!Array.isArray(manifest.localePublishPacks) || manifest.localePublishPacks.length === 0) {
    throw new Error('Demo manifest must include locale publish packs.');
  }

  return manifest;
}

async function shouldUseCommittedDemoAssets() {
  if (process.env.GITHUB_PAGES !== 'true') return false;
  if (process.env.FOLIOLE_DEMO_DIST) return false;
  if (!(await pathExists(targetManifestPath))) return false;
  console.log('[demo:sync] using committed Demo assets for GitHub Pages build');
  return true;
}

async function validateSourceArtifact(manifest) {
  if (!(await pathExists(path.join(sourceDir, manifest.runtime.entry)))) {
    throw new Error(`Missing Demo runtime entry: ${manifest.runtime.entry}`);
  }

  for (const asset of manifest.runtime.assets) {
    assertRelativeAssetPath(asset?.path);
    if (asset.type !== 'script' && asset.type !== 'style') {
      throw new Error(`Unsupported Demo runtime asset type: ${asset?.type}`);
    }
    if (!(await pathExists(path.join(sourceDir, asset.path)))) {
      throw new Error(`Missing Demo runtime asset: ${asset.path}`);
    }
  }
}

async function main() {
  if (await shouldUseCommittedDemoAssets()) return;

  const manifest = await readSourceManifest();
  await validateSourceArtifact(manifest);
  await rm(targetDir, { recursive: true, force: true });
  await mkdir(path.dirname(targetDir), { recursive: true });
  await cp(sourceDir, targetDir, { recursive: true });
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
