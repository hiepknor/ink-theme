import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { tokens } from '@hiepknor/ink-tokens';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('web and native outputs share resolved semantic colors', () => {
  assert.deepEqual(nativeTokens.colors, tokens.color.semantic);
  assert.equal(nativeTokens.controlHeight.touch, 48);
  assert.equal(tokens.dimension.controlHeight.touch, '48px');
});

test('generated CSS exposes namespaced variables and compatibility theme variables', async () => {
  const [variables, theme] = await Promise.all([read('generated/tokens.css'), read('generated/theme.css')]);
  assert.ok(variables.includes('--ink-color-semantic-background: #ffffff;'));
  assert.ok(variables.includes('--ink-density-touch-control-height: 48px;'));
  assert.ok(theme.includes('--color-bg: #ffffff;'));
  assert.ok(theme.includes('--shadow-ink: 2px 2px 0 #111111;'));
});

test('package exports include typed web and React Native entrypoints', async () => {
  const packageJson = JSON.parse(await read('package.json'));
  assert.equal(packageJson.private, undefined);
  assert.equal(packageJson.publishConfig.access, 'public');
  assert.equal(packageJson.exports['.'].types, './generated/tokens.ts');
  assert.equal(packageJson.exports['./react-native'].types, './generated/react-native.ts');
  assert.equal(packageJson.exports['./tokens.css'], './generated/tokens.css');
  assert.equal(packageJson.exports['./theme.css'], './generated/theme.css');
});
