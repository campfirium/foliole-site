import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const manifestPath = path.join(root, 'public', 'assets', 'demo', 'demo-manifest.json');
const supportedDemoLocales = new Set(['en', 'zh-hans']);
let cachedManifest;

function assertString(value, label) {
  if (typeof value !== 'string' || value.length === 0) {
    throw new Error(`Demo manifest field must be a non-empty string: ${label}`);
  }
}

function assertAsset(asset) {
  assertString(asset?.path, 'runtime.assets[].path');
  if (!asset.path.startsWith('assets/') || asset.path.includes('..') || path.isAbsolute(asset.path)) {
    throw new Error(`Invalid Demo runtime asset path: ${asset.path}`);
  }
  if (asset.type !== 'script' && asset.type !== 'style') {
    throw new Error(`Unsupported Demo runtime asset type: ${asset.type}`);
  }
}

function assertAlternate(alternate) {
  assertString(alternate?.path, 'topics[].alternates[].path');
  assertString(alternate?.hreflang, 'topics[].alternates[].hreflang');
  if (!alternate.path.startsWith('/') || alternate.path.includes('..')) {
    throw new Error(`Invalid Demo alternate path: ${alternate.path}`);
  }
}

function assertTopic(topic, pack) {
  assertString(topic?.slug, 'topics[].slug');
  assertString(topic?.title, 'topics[].title');
  assertString(topic?.description, 'topics[].description');
  assertString(topic?.canonicalPath, 'topics[].canonicalPath');
  assertString(topic?.contentHash, 'topics[].contentHash');
  if (topic.locale !== pack.locale || topic.hreflang !== pack.hreflang) {
    throw new Error(`Demo topic locale mismatch: ${topic.slug}`);
  }
  const expectedPath = `/${pack.locale}/demo/${topic.slug}/`;
  if (topic.canonicalPath !== expectedPath) {
    throw new Error(`Demo canonicalPath must be ${expectedPath}: ${topic.canonicalPath}`);
  }
  if (topic.xDefaultPath !== '/demo/') {
    throw new Error(`Demo xDefaultPath must be /demo/: ${topic.xDefaultPath}`);
  }
  if (!Array.isArray(topic.alternates) || topic.alternates.length === 0) {
    throw new Error(`Demo topic must include alternates: ${topic.slug}`);
  }
  topic.alternates.forEach(assertAlternate);
}

function validateManifest(manifest) {
  if (manifest?.contractVersion !== 3) {
    throw new Error(`Unsupported Demo manifest contractVersion: ${manifest?.contractVersion}`);
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
  manifest.runtime.assets.forEach(assertAsset);
  for (const pack of manifest.localePublishPacks) {
    assertString(pack?.locale, 'localePublishPacks[].locale');
    assertString(pack?.hreflang, 'localePublishPacks[].hreflang');
    if (!Array.isArray(pack.topics) || pack.topics.length === 0) {
      throw new Error(`Demo locale pack must include topics: ${pack.locale}`);
    }
    pack.topics.forEach((topic) => assertTopic(topic, pack));
  }
  return manifest;
}

export async function getDemoManifest() {
  if (!cachedManifest) {
    cachedManifest = validateManifest(JSON.parse(await readFile(manifestPath, 'utf8')));
  }
  return cachedManifest;
}

export async function getDemoTopics() {
  const manifest = await getDemoManifest();
  return manifest.localePublishPacks
    .filter((pack) => supportedDemoLocales.has(pack.locale))
    .flatMap((pack) => pack.topics);
}

export async function getDefaultDemoTopic() {
  const manifest = await getDemoManifest();
  return manifest.localePublishPacks.find((pack) => pack.locale === 'en')?.topics[0] ?? manifest.localePublishPacks[0].topics[0];
}

export async function getDemoTopic(locale, slug) {
  if (!supportedDemoLocales.has(locale)) return undefined;
  const manifest = await getDemoManifest();
  return manifest.localePublishPacks.find((pack) => pack.locale === locale)?.topics.find((topic) => topic.slug === slug);
}

export function getSupportedDemoAlternates(topic) {
  return topic.alternates.filter((alternate) => {
    const locale = alternate.path.split('/').filter(Boolean)[0];
    return supportedDemoLocales.has(locale);
  });
}
