import assert from 'node:assert/strict';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';

test('homepage links directly to every versioned desktop installer', async () => {
  const template = await readFile('templates/page.html', 'utf8');
  assert.match(template, /class="split-download"/u);
  assert.match(template, /data-recommended-download="macos"/u);
  assert.match(template, /data-platform-download="macos"/u);
  assert.match(template, /data-platform-download="windows"/u);
  assert.match(template, /data-platform-download="linux"/u);
  assert.match(template, /\{\{\{page\.macosDownloadAttributes\}\}\}/u);
  assert.match(template, /\{\{\{page\.windowsDownloadAttributes\}\}\}/u);
  assert.match(template, /\{\{\{page\.linuxDownloadAttributes\}\}\}/u);
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

test('rendered pages exclude unsafe links from unavailable platforms', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'foliole-download-test-'));
  try {
    await cp('templates', path.join(directory, 'templates'), { recursive: true });
    await cp('content', path.join(directory, 'content'), { recursive: true });
    const downloads = JSON.parse(await readFile('content/downloads.json', 'utf8'));
    downloads.platforms.macos = { status: 'unavailable', url: 'javascript:alert(1)' };
    downloads.platforms.windows = { status: 'retired', url: 'https://example.test/old.exe' };
    await writeFile(path.join(directory, 'content/downloads.json'), JSON.stringify(downloads));
    const renderer = new URL('../src/lib/home-renderer.mjs', import.meta.url).href;
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', `
      import { renderHomePage, renderDownloadPage } from ${JSON.stringify(renderer)};
      console.log(await renderHomePage('en'));
      console.log(await renderDownloadPage('en'));
    `], { cwd: directory, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.doesNotMatch(result.stdout, /javascript:|example\.test/u);
    assert.match(result.stdout, /aria-disabled="true" data-platform-download="macos"/u);
    assert.match(result.stdout, /href="https:\/\/github\.com\/campfirium\/foliole\/releases\/download\/[^"]+" data-platform-download="linux"/u);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
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

test('build dependencies cannot use repository write credentials', async () => {
  const workflow = await readFile('.github/workflows/deploy.yml', 'utf8');
  const build = workflow.split('\n  build:\n')[1].split('\n  deploy:\n')[0];
  const manifest = workflow.split('\n  manifest:\n')[1].split('\n  build:\n')[0];
  assert.match(build, /contents: read/u);
  assert.match(build, /persist-credentials: false/u);
  assert.doesNotMatch(build, /contents: write|pages: write|id-token: write/u);
  assert.match(build, /ref: \$\{\{ needs\.manifest\.outputs\.source_sha \}\}/u);
  assert.doesNotMatch(manifest, /npm ci|npm install|npm run build/u);
  for (const command of ['test:downloads', 'test:demo-language', 'test:analytics']) {
    assert.ok(build.includes(`npm run ${command}`));
  }
});
