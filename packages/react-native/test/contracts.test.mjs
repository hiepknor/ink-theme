import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { nativeTokens } from '../../tokens/generated/react-native.js';

const [contracts, button, checkbox, field, surface, iconButton, textArea, radioGroup, switchControl, select, alert, spinner, progress, index] = await Promise.all([
  readFile(new URL('../src/contracts.ts', import.meta.url), 'utf8'),
  readFile(new URL('../src/Button.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/Checkbox.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/TextField.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/Surface.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/IconButton.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/TextArea.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/RadioGroup.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/Switch.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/Select.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/Alert.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/Spinner.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../src/Progress.tsx', import.meta.url), 'utf8'),
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

test('extended controls own native roles, state, and platform rendering', () => {
  assert.match(iconButton, /accessibilityLabel=\{label\}/);
  assert.match(iconButton, /height: size, width: size/);
  assert.match(textArea, /multiline/);
  assert.match(radioGroup, /accessibilityRole="radiogroup"/);
  assert.match(radioGroup, /accessibilityRole="radio"/);
  assert.match(switchControl, /accessibilityRole="switch"/);
  assert.match(select, /<Modal/);
  assert.match(select, /expanded: open/);
  assert.doesNotMatch(select, /Radix|document|window/u);
});

test('public surface exports the native catalog', () => {
  for (const component of ['Alert', 'Button', 'Checkbox', 'IconButton', 'InkProvider', 'Progress', 'RadioGroup', 'Select', 'Spinner', 'Surface', 'Switch', 'TextArea', 'TextField']) assert.match(index, new RegExp(`export \\{ ${component}`));
  assert.match(surface, /tone\?: SurfaceTone/);
});

test('feedback exposes live-region and bounded progress contracts', () => {
  assert.match(alert, /accessibilityLiveRegion=\{liveRegion\}/);
  assert.match(alert, /live === 'assertive' \? 'alert'/);
  assert.match(spinner, /accessibilityRole="progressbar"/);
  assert.match(progress, /Math\.min\(safeMax, Math\.max\(0, value\)\)/);
  assert.match(progress, /accessibilityValue=\{\{ min: 0, max: safeMax, now: bounded, text: valueText \}\}/);
});
