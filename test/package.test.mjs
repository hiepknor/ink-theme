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

test('is configured as an explicit public npm package', () => {
  assert.equal(packageJson.private, undefined);
  assert.equal(packageJson.license, 'MIT');
  assert.equal(packageJson.publishConfig.access, 'public');
});
