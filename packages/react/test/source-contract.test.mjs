import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import { analyzeComponentRegistry, analyzeCssContract, analyzeModuleExports, verifyReactSourceContract } from '../scripts/analyze-contracts.mjs';

const packageRoot = process.cwd();
const readPackageFile = (filePath) => readFile(path.join(packageRoot, filePath), 'utf8');

describe('semantic package contract gates', () => {
  test('accepts the public module and component stylesheet', async () => {
    const [index, styles] = await Promise.all([readPackageFile('src/index.ts'), readPackageFile('src/styles.css')]);
    expect(() => verifyReactSourceContract({ index, styles })).not.toThrow();
  });

  test('does not treat comments or string literals as module exports', () => {
    const result = analyzeModuleExports(`
      // export { Button } from './button.js';
      const marker = "export { Surface }";
      export type { InkDensity } from './shared.js';
    `);
    expect([...result.runtime]).toEqual([]);
    expect([...result.types]).toEqual(['InkDensity']);
  });

  test('only recognizes registry objects with real name and slug fields', () => {
    const result = analyzeComponentRegistry(`
      // { name: 'CommentOnly', slug: 'comment-only' }
      const marker = "{ name: 'StringOnly', slug: 'string-only' }";
      const registry = [{ name: 'Button', slug: 'button', props: [{ name: 'variant' }] }];
    `);
    expect([...result]).toEqual(['Button']);
  });

  test('does not treat CSS comments or declaration strings as structural contracts', () => {
    const result = analyzeCssContract(`
      /* @import '@hiepknor/ink-tokens/tokens.css'; */
      /* .ink-ui-button[data-density='touch']:focus-visible {} */
      .example { content: '(forced-colors: active)'; }
    `);
    expect([...result.imports]).toEqual([]);
    expect(result.selectors).toEqual(['.example']);
    expect([...result.mediaQueries]).toEqual([]);
  });
});
