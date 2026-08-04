import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const siteUrl = 'https://foliole.app';
const languagePreferenceKey = 'foliole-language-manual';
const demoManifestPath = path.join(root, 'public', 'assets', 'demo', 'demo-manifest.json');
const downloadsPath = path.join(root, 'content', 'downloads.json');
const demoFallbackLocale = 'en';
const demoSiteLocaleMap = new Map([
  ['zh-hans', 'zh-hans']
]);

export const locales = [
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

function routePath(locale, page = 'home') {
  const prefix = locale.path ? `/${locale.path}` : '';
  return page === 'download' ? `${prefix}/download/` : `${prefix}/`;
}

function pageUrl(locale, page = 'home') {
  return `${siteUrl}${routePath(locale, page)}`;
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

async function readDownloads() {
  return JSON.parse(await readFile(downloadsPath, 'utf8'));
}

function demoLocale(locale) {
  return demoSiteLocaleMap.get(locale.path) ?? demoFallbackLocale;
}

function demoHref(locale, manifest) {
  return `/${demoLocale(locale)}/demo/`;
}

function guidesHref(locale, manifest) {
  const pack = manifest?.localePublishPacks?.find((entry) => entry.locale === demoLocale(locale));
  return pack?.topics?.[0]?.canonicalPath ?? `/${demoLocale(locale)}/guides/`;
}

function renderLanguageMenu(currentLocale, page = 'home') {
  return locales.map((locale) => {
    const current = locale.id === currentLocale.id ? ' aria-current="page"' : '';
    const href = page === 'download' ? routePath(locale, page) : relativeUrl(currentLocale, locale);
    return `<a href="${escapeHtml(href)}" role="menuitem"${current}>${escapeHtml(locale.name)}</a>`;
  }).join('\n                    ');
}

function renderAlternateLinks(page = 'home') {
  const links = locales.map((locale) =>
    `<link rel="alternate" hreflang="${escapeHtml(locale.hreflang)}" href="${escapeHtml(pageUrl(locale, page))}">`
  );
  links.push(`<link rel="alternate" hreflang="x-default" href="${pageUrl(localeById.get('en'), page)}">`);
  return links.join('\n    ');
}

function renderThemeConfig(content) {
  return `<script>window.FOLIOLE_PAGE_COPY=${JSON.stringify({ download: content.nav.download, theme: content.theme })};</script>`;
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

async function renderPage(localeId, page) {
  const locale = localeById.get(localeId);
  if (!locale) throw new Error(`Unknown locale: ${localeId}`);

  const templateName = page === 'download' ? 'download.html' : 'page.html';
  const template = await readFile(path.join(root, 'templates', templateName), 'utf8');
  const demoManifest = await readDemoManifest();
  const downloads = await readDownloads();
  const contentEntries = await Promise.all(locales.map(async (entry) => [entry.id, await readContent(entry)]));
  const contents = Object.fromEntries(contentEntries);
  const reference = contents.en;

  for (const entry of locales) {
    assertSameShape(reference, contents[entry.id], entry.id);
  }

  return renderTemplate(template, {
    ...contents[locale.id],
    page: {
      htmlLang: locale.htmlLang,
      url: pageUrl(locale, page),
      homeHref: routePath(locale),
      downloadHref: routePath(locale, 'download'),
      ogLocale: locale.ogLocale,
      demoHref: demoHref(locale, demoManifest),
      guidesHref: guidesHref(locale, demoManifest),
      macosDownloadHref: downloads.platforms.macos.url,
      windowsDownloadHref: downloads.platforms.windows.url,
      linuxDownloadHref: downloads.platforms.linux.url,
      alternates: renderAlternateLinks(page),
      languageMenu: renderLanguageMenu(locale, page),
      localeRedirectScript: renderLocaleRedirectScript(locale),
      themeConfig: renderThemeConfig(contents[locale.id])
    }
  });
}

export function renderHomePage(localeId) {
  return renderPage(localeId, 'home');
}

export function renderDownloadPage(localeId) {
  return renderPage(localeId, 'download');
}
