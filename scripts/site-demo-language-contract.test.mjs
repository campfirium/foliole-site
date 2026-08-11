import assert from 'node:assert/strict';
import test from 'node:test';

import { demoHref, guidesHref, locales } from '../src/lib/home-renderer.mjs';

const locale = (id) => locales.find((entry) => entry.id === id);
const manifest = {
  localePublishPacks: [
    { locale: 'en', topics: [{ canonicalPath: '/en/guides/welcome-to-foliole/' }] },
    { locale: 'zh-hans', topics: [{ canonicalPath: '/zh-hans/guides/welcome-to-foliole/' }] }
  ]
};

test('website locale links carry Demo interface language on published routes', () => {
  assert.equal(demoHref(locale('en')), '/en/demo/');
  assert.equal(demoHref(locale('de')), '/en/demo/?lang=de');
  assert.equal(demoHref(locale('pt')), '/en/demo/?lang=pt-BR');
  assert.equal(demoHref(locale('zh-Hans')), '/zh-hans/demo/');
  assert.equal(demoHref(locale('zh-Hant')), '/en/demo/?lang=zh-Hant');
});

test('Guide links preserve the same language context without inventing content routes', () => {
  assert.equal(guidesHref(locale('ja'), manifest), '/en/guides/welcome-to-foliole/?lang=ja');
  assert.equal(
    guidesHref(locale('zh-Hans'), manifest),
    '/zh-hans/guides/welcome-to-foliole/'
  );
});
