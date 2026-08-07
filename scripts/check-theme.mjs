import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const packageJson = JSON.parse(await read('package.json'));
const tokens = await read('src/tokens.css');
const patterns = await read('src/patterns.css');
const index = await read('src/index.css');

assert.equal(packageJson.name, '@hiepknor/ink-theme');
assert.equal(packageJson.peerDependencies.tailwindcss, '^4.0.0');

for (const marker of [
  '--color-bg: #ffffff;',
  '--color-surface: #ffffff;',
  '--color-line-strong: #111111;',
  '--color-fg: #111111;',
  '--color-accent: #111111;',
  '--radius-full: 0px;',
]) {
  assert.ok(tokens.includes(marker), `Missing locked token: ${marker}`);
}

for (const marker of [
  '@utility ink-tone-solid',
  '@utility ink-tone-dots',
  '@utility ink-tone-hatch',
  '@utility ink-tone-cancelled',
  '@utility ink-lift',
]) {
  assert.ok(patterns.includes(marker), `Missing public pattern: ${marker}`);
}

for (const file of ['./tokens.css', './base.css', './patterns.css']) {
  assert.ok(index.includes(`@import '${file}';`), `Default entrypoint does not import ${file}`);
}

const allowedColors = new Set(['#ffffff', '#f2f2f2', '#f6f6f6', '#e2e2e2', '#111111', '#565656', '#6b6b6b']);
for (const match of tokens.matchAll(/#[\da-fA-F]{6}\b/g)) {
  assert.ok(allowedColors.has(match[0].toLowerCase()), `Unexpected color: ${match[0]}`);
}

process.stdout.write('Ink Theme contract passed.\n');
