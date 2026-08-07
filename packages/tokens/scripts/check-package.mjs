import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const result = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: packageRoot,
  encoding: 'utf8',
}))[0];
const actual = result.files.map(({ path }) => path).sort();
const expected = [
  'LICENSE',
  'README.md',
  'generated/react-native.js',
  'generated/react-native.ts',
  'generated/theme.css',
  'generated/tokens.css',
  'generated/tokens.js',
  'generated/tokens.json',
  'generated/tokens.ts',
  'package.json',
].sort();

assert.deepEqual(actual, expected, 'Token package contents changed; review the public tarball allowlist');
process.stdout.write(`Token package contents passed (${result.entryCount} files, ${result.unpackedSize} bytes).\n`);
