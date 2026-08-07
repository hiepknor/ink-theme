import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const gallery = await readFile(new URL('../examples/gallery/index.html', import.meta.url), 'utf8');

test('gallery reviews every public screentone recipe', () => {
  for (const utility of [
    'ink-tone-solid',
    'ink-tone-split',
    'ink-tone-dots',
    'ink-tone-hatch',
    'ink-tone-cancelled',
    'ink-tone-outline',
  ]) {
    assert.ok(gallery.includes(utility), `Gallery is missing ${utility}`);
  }
});

test('gallery keeps status meaning in visible text', () => {
  for (const label of ['Healthy', 'Starting', 'Degraded']) {
    assert.ok(gallery.includes(label), `Gallery is missing status label ${label}`);
  }
});
