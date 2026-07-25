import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('homepage links directly to both versioned installers', async () => {
  const template = await readFile('templates/page.html', 'utf8');
  assert.match(template, /data-platform-download="macos"/u);
  assert.match(template, /data-platform-download="windows"/u);
  assert.match(template, /\{\{page\.macosDownloadHref\}\}/u);
  assert.match(template, /\{\{page\.windowsDownloadHref\}\}/u);
});

test('deploy workflow updates downloads only from explicit release events', async () => {
  const workflow = await readFile('.github/workflows/deploy.yml', 'utf8');
  assert.match(workflow, /types: \[foliole-release-published\]/u);
  assert.doesNotMatch(workflow, /schedule:/u);
  assert.match(workflow, /node scripts\/update-downloads-manifest\.mjs --tag/u);
  assert.match(workflow, /git push origin HEAD:main/u);
});
