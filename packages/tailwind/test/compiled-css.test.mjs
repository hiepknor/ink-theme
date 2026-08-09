import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import test from 'node:test';
import tailwindcss from '@tailwindcss/vite';
import { build } from 'vite';

const root = fileURLToPath(new URL('./fixtures', import.meta.url));

async function compile(entry) {
  const result = await build({
    configFile: false,
    logLevel: 'silent',
    root,
    plugins: [tailwindcss()],
    build: {
      write: false,
      rollupOptions: { input: path.join(root, `${entry}.html`) },
    },
  });
  const outputs = Array.isArray(result) ? result.flatMap((item) => item.output) : result.output;
  const css = outputs.find((item) => item.type === 'asset' && item.fileName.endsWith('.css'));
  assert.ok(css, `No CSS asset was emitted for ${entry}`);
  return String(css.source);
}

test('Tailwind compiles every public token and pattern utility', async () => {
  const css = await compile('default');

  for (const marker of [
    '.bg-bg',
    '.text-fg',
    '.border-line',
    '.ink-tone-solid',
    '.ink-tone-split',
    '.ink-tone-dots',
    '.ink-tone-hatch',
    '.ink-tone-cancelled',
    '.ink-tone-outline',
    '.ink-lift',
    '.ink-lift-strong',
    '.ink-inset',
    '.ink-pressable',
  ]) {
    assert.ok(css.includes(marker), `Compiled CSS is missing ${marker}`);
  }

  assert.match(css, /--radius-full:0px/);
  assert.match(css, /\.rounded-full\{border-radius:var\(--radius-full\)\}/);
  assert.ok(css.includes('::selection'), 'Compiled CSS is missing selection colors');
  assert.ok(css.includes(':focus-visible'), 'Compiled CSS is missing the focus ring');
  assert.ok(css.includes('accent-color:var(--color-accent)'), 'Compiled CSS is missing form accent color');
  assert.ok(css.includes('font:inherit'), 'Compiled CSS is missing native control font inheritance');
  assert.ok(css.includes('cursor:not-allowed'), 'Compiled CSS is missing disabled control behavior');
  assert.ok(css.includes('prefers-reduced-motion:reduce'), 'Pressable motion preference was not emitted');
  assert.ok(css.includes('forced-colors:active'), 'Forced-colors fallback was not emitted');
  assert.ok(!css.includes('border-radius:0!important'), 'Default entrypoint enabled strict mode');
});

test('global and scoped strict entrypoints compile with distinct scope', async () => {
  const [globalCss, scopedCss] = await Promise.all([compile('strict'), compile('scoped-strict')]);

  assert.ok(globalCss.includes('border-radius:0!important'), 'Global strict lock was not emitted');
  assert.ok(!globalCss.includes('.ink-strict'), 'Global strict mode unexpectedly requires a wrapper');
  assert.ok(scopedCss.includes('.ink-strict'), 'Scoped strict wrapper was not emitted');
  assert.ok(scopedCss.includes('border-radius:0!important'), 'Scoped strict lock was not emitted');
});
