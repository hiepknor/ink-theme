import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const [manifest] = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: packageRoot,
  encoding: 'utf8',
}));
const actual = manifest.files.map(({ path }) => path).sort();
const modules = [
  'actions', 'button', 'checkbox', 'desktop', 'feedback', 'forms', 'index',
  'ink-provider', 'layout', 'overlays', 'shared', 'surface', 'text-field',
];
const expected = [
  'LICENSE',
  'README.md',
  'dist/styles.css',
  'package.json',
  ...modules.flatMap((name) => [`dist/${name}.d.ts`, `dist/${name}.js`]),
].sort();

assert.deepEqual(actual, expected, 'React UI package contents changed; review the public tarball allowlist');
process.stdout.write(`React UI package contents passed (${manifest.entryCount} files, ${manifest.unpackedSize} bytes).\n`);
