import assert from 'node:assert/strict';
import test from 'node:test';
import { nativeValue, resolveTokens, validateColors } from '../scripts/lib.mjs';
import { validateTokenSource } from '../scripts/validate-source.mjs';
import { readFile } from 'node:fs/promises';

const source = async () => JSON.parse(await readFile(new URL('../src/tokens.json', import.meta.url), 'utf8'));
const fixture = async (name) => {
  const value = await source();
  if (name === 'valid') return value;
  const mutation = JSON.parse(await readFile(new URL(`fixtures/${name}.json`, import.meta.url), 'utf8'));
  const segments = mutation.path.split('.');
  const key = segments.pop();
  const parent = segments.reduce((item, segment) => item[segment], value);
  if (mutation.operation === 'delete') delete parent[key];
  else parent[key] = mutation.value;
  return value;
};

test('resolves scalar, composite, and object aliases', () => {
  const source = {
    color: { black: '#111111', action: '{color.black}' },
    shadow: { lift: '2px 2px 0 {color.action}' },
    group: '{color}',
  };
  const { resolved } = resolveTokens(source);
  assert.equal(resolved.color.action, '#111111');
  assert.equal(resolved.shadow.lift, '2px 2px 0 #111111');
  assert.deepEqual(resolved.group, { black: '#111111', action: '#111111' });
});

test('rejects unresolved and circular aliases', () => {
  assert.throws(() => resolveTokens({ a: '{missing}' }), /Unresolved token alias/);
  assert.throws(() => resolveTokens({ a: '{b}', b: '{a}' }), /Circular token alias/);
});

test('rejects colors outside the approved palette', () => {
  validateColors({ approved: '#111111' }, ['#111111']);
  assert.throws(() => validateColors({ surprise: '#ff0000' }, ['#111111']), /Unapproved color #ff0000/);
});

test('converts CSS dimensions and durations for React Native', () => {
  assert.deepEqual(nativeValue({ size: '48px', duration: '160ms', color: '#111111' }), {
    size: 48,
    duration: 160,
    color: '#111111',
  });
});

test('accepts the complete source contract', async () => {
  const value = await fixture('valid');
  assert.doesNotThrow(() => validateTokenSource(value));
});

for (const [name, message] of [
  ['unknown-category', /unknown property/],
  ['invalid-unit', /expected a non-negative px dimension/],
  ['unresolved-alias', /Unresolved token alias/],
  ['malformed-alias', /expected an exact token alias/],
  ['circular-alias', /Circular token alias/],
  ['invalid-native-mapping', /missing motionDuration/],
]) {
  test(`rejects ${name.replaceAll('-', ' ')}`, async () => {
    const value = await fixture(name);
    assert.throws(() => validateTokenSource(value), message);
  });
}
