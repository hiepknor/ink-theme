import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const packageJson = JSON.parse(await read('package.json'));
const tokens = await read('src/tokens.css');
const base = await read('src/base.css');
const patterns = await read('src/patterns.css');
const index = await read('src/index.css');
const strict = await read('src/strict.css');
const scopedStrict = await read('src/scoped-strict.css');

assert.equal(packageJson.name, '@hiepknor/ink-theme');
assert.equal(packageJson.version, '0.2.0');
assert.equal(packageJson.repository.url, 'https://github.com/hiepknor/ink-theme.git');
assert.equal(packageJson.peerDependencies.tailwindcss, '^4.0.0');

for (const marker of [
  '--color-bg: #ffffff;',
  '--color-surface: #ffffff;',
  '--color-elevated: #f2f2f2;',
  '--color-recessed: #f6f6f6;',
  '--color-line: #e2e2e2;',
  '--color-line-strong: #111111;',
  '--color-fg: #111111;',
  '--color-fg-2: #565656;',
  '--color-fg-3: #6b6b6b;',
  '--color-accent: #111111;',
  '--color-accent-ink: #ffffff;',
  '--color-focus: #111111;',
  '--color-selection: #111111;',
  '--color-selection-ink: #ffffff;',
  '--color-ok: #111111;',
  '--color-warn: #111111;',
  '--color-danger: #111111;',
  '--shadow-ink: 2px 2px 0 #111111;',
  '--shadow-ink-strong: 3px 3px 0 #111111;',
  '--shadow-ink-inset: inset 2px 2px 0 #e2e2e2;',
  '--radius-none: 0px;',
  '--radius-sm: 0px;',
  '--radius-md: 0px;',
  '--radius-lg: 0px;',
  '--radius-xl: 0px;',
  '--radius-2xl: 0px;',
  '--radius-3xl: 0px;',
  '--radius-full: 0px;',
]) {
  assert.ok(tokens.includes(marker), `Missing locked token: ${marker}`);
}

for (const marker of [
  '@utility ink-tone-solid',
  '@utility ink-tone-split',
  '@utility ink-tone-dots',
  '@utility ink-tone-hatch',
  '@utility ink-tone-cancelled',
  '@utility ink-tone-outline',
  '@utility ink-lift',
  '@utility ink-lift-strong',
  '@utility ink-inset',
  '@utility ink-pressable',
]) {
  assert.ok(patterns.includes(marker), `Missing public pattern: ${marker}`);
}

for (const marker of [
  '::selection',
  ':focus-visible',
  'accent-color: var(--color-accent);',
  'caret-color: var(--color-accent);',
  '@media (forced-colors: active)',
]) {
  assert.ok(base.includes(marker), `Missing base interaction contract: ${marker}`);
}

assert.match(strict, /\*,[\s\S]*::before,[\s\S]*::after[\s\S]*border-radius: 0 !important;/);
assert.ok(scopedStrict.includes('.ink-strict *'), 'Scoped strict mode must cover descendants');
assert.ok(scopedStrict.includes('border-radius: 0 !important;'), 'Scoped strict mode must lock radius');

for (const file of ['./tokens.css', './base.css', './patterns.css']) {
  assert.ok(index.includes(`@import '${file}';`), `Default entrypoint does not import ${file}`);
}

const allowedColors = new Set(['#ffffff', '#f2f2f2', '#f6f6f6', '#e2e2e2', '#111111', '#565656', '#6b6b6b']);
for (const match of tokens.matchAll(/#[\da-fA-F]{6}\b/g)) {
  assert.ok(allowedColors.has(match[0].toLowerCase()), `Unexpected color: ${match[0]}`);
}

process.stdout.write('Ink Theme contract passed.\n');
