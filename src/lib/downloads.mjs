const releaseBase = 'https://github.com/campfirium/foliole/releases';
const safeSegment = /^[A-Za-z0-9][A-Za-z0-9._+-]*$/u;

function validateAvailablePlatform(platform, id) {
  for (const field of ['asset', 'channel', 'releaseUrl', 'tag', 'url', 'version']) {
    if (typeof platform[field] !== 'string' || !platform[field]) {
      throw new Error(`${id}.${field} is required`);
    }
  }
  if (!safeSegment.test(platform.asset) || !safeSegment.test(platform.tag) ||
      platform.url !== `${releaseBase}/download/${platform.tag}/${platform.asset}`) {
    throw new Error(`${id}.url must identify its exact Foliole Release asset`);
  }
  if (platform.tag !== `v${platform.version}` ||
      platform.releaseUrl !== `${releaseBase}/tag/${platform.tag}` ||
      platform.channel !== 'github-release') {
    throw new Error(`${id} version, tag, channel, and Release URL must match`);
  }
  return platform;
}

export function createDownloadsManifest(directory) {
  if (directory?.schemaVersion !== 1 || !directory.platforms ||
      typeof directory.platforms !== 'object' || Array.isArray(directory.platforms)) {
    throw new Error('Foliole platform download directory is invalid');
  }
  const platforms = Object.fromEntries(Object.entries(directory.platforms).map(([id, platform]) => {
    if (!platform || !['available', 'retired', 'unavailable'].includes(platform.status)) {
      throw new Error(`${id}.status is invalid`);
    }
    if (platform.status === 'available') return [id, validateAvailablePlatform(platform, id)];
    // Unavailable entries are metadata, never a source of clickable URLs.
    const { url, releaseUrl, ...metadata } = platform;
    return [id, metadata];
  }));
  return { ...directory, platforms };
}

export function downloadAttributes(platform) {
  if (platform?.status !== 'available') return 'aria-disabled="true"';
  const verified = validateAvailablePlatform(platform, 'download');
  return `href="${verified.url}"`;
}
