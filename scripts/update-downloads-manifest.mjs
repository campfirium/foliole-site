import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createDownloadsManifest } from '../src/lib/downloads.mjs';

const defaultDirectoryUrl = 'https://campfirium.github.io/foliole/releases/downloads.json';
const defaultOutput = 'content/downloads.json';

export { createDownloadsManifest } from '../src/lib/downloads.mjs';

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function fetchDirectory(url) {
  if (url !== defaultDirectoryUrl) throw new Error('Only the verified Foliole platform download directory is allowed');
  const response = await fetch(url, { headers: { Accept: 'application/json' }, redirect: 'error', signal: AbortSignal.timeout(30_000) });
  if (!response.ok) throw new Error(`Foliole download directory request failed: ${response.status}`);
  return response.json();
}

async function main() {
  const output = path.resolve(argumentValue('--output') || defaultOutput);
  const directoryFile = argumentValue('--directory-file');
  const directory = directoryFile
    ? JSON.parse(await readFile(path.resolve(directoryFile), 'utf8'))
    : await fetchDirectory(argumentValue('--directory-url') || defaultDirectoryUrl);
  const manifest = createDownloadsManifest(directory);
  await writeFile(output, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`[downloads] product=${manifest.productVersion} platforms=${Object.keys(manifest.platforms).join(',')}`);
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
