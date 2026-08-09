import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { imageSize } from 'image-size';
import { nativeTokens } from '../../../packages/tokens/generated/react-native.js';

const [app, manifest] = await Promise.all([
  readFile(new URL('../src/App.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../package.json', import.meta.url), 'utf8'),
]);

test('native density names and targets come from generated tokens', () => {
  assert.deepEqual(Object.keys(nativeTokens.controlHeight), ['compact', 'default', 'touch']);
  assert.deepEqual(nativeTokens.controlHeight, { compact: 32, default: 40, touch: 48 });
  assert.equal(nativeTokens.controlHeight.touch, 48);
});

test('Expo workbench consumes the public native package', () => {
  assert.match(app, /from '@hiepknor\/ink-ui-native'/);
  assert.match(manifest, /"@hiepknor\/ink-ui-native": "workspace:\*"/);
});

test('Expo consumer exercises the native component catalog', () => {
  for (const component of ['InkProvider', 'Surface', 'Button', 'TextField', 'Checkbox', 'IconButton', 'TextArea', 'RadioGroup', 'Switch', 'Select', 'Alert', 'Spinner', 'Progress']) {
    assert.match(app, new RegExp(`<${component}`));
  }
});

test('patched Metro image parser rejects a zero-length ICNS entry', () => {
  const malicious = Buffer.alloc(16);
  malicious.write('icns', 0, 'ascii');
  malicious.writeUInt32BE(16, 4);
  malicious.write('ic07', 8, 'ascii');
  malicious.writeUInt32BE(0, 12);
  assert.throws(() => imageSize(malicious), /Invalid ICNS entry length/);
});
