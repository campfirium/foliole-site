import assert from 'node:assert/strict';
import test from 'node:test';

import { demoHref, guidesHref, locales } from '../src/lib/home-renderer.mjs';

const locale = (id) => locales.find((entry) => entry.id === id);
const manifest = {
  localePublishPacks: [
    { locale: 'en', topics: [{ slug: 'welcome-to-foliole', canonicalPath: '/en/guides/welcome-to-foliole/' }] },
    { locale: 'zh-hans', topics: [{ slug: 'welcome-to-foliole', canonicalPath: '/zh-hans/guides/welcome-to-foliole/' }] }
  ]
};

test('website locale links use canonical Demo routes without redundant language queries', () => {
  assert.equal(demoHref(locale('en')), '/en/demo/');
  assert.equal(demoHref(locale('de')), '/de/demo/');
  assert.equal(demoHref(locale('ja')), '/ja/demo/');
  assert.equal(demoHref(locale('pt')), '/pt/demo/');
  assert.equal(demoHref(locale('zh-Hans')), '/zh-hans/demo/');
  assert.equal(demoHref(locale('zh-Hant')), '/zh-hant/demo/');
});

test('Guide links use canonical locale routes while falling back to published content', () => {
  assert.equal(guidesHref(locale('ja'), manifest), '/ja/guides/welcome-to-foliole/');
  assert.equal(
    guidesHref(locale('zh-Hans'), manifest),
    '/zh-hans/guides/welcome-to-foliole/'
  );
});
