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

test('website locale links carry Demo interface language on published routes', () => {
  assert.equal(demoHref(locale('en')), '/en/demo/?lang=en');
  assert.equal(demoHref(locale('de')), '/de/demo/?lang=de');
  assert.equal(demoHref(locale('ja')), '/ja/demo/?lang=ja');
  assert.equal(demoHref(locale('pt')), '/pt/demo/?lang=pt-BR');
  assert.equal(demoHref(locale('zh-Hans')), '/zh-hans/demo/?lang=zh-Hans');
  assert.equal(demoHref(locale('zh-Hant')), '/zh-hant/demo/?lang=zh-Hant');
});

test('Guide links preserve the website route while falling back to published content', () => {
  assert.equal(guidesHref(locale('ja'), manifest), '/ja/guides/welcome-to-foliole/?lang=ja');
  assert.equal(
    guidesHref(locale('zh-Hans'), manifest),
    '/zh-hans/guides/welcome-to-foliole/?lang=zh-Hans'
  );
});
