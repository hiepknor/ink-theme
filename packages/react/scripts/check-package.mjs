import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(execFileSync('pnpm', ['pack', '--dry-run', '--json'], {
  cwd: packageRoot,
  encoding: 'utf8',
}));
const actual = manifest.files.map(({ path }) => path).sort();
const modules = [
  'actions', 'button', 'checkbox', 'data-display', 'desktop', 'disclosure',
  'feedback', 'forms', 'index', 'ink-provider', 'layout', 'media', 'navigation',
  'overlays', 'shared', 'surface', 'text-field',
];
const expected = [
  'LICENSE',
  'CHANGELOG.md',
  'README.md',
  'dist/styles.css',
  'package.json',
  ...modules.flatMap((name) => [`dist/${name}.d.ts`, `dist/${name}.js`]),
].sort();

assert.deepEqual(actual, expected, 'React UI package contents changed; review the public tarball allowlist');

const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'ink-react-package-'));
try {
  const tarball = path.join(temporaryRoot, 'ink-react.tgz');
  execFileSync('pnpm', ['pack', '--out', tarball], { cwd: packageRoot, stdio: 'pipe' });
  const packedPackage = JSON.parse(execFileSync('tar', ['-xOf', tarball, 'package/package.json'], {
    encoding: 'utf8',
  }));

  assert.equal(packedPackage.private, undefined, 'React UI package must be public');
  assert.equal(packedPackage.publishConfig?.access, 'public');
  assert.equal(
    packedPackage.dependencies?.['@hiepknor/ink-tokens'],
    '1.0.0',
    'pnpm pack must replace the workspace token dependency with its registry version',
  );

  execFileSync('tar', ['-xzf', tarball, '-C', temporaryRoot]);
  const consumerRoot = path.join(temporaryRoot, 'consumer');
  const modulesRoot = path.join(temporaryRoot, 'node_modules');
  const inkScope = path.join(modulesRoot, '@hiepknor');
  await Promise.all([
    mkdir(consumerRoot, { recursive: true }),
    mkdir(inkScope, { recursive: true }),
  ]);
  await Promise.all([
    symlink(path.join(temporaryRoot, 'package'), path.join(inkScope, 'ink-react'), 'dir'),
    symlink(path.resolve(packageRoot, '../tokens'), path.join(inkScope, 'ink-tokens'), 'dir'),
    symlink(path.join(packageRoot, 'node_modules', '@radix-ui'), path.join(modulesRoot, '@radix-ui'), 'dir'),
    symlink(path.join(packageRoot, 'node_modules', 'react'), path.join(modulesRoot, 'react'), 'dir'),
    symlink(path.join(packageRoot, 'node_modules', 'react-dom'), path.join(modulesRoot, 'react-dom'), 'dir'),
  ]);
  await Promise.all([
    writeFile(path.join(consumerRoot, 'index.html'), '<div id="root"></div><script type="module" src="/main.tsx"></script>\n'),
    writeFile(path.join(consumerRoot, 'main.tsx'), `
      import React from 'react';
      import { createRoot } from 'react-dom/client';
      import { Button, InkProvider } from '@hiepknor/ink-react';
      createRoot(document.getElementById('root')!).render(
        <InkProvider><Button variant="primary">Packed consumer</Button></InkProvider>,
      );
    `),
  ]);

  const result = await build({
    configFile: false,
    logLevel: 'silent',
    root: consumerRoot,
    build: { write: false, minify: false },
  });
  const outputs = (Array.isArray(result) ? result : [result]).flatMap((item) => item.output);
  const css = outputs.flatMap((item) => item.type === 'asset' && item.fileName.endsWith('.css')
    ? [String(item.source)]
    : []).join('\n');
  assert.ok(css.includes('.ink-ui-button'), 'Packed consumer bundle is missing component CSS');
  assert.ok(css.includes('--ink-color-semantic-action'), 'Packed consumer bundle is missing token CSS');
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}

process.stdout.write(`React UI package contents and packed consumer passed (${manifest.files.length} files).\n`);
