import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

test('exports every documented stylesheet', () => {
  assert.deepEqual(Object.keys(packageJson.exports), [
    '.',
    './tokens.css',
    './base.css',
    './patterns.css',
    './strict.css',
  ]);
});

test('does not publish accidentally before release policy is chosen', () => {
  assert.equal(packageJson.private, true);
  assert.equal(packageJson.license, 'UNLICENSED');
});
