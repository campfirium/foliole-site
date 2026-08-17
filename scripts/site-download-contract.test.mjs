import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('homepage links directly to every versioned desktop installer', async () => {
  const template = await readFile('templates/page.html', 'utf8');
  assert.match(template, /class="split-download"/u);
  assert.match(template, /data-recommended-download="macos"/u);
  assert.match(template, /data-platform-download="macos"/u);
  assert.match(template, /data-platform-download="windows"/u);
  assert.match(template, /data-platform-download="linux"/u);
  assert.match(template, /\{\{page\.macosDownloadHref\}\}/u);
  assert.match(template, /\{\{page\.windowsDownloadHref\}\}/u);
  assert.match(template, /\{\{page\.linuxDownloadHref\}\}/u);
  assert.match(template, /\{\{hero\.linuxQualifier\}\}/u);
  assert.doesNotMatch(template, /productVersion|DownloadVersion/u);
  assert.doesNotMatch(template, /Installers hosted on|sourcePrefix|sourceLink/u);
});

test('download page exposes one direct row per desktop platform', async () => {
  const template = await readFile('templates/download.html', 'utf8');
  assert.match(template, /data-recommended-download="macos"/u);
  assert.match(template, /data-platform-download="macos"/u);
  assert.match(template, /data-platform-download="windows"/u);
  assert.match(template, /data-platform-download="linux"/u);
  assert.match(template, />DMG</u);
  assert.match(template, />EXE</u);
  assert.match(template, />DEB</u);
  assert.doesNotMatch(template, /Alpha expected|GitHub Releases/u);
});

test('deploy workflow updates downloads only from explicit release events', async () => {
  const workflow = await readFile('.github/workflows/deploy.yml', 'utf8');
  assert.match(workflow, /types: \[foliole-release-published\]/u);
  assert.doesNotMatch(workflow, /schedule:/u);
  assert.match(workflow, /node scripts\/update-downloads-manifest\.mjs --directory-url/u);
  assert.match(workflow, /git push origin HEAD:main/u);
  assert.doesNotMatch(workflow, /if: steps\.manifest\.outputs\.changed != 'true'/u);
});

test('deploy workflow sends one Pages artifact to Pages and the VPS origin', async () => {
  const workflow = await readFile('.github/workflows/deploy.yml', 'utf8');
  assert.equal(workflow.match(/npm run build/gu)?.length, 1);
  assert.match(workflow, /env -u FOLIOLE_DEMO_DIST npm run build/u);
  assert.match(workflow, /name: github-pages/u);
  assert.match(workflow, /actions\/upload-artifact@v4/u);
  assert.match(workflow, /actions\/download-artifact@v4/u);
  assert.match(workflow, /pages-artifact\/artifact[.]tar/u);
  assert.match(workflow, /source_sha: \$\{\{ steps\.pack\.outputs\.source_sha \}\}/u);
  assert.match(workflow, /source_sha="\$\(git rev-parse HEAD\)"/u);
  assert.match(workflow, /source_sha="\$\{\{ needs\.build\.outputs\.source_sha \}\}"/u);
  assert.match(workflow, /upload \$\{source_sha\} \$\{tree_sha\} \$\{artifact_sha\}/u);
});
