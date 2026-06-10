import { cp, mkdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.resolve(process.env.FOLIOLE_GUIDES_DIST ?? path.join(root, '..', 'foliole', 'dist-guides'));
const targetDir = path.join(root, 'public', 'guides-runtime');

function assertRelativeAssetPath(value) {
  if (typeof value !== 'string' || !value.startsWith('assets/') || value.includes('..') || path.isAbsolute(value)) {
    throw new Error(`Invalid Guides runtime asset path: ${value}`);
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
  const manifestPath = path.join(sourceDir, 'guides-manifest.json');
  let manifest;
  try {
    manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch (error) {
    throw new Error(`Unable to read Guides manifest at ${manifestPath}: ${error.message}`);
  }

  if (manifest.contractVersion !== 1) {
    throw new Error(`Unsupported Guides manifest contractVersion: ${manifest.contractVersion}`);
  }
  if (manifest.runtime?.entry !== 'index.html') {
    throw new Error(`Unsupported Guides runtime entry: ${manifest.runtime?.entry}`);
  }
  if (!Array.isArray(manifest.runtime?.assets) || manifest.runtime.assets.length === 0) {
    throw new Error('Guides manifest must include runtime assets.');
  }
  if (!Array.isArray(manifest.guides) || manifest.guides.length === 0) {
    throw new Error('Guides manifest must include at least one guide.');
  }

  return manifest;
}

async function validateSourceArtifact(manifest) {
  if (!(await pathExists(path.join(sourceDir, manifest.runtime.entry)))) {
    throw new Error(`Missing Guides runtime entry: ${manifest.runtime.entry}`);
  }

  for (const asset of manifest.runtime.assets) {
    assertRelativeAssetPath(asset?.path);
    if (asset.type !== 'script' && asset.type !== 'style') {
      throw new Error(`Unsupported Guides runtime asset type: ${asset?.type}`);
    }
    if (!(await pathExists(path.join(sourceDir, asset.path)))) {
      throw new Error(`Missing Guides runtime asset: ${asset.path}`);
    }
  }
}

async function main() {
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
