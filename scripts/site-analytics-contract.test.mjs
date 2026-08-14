import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';
import { renderDownloadPage, renderHomePage } from '../src/lib/home-renderer.mjs';

const pageTemplate = await readFile('templates/page.html', 'utf8');
const downloadTemplate = await readFile('templates/download.html', 'utf8');
const demoShell = await readFile('src/layouts/DemoShell.astro', 'utf8');
const adapter = await readFile('public/site-analytics.js', 'utf8');

const trackerPattern = /data-domain="foliole\.app" data-api="\/analytics\/event" src="\/analytics\/script\.js"/;

test('tracks final marketing, Download, Demo and Guides routes through Foliole only', async () => {
  assert.match(await renderHomePage('de'), trackerPattern);
  assert.match(await renderDownloadPage('en'), trackerPattern);
  assert.match(demoShell, trackerPattern);

  for (const source of [pageTemplate, downloadTemplate, demoShell, adapter]) {
    assert.doesNotMatch(source, /toma\.campfirium\.com|campfirium\.com\/analytics/);
  }
});

test('the locale redirect shell starts tracking only when it stays on the root page', async () => {
  const root = await renderHomePage('en');
  assert.doesNotMatch(root, /<script defer data-domain="foliole\.app"/);
  assert.match(root, /window\.FOLIOLE_LOCALE_REDIRECTED = true;\s*window\.location\.replace/g);
  assert.match(root, /if \(window\.FOLIOLE_LOCALE_REDIRECTED\) return;/);
  assert.match(root, /tracker\.src = '\/analytics\/script\.js'/);
});

test('uses only fixed Outbound(target) and Download(platform) properties', () => {
  for (const target of ['demo', 'guides', 'github']) {
    assert.match(pageTemplate + downloadTemplate, new RegExp(`data-analytics-target="${target}"`));
    assert.match(adapter, new RegExp(`"${target}"`));
  }
  for (const platform of ['macos', 'windows', 'linux']) {
    assert.match(pageTemplate + downloadTemplate, new RegExp(`data-(?:recommended|platform)-download="${platform}"`));
    assert.match(adapter, new RegExp(`"${platform}"`));
  }
  assert.match(adapter, /plausible\("Outbound", \{ props: \{ target: target \} \}\)/);
  assert.match(adapter, /plausible\("Download", \{ props: \{ platform: platform \} \}\)/);
  assert.doesNotMatch(adapter, /\.href|textContent|innerText|document\.cookie|localStorage|filename|release/);
});

test('Demo runtime has one initial tracker and no click adapter', () => {
  assert.equal((demoShell.match(/\/analytics\/script\.js/g) ?? []).length, 1);
  assert.doesNotMatch(demoShell, /site-analytics|data-analytics-target|data-platform-download|plausible\(/);
});

test('does not publish a static /analytics path that could shadow the proxy', async () => {
  await assert.rejects(access('public/analytics'));
});
