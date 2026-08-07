import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [gallery, galleryCss, galleryScript] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../gallery.css', import.meta.url), 'utf8'),
  readFile(new URL('../gallery.js', import.meta.url), 'utf8'),
]);

const packageJson = JSON.parse(
  await readFile(new URL('../../../packages/theme/package.json', import.meta.url), 'utf8'),
);

test('gallery displays the package version', () => {
  assert.ok(gallery.includes(`@hiepknor/ink-theme · ${packageJson.version}`));
});

test('gallery reviews every public screentone recipe', () => {
  for (const utility of [
    'ink-tone-solid',
    'ink-tone-split',
    'ink-tone-dots',
    'ink-tone-hatch',
    'ink-tone-cancelled',
    'ink-tone-outline',
    'ink-lift',
    'ink-lift-strong',
    'ink-inset',
    'ink-pressable',
  ]) {
    assert.ok(gallery.includes(utility), `Gallery is missing ${utility}`);
  }
});

test('gallery keeps status meaning in visible text', () => {
  for (const label of ['Healthy', 'Starting', 'Degraded']) {
    assert.ok(gallery.includes(label), `Gallery is missing status label ${label}`);
  }
});

test('gallery previews controls and interactive states', () => {
  for (const marker of ['<input', '<select', '<textarea', 'disabled', 'focus-visible']) {
    assert.ok(gallery.includes(marker), `Gallery is missing control state ${marker}`);
  }
});

test('gallery toggles scoped strict mode without importing the global lock', () => {
  assert.ok(galleryCss.includes("@import '@hiepknor/ink-theme/scoped-strict.css';"));
  assert.ok(!galleryCss.includes("@import '@hiepknor/ink-theme/strict.css';"));
  assert.ok(gallery.includes('id="strict-toggle"'));
  assert.ok(gallery.includes('gallery-radius-sample'));
  assert.ok(galleryScript.includes("classList.toggle('ink-strict', enabled)"));
});
