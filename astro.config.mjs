import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { cp, copyFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
  site: 'https://foliole.app',
  integrations: [
    sitemap({
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
      }
    }),
    preserveRootPublishedAssets()
  ]
});
