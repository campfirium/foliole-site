import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const siteUrl = 'https://foliole.app';
const demoManifestPath = path.join(root, 'public', 'assets', 'demo', 'demo-manifest.json');
const demoFallbackLocale = 'en';
const demoSiteLocaleMap = new Map([
  ['zh-hans', 'zh-hans']
]);

const locales = [
  { id: 'en', path: '', htmlLang: 'en', hreflang: 'en', ogLocale: 'en_US', name: 'English' },
  { id: 'de', path: 'de', htmlLang: 'de', hreflang: 'de', ogLocale: 'de_DE', name: 'Deutsch' },
  { id: 'es', path: 'es', htmlLang: 'es', hreflang: 'es', ogLocale: 'es_ES', name: 'Español' },
  { id: 'fr', path: 'fr', htmlLang: 'fr', hreflang: 'fr', ogLocale: 'fr_FR', name: 'Français' },
  { id: 'it', path: 'it', htmlLang: 'it', hreflang: 'it', ogLocale: 'it_IT', name: 'Italiano' },
  { id: 'ja', path: 'ja', htmlLang: 'ja', hreflang: 'ja', ogLocale: 'ja_JP', name: '日本語' },
  { id: 'ko', path: 'ko', htmlLang: 'ko', hreflang: 'ko', ogLocale: 'ko_KR', name: '한국어' },
  { id: 'pl', path: 'pl', htmlLang: 'pl', hreflang: 'pl', ogLocale: 'pl_PL', name: 'Polski' },
  { id: 'pt', path: 'pt', htmlLang: 'pt', hreflang: 'pt', ogLocale: 'pt_PT', name: 'Português' },
  { id: 'ru', path: 'ru', htmlLang: 'ru', hreflang: 'ru', ogLocale: 'ru_RU', name: 'Русский' },
  { id: 'zh-Hans', path: 'zh-hans', htmlLang: 'zh-Hans', hreflang: 'zh-Hans', ogLocale: 'zh_CN', name: '简体中文' },
  { id: 'zh-Hant', path: 'zh-hant', htmlLang: 'zh-Hant', hreflang: 'zh-Hant', ogLocale: 'zh_TW', name: '繁體中文' }
];

const localeById = new Map(locales.map((locale) => [locale.id, locale]));
const languagePreferenceKey = 'foliole-language-manual';

function pageUrl(locale) {
  return locale.path ? `${siteUrl}/${locale.path}/` : `${siteUrl}/`;
}

