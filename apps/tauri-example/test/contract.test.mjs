import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const source = await readFile(new URL('../src/main.tsx', import.meta.url), 'utf8');
test('desktop example consumes only public Ink UI exports', () => {
  assert.ok(source.includes("from '@hiepknor/ink-ui-react'"));
  assert.ok(!source.includes('packages/ui-react/src'));
  for (const marker of ['Toolbar', 'Sidebar', 'Panel', 'Tabs', 'StatusBar']) assert.ok(source.includes(marker));
});
