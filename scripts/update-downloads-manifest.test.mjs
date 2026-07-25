import assert from 'node:assert/strict';
import test from 'node:test';

import { createDownloadsManifest } from './update-downloads-manifest.mjs';

function asset(name) {
  return { name, browser_download_url: `https://example.test/${name}` };
}

test('creates a manifest from current legacy installer names', () => {
  const manifest = createDownloadsManifest({
    draft: false,
    tag_name: 'v0.7.0',
    html_url: 'https://github.com/campfirium/foliole/releases/tag/v0.7.0',
    assets: [
      asset('Foliole-0.7.0-mac-arm64.dmg'),
      asset('Foliole-Setup-0.7.0-win-x64.exe'),
      asset('latest.yml')
    ]
  });

  assert.equal(manifest.version, '0.7.0');
  assert.equal(manifest.macos.assetName, 'Foliole-0.7.0-mac-arm64.dmg');
  assert.equal(manifest.windows.assetName, 'Foliole-Setup-0.7.0-win-x64.exe');
});

test('prefers the public asset naming contract for future releases', () => {
  const manifest = createDownloadsManifest({
    draft: false,
    tag_name: 'v0.8.0',
    html_url: 'https://github.com/campfirium/foliole/releases/tag/v0.8.0',
    assets: [asset('Foliole-macOS-arm64-0.8.0.dmg'), asset('Foliole-Windows-x64-0.8.0.exe')]
  });

  assert.equal(manifest.macos.assetName, 'Foliole-macOS-arm64-0.8.0.dmg');
  assert.equal(manifest.windows.assetName, 'Foliole-Windows-x64-0.8.0.exe');
});

test('rejects draft releases and ambiguous installers', () => {
  assert.throws(() => createDownloadsManifest({ draft: true }), /must be public/u);
  assert.throws(() => createDownloadsManifest({
    draft: false,
    tag_name: 'v0.8.0',
    html_url: 'https://example.test/release',
    assets: [asset('Foliole-mac-arm64-a.dmg'), asset('Foliole-mac-arm64-b.dmg'), asset('Foliole-win-x64.exe')]
  }), /Expected one macOS installer/u);
});