function relativeUrl(fromLocale, toLocale) {
  if (!toLocale.path) return fromLocale.path ? '../' : '/';
  return fromLocale.path ? `../${toLocale.path}/` : `${toLocale.path}/`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getValue(source, key) {
  return key.split('.').reduce((value, part) => value?.[part], source);
}

function assertSameShape(reference, candidate, localeId, prefix = '') {
  for (const key of Object.keys(reference)) {
    const nextPrefix = prefix ? `${prefix}.${key}` : key;
    if (!(key in candidate)) {
      throw new Error(`Missing content key for ${localeId}: ${nextPrefix}`);
    }
    if (reference[key] && typeof reference[key] === 'object' && !Array.isArray(reference[key])) {
      assertSameShape(reference[key], candidate[key], localeId, nextPrefix);
    } else if (typeof candidate[key] !== 'string') {
      throw new Error(`Content key must be a string for ${localeId}: ${nextPrefix}`);
    }
  }
}

async function readContent(locale) {
  const file = path.join(root, 'content', `${locale.id}.json`);
  return JSON.parse(await readFile(file, 'utf8'));
}

async function readDemoManifest() {
  try {
    return JSON.parse(await readFile(demoManifestPath, 'utf8'));
  } catch {
    return null;
  }
}

function demoLocale(locale) {
  return demoSiteLocaleMap.get(locale.path) ?? demoFallbackLocale;
}

function demoHref(locale, manifest) {
  const pack = manifest?.localePublishPacks?.find((entry) => entry.locale === demoLocale(locale));
  return pack?.topics?.[0]?.canonicalPath ?? '/demo/';
}

function renderLanguageMenu(currentLocale) {
  return locales.map((locale) => {
    const current = locale.id === currentLocale.id ? ' aria-current="page"' : '';
    return `<a href="${escapeHtml(relativeUrl(currentLocale, locale))}" role="menuitem"${current}>${escapeHtml(locale.name)}</a>`;
  }).join('\n                    ');
}

function renderAlternateLinks() {
  const links = locales.map((locale) =>
    `<link rel="alternate" hreflang="${escapeHtml(locale.hreflang)}" href="${escapeHtml(pageUrl(locale))}">`
  );
  links.push(`<link rel="alternate" hreflang="x-default" href="${siteUrl}/">`);
  return links.join('\n    ');
}

function renderThemeConfig(content) {
  return `<script>window.FOLIOLE_PAGE_COPY=${JSON.stringify({ theme: content.theme })};</script>`;
}

function renderLocaleRedirectScript(locale) {
  if (locale.id !== 'en') return '';
  const targets = {
    de: '/de/',
    es: '/es/',
    fr: '/fr/',
    it: '/it/',
    ja: '/ja/',
    ko: '/ko/',
    pl: '/pl/',
    pt: '/pt/',
    ru: '/ru/',
    'zh-hans': '/zh-hans/',
    'zh-hant': '/zh-hant/'
  };
  return `<script>
      (function () {
        var manualKey = ${JSON.stringify(languagePreferenceKey)};
        var params = new URLSearchParams(window.location.search);
        if (params.get('lang') === 'manual') {
          localStorage.setItem(manualKey, '1');
          return;
        }
        if (localStorage.getItem(manualKey)) return;
        if (window.location.pathname !== '/' && window.location.pathname !== '/index.html') return;

        var targets = ${JSON.stringify(targets)};
        var languages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ''];
        for (var i = 0; i < languages.length; i += 1) {
          var language = String(languages[i]).toLowerCase();
          if (!language) continue;
          if (language.indexOf('zh-hant') === 0 || language.indexOf('zh-tw') === 0 || language.indexOf('zh-hk') === 0 || language.indexOf('zh-mo') === 0) {
            window.location.replace(targets['zh-hant']);
            return;
          }
          if (language.indexOf('zh') === 0) {
            window.location.replace(targets['zh-hans']);
            return;
          }
          var base = language.split('-')[0];
          if (targets[base]) {
            window.location.replace(targets[base]);
            return;
          }
        }
      })();
    </script>`;
}

function renderTemplate(template, values) {
  return template
    .replace(/\{\{\{\s*([\w.]+)\s*\}\}\}/g, (_, key) => {
      const value = getValue(values, key);
      if (typeof value !== 'string') throw new Error(`Missing template value: ${key}`);
      return value;
    })
    .replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
      const value = getValue(values, key);
      if (typeof value !== 'string') throw new Error(`Missing template value: ${key}`);
      return escapeHtml(value);
    });
}

async function writePage(template, locale, content, demoManifest) {
  const html = renderTemplate(template, {
    ...content,
    page: {
      htmlLang: locale.htmlLang,
      url: pageUrl(locale),
      ogLocale: locale.ogLocale,
      demoHref: demoHref(locale, demoManifest),
      alternates: renderAlternateLinks(),
      languageMenu: renderLanguageMenu(locale),
      localeRedirectScript: renderLocaleRedirectScript(locale),
      themeConfig: renderThemeConfig(content)
    }
  });
  const outputDir = path.join(root, locale.path);
  if (locale.path) await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, 'index.html'), html);
}

async function writeSitemap() {
  const urls = locales.map((locale) => {
    const links = locales.map((alternate) =>
      `    <xhtml:link rel="alternate" hreflang="${escapeHtml(alternate.hreflang)}" href="${escapeHtml(pageUrl(alternate))}" />`
    ).join('\n');
    return `  <url>\n    <loc>${escapeHtml(pageUrl(locale))}</loc>\n${links}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${siteUrl}/" />\n  </url>`;
  }).join('\n');
  await writeFile(
    path.join(root, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
  );
}

async function main() {
  const template = await readFile(path.join(root, 'templates', 'page.html'), 'utf8');
  const demoManifest = await readDemoManifest();
  const contentEntries = await Promise.all(locales.map(async (locale) => [locale.id, await readContent(locale)]));
  const contents = Object.fromEntries(contentEntries);
  const reference = contents.en;

  for (const locale of locales) {
    if (!localeById.has(locale.id)) throw new Error(`Unknown locale: ${locale.id}`);
    assertSameShape(reference, contents[locale.id], locale.id);
  }

  await Promise.all(locales.filter((locale) => locale.path).map((locale) => rm(path.join(root, locale.path), {
    recursive: true,
    force: true
  })));
  await Promise.all(locales.map((locale) => writePage(template, locale, contents[locale.id], demoManifest)));
  await writeSitemap();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
