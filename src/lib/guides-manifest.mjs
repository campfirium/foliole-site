import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'public', 'guides-runtime', 'guides-manifest.json');
let cachedManifest;

function assertString(value, label) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Guides manifest field must be a non-empty string: ${label}`);
  }
}

function assertAsset(asset) {
  assertString(asset?.path, 'runtime.assets[].path');
  if (!asset.path.startsWith('assets/') || asset.path.includes('..') || path.isAbsolute(asset.path)) {
    throw new Error(`Invalid Guides runtime asset path: ${asset.path}`);
  }
  if (asset.type !== 'script' && asset.type !== 'style') {
    throw new Error(`Unsupported Guides runtime asset type: ${asset.type}`);
  }
}

function assertGuide(guide) {
  assertString(guide?.slug, 'guides[].slug');
  assertString(guide?.title, 'guides[].title');
  assertString(guide?.description, 'guides[].description');
  assertString(guide?.canonicalPath, 'guides[].canonicalPath');
  assertString(guide?.contentHash, 'guides[].contentHash');
  const expectedPath = `/guides/${guide.slug}/`;
  if (guide.canonicalPath !== expectedPath) {
    throw new Error(`Guide canonicalPath must be ${expectedPath}: ${guide.canonicalPath}`);
  }
}

function validateManifest(manifest) {
  if (manifest?.contractVersion !== 1) {
    throw new Error(`Unsupported Guides manifest contractVersion: ${manifest?.contractVersion}`);
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
  manifest.runtime.assets.forEach(assertAsset);
  manifest.guides.forEach(assertGuide);
  return manifest;
}

export async function getGuidesManifest() {
  if (!cachedManifest) {
    cachedManifest = validateManifest(JSON.parse(await readFile(manifestPath, 'utf8')));
  }
  return cachedManifest;
}

export async function getGuideBySlug(slug) {
  const manifest = await getGuidesManifest();
  return manifest.guides.find((guide) => guide.slug === slug);
}
