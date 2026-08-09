import { readFile } from 'node:fs/promises';

const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const reactVersion = manifest.dependencies.react;
const rendererVersion = manifest.devDependencies['react-test-renderer'];

if (rendererVersion !== reactVersion) {
  throw new Error(`react-test-renderer ${rendererVersion} must exactly match Expo React ${reactVersion}`);
}

console.log(`Expo React and test renderer are aligned at ${reactVersion}.`);
