import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { nativeTokens } from '../../tokens/generated/react-native.js';

const [contracts, button, checkbox, field, surface, index] = await Promise.all([
  readFile(new URL('../src/contracts.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/Button.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/Checkbox.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/TextField.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/Surface.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/index.ts', import.meta.url), 'utf8'),
]);

test('density contract comes from generated native tokens', () => {
  assert.deepEqual(nativeTokens.controlHeight, { compact: 32, default: 40, touch: 48 });
  assert.match(contracts, /keyof typeof nativeTokens\.controlHeight/);
});

test('interactive controls own native accessibility and touch sizing', () => {
  assert.match(button, /accessibilityRole="button"/);
  assert.match(button, /busy: loading, disabled: blocked/);
  assert.match(button, /minHeight: nativeTokens\.controlHeight\[density\]/);
  assert.match(checkbox, /accessibilityRole="checkbox"/);
  assert.match(checkbox, /checked, disabled: blocked/);
  assert.match(checkbox, /onCheckedChange\?\.\(!checked\)/);
  assert.match(checkbox, /minHeight: nativeTokens\.controlHeight\[density\]/);
});

test('field exposes label, invalid state, and live error semantics', () => {
  assert.match(field, /accessibilityLabelledBy=\{labelId\}/);
  assert.match(field, /aria-invalid=\{Boolean\(error\)\}/);
  assert.match(field, /accessibilityLiveRegion="polite"/);
});

test('public surface exports the five-component vertical slice', () => {
  for (const component of ['Button', 'Checkbox', 'InkProvider', 'Surface', 'TextField']) assert.match(index, new RegExp(`export \\{ ${component}`));
  assert.match(surface, /tone\?: SurfaceTone/);
});
