import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('applies the stored or system theme before styles load', async () => {
  const template = await readFile('templates/page.html', 'utf8');
  const bootstrap = template.indexOf("localStorage.getItem('foliole-theme')");
  const stylesheet = template.indexOf('<link rel="stylesheet"');

  assert.ok(bootstrap >= 0);
  assert.ok(bootstrap < stylesheet);
  assert.match(template, /prefers-color-scheme: dark/u);
});

test('theme control cycles through system, light, and dark modes', async () => {
  const template = await readFile('templates/page.html', 'utf8');
  const styles = await readFile('styles.css', 'utf8');

  assert.match(template, /themeModes\[\(themeModes\.indexOf\(current\) \+ 1\) % themeModes\.length\]/u);
  assert.match(styles, /data-theme-mode="system"\] \.theme-icon-system/u);
});
