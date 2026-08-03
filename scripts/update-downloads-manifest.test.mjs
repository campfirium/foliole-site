import assert from 'node:assert/strict';
import test from 'node:test';

import { createDownloadsManifest } from './update-downloads-manifest.mjs';

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
