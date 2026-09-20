import assert from 'node:assert/strict';
import test from 'node:test';

import { createDownloadsManifest } from './update-downloads-manifest.mjs';
import { downloadAttributes } from '../src/lib/downloads.mjs';

function available(platform, version, asset) {
  const tag = `v${version}`;
  return {
    architectures: [platform === 'macos' ? 'arm64' : 'x64'],
    asset,
    channel: 'github-release',
    releaseUrl: `https://github.com/campfirium/foliole/releases/tag/${tag}`,
    status: 'available',
    tag,
    url: `https://github.com/campfirium/foliole/releases/download/${tag}/${asset}`,
    version
  };
}

test('preserves independent public versions and exact assets for each platform', () => {
  const manifest = createDownloadsManifest({
    schemaVersion: 1,
    productVersion: '0.8.2',
    allReleasesUrl: 'https://github.com/campfirium/foliole/releases',
    platforms: {
      macos: available('macos', '0.8.1', 'Foliole-macOS-arm64-0.8.1.dmg'),
      windows: available('windows', '0.8.2', 'Foliole-Windows-x64-0.8.2.exe')
    }
  });

  assert.equal(manifest.platforms.macos.version, '0.8.1');
  assert.equal(manifest.platforms.windows.version, '0.8.2');
});

test('rejects missing, mismatched, or non-public download links', () => {
  assert.throws(() => createDownloadsManifest({ schemaVersion: 1, platforms: { windows: { status: 'available' } } }), /is required/u);
  assert.throws(() => createDownloadsManifest({
    schemaVersion: 1,
    platforms: { windows: { ...available('windows', '0.8.2', 'Foliole.exe'), url: 'https://example.test/Foliole.exe' } }
  }), /exact Foliole Release asset/u);
});

test('rejects paths and encodings that escape the exact Release asset', () => {
  const base = available('windows', '0.8.2', 'Foliole.exe');
  for (const asset of ['../Foliole.exe', '%2e%2e/Foliole.exe', 'Foliole.exe?x=1', 'Foliole.exe#x', 'Foliole\\evil.exe', 'Foliole".exe']) {
    assert.throws(() => createDownloadsManifest({ schemaVersion: 1, platforms: {
      windows: { ...base, asset, url: `https://github.com/campfirium/foliole/releases/download/${base.tag}/${asset}` }
    } }));
  }
  for (const url of ['javascript:alert(1)', 'https://github.com.evil.test/Foliole.exe', `${base.url}?redirect=1`]) {
    assert.throws(() => createDownloadsManifest({ schemaVersion: 1, platforms: { windows: { ...base, url } } }));
  }
});

test('retired, unavailable, and missing platforms never produce a clickable URL', () => {
  for (const status of ['retired', 'unavailable']) {
    const manifest = createDownloadsManifest({ schemaVersion: 1, platforms: {
      macos: { ...available('macos', '0.8.1', 'Foliole.dmg'), status, url: 'javascript:alert(1)' }
    } });
    assert.equal(manifest.platforms.macos.url, undefined);
    assert.equal(downloadAttributes(manifest.platforms.macos), 'aria-disabled="true"');
  }
  assert.equal(downloadAttributes(undefined), 'aria-disabled="true"');
  assert.throws(() => downloadAttributes({ ...available('macos', '0.8.1', 'Foliole.dmg'), url: 'javascript:alert(1)' }));
});
