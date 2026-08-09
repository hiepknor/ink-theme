import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { nativeTokens } from '../../../packages/tokens/generated/react-native.js';

const [contracts, button, field, provider, app] = await Promise.all([
  readFile(new URL('../src/contracts.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/Button.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/TextField.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/InkProvider.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/App.tsx', import.meta.url), 'utf8'),
]);

test('native density names and targets come from generated tokens', () => {
  assert.deepEqual(Object.keys(nativeTokens.controlHeight), ['compact', 'default', 'touch']);
  assert.deepEqual(nativeTokens.controlHeight, { compact: 32, default: 40, touch: 48 });
  assert.match(contracts, /keyof typeof nativeTokens\.controlHeight/);
});

test('native primitives use native renderers and preserve shared contracts', () => {
  assert.match(provider, /createContext<InkDensity>\('default'\)/);
  assert.match(button, /accessibilityRole="button"/);
  assert.match(button, /accessibilityState=\{\{ busy: loading, disabled: blocked \}\}/);
  assert.match(field, /<TextInput/);
  assert.match(field, /aria-invalid=\{Boolean\(error\)\}/);
  assert.match(field, /accessibilityLiveRegion="polite"/);
});

test('Expo consumer exercises all three spike components', () => {
  for (const component of ['InkProvider', 'Button', 'TextField']) {
    assert.match(app, new RegExp(`<${component}`));
  }
});
