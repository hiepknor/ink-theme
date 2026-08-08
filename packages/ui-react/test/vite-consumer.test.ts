import assert from 'node:assert/strict';
import path from 'node:path';
import { build } from 'vite';
import { test } from 'vitest';

test('a Tailwind-free Vite consumer builds and tree-shakes unused components', async () => {
  const result = await build({
    configFile: false,
    logLevel: 'silent',
    root: path.resolve('test/fixtures/vite'),
    build: { write: false, minify: false },
  });
  if (!Array.isArray(result) && 'on' in result) throw new Error('Vite unexpectedly returned a watcher');
  const outputs = (Array.isArray(result) ? result : [result]).flatMap((item) => item.output);
  const js = outputs.filter((item) => item.type === 'chunk').map((item) => item.code).join('\n');
  const css = outputs.flatMap((item) => item.type === 'asset' && item.fileName.endsWith('.css')
    ? [String(item.source)]
    : []).join('\n');

  assert.ok(js.includes('function Button'), 'Consumer bundle is missing Button');
  for (const unused of ['function TextField', 'function Checkbox', 'function Surface']) {
    assert.ok(!js.includes(unused), `Consumer bundle retained unused export: ${unused}`);
  }
  assert.ok(!js.includes('DismissableLayer'), 'Consumer bundle retained unused overlay primitives');
  assert.ok(css.includes('.ink-ui-button'), 'Consumer bundle is missing component CSS');
  assert.ok(css.includes('--ink-color-semantic-action'), 'Consumer bundle is missing generated tokens');
});
