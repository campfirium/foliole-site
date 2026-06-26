import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { cp, copyFile } from 'node:fs/promises';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteUrl = 'https://foliole.app';
const supportedDemoLocales = new Set(['en', 'zh-hans']);

function isSupportedDemoPath(pathname) {
  const locale = pathname.split('/').filter(Boolean)[0];
  return supportedDemoLocales.has(locale);
}

function readDemoSitemapLinks() {
  const manifestPath = path.resolve('public', 'assets', 'demo', 'demo-manifest.json');
  try {
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    return new Map(manifest.localePublishPacks.filter((pack) => supportedDemoLocales.has(pack.locale)).flatMap((pack) => pack.topics.map((topic) => [
      new URL(topic.canonicalPath, siteUrl).toString(),
      [
        ...topic.alternates.filter((alternate) => isSupportedDemoPath(alternate.path)).map((alternate) => ({
          hreflang: alternate.hreflang,
          url: new URL(alternate.path, siteUrl).toString()
        })),
        { hreflang: 'x-default', url: new URL(topic.xDefaultPath, siteUrl).toString() }
      ]
    ])));
  } catch {
    return new Map();
  }
}

function preserveRootPublishedAssets() {
  return {
    name: 'preserve-root-published-assets',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const outDir = fileURLToPath(dir);
        await cp('assets', path.join(outDir, 'assets'), { recursive: true });
        await copyFile('styles.css', path.join(outDir, 'styles.css'));
        await copyFile('CNAME', path.join(outDir, 'CNAME'));
        await copyFile('.nojekyll', path.join(outDir, '.nojekyll'));
      }
    }
  };
}

export default defineConfig({
  site: siteUrl,
  integrations: [
    sitemap({
      serialize(item) {
        const demoLinks = readDemoSitemapLinks().get(item.url);
        if (demoLinks) item.links = demoLinks;
        return item;
      },
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          de: 'de',
          es: 'es',
          fr: 'fr',
          it: 'it',
          ja: 'ja',
          ko: 'ko',
          pl: 'pl',
          pt: 'pt',
          ru: 'ru',
          'zh-hans': 'zh-Hans',
          'zh-hant': 'zh-Hant'
        }
      },
      namespaces: {
        xhtml: true
      },
      filter: (page) => {
        const pathname = new URL(page).pathname;
        return pathname !== '/demo/' && pathname !== '/guide/' && pathname !== '/guides/' && !pathname.startsWith('/guides/');
      }
    }),
    preserveRootPublishedAssets()
  ]
});
