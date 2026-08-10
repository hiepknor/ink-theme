import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const packageRoot = fileURLToPath(new URL('..', import.meta.url));
const { stdout } = await run('npm', ['pack', '--dry-run', '--json'], {
  cwd: packageRoot,
});
const [manifest] = JSON.parse(stdout);
const paths = manifest.files.map((file) => file.path).sort();

const expected = [
  'CHANGELOG.md',
  'API.md',
  'DESIGN.md',
  'GALLERY.md',
  'LICENSE',
  'MIGRATION.md',
  'README.md',
  'package.json',
  'src/index.css',
  'src/tokens.css',
  'src/base.css',
  'src/patterns.css',
  'src/strict.css',
  'src/scoped-strict.css',
].sort();

assert.deepEqual(paths, expected, 'Tailwind package contents changed; review the public tarball allowlist');

const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'ink-tailwind-package-'));
try {
  const packedResult = await run('npm', ['pack', '--json', '--pack-destination', temporaryRoot], {
    cwd: packageRoot,
  });
  const [packed] = JSON.parse(packedResult.stdout);
  await run('tar', ['-xzf', path.join(temporaryRoot, packed.filename), '-C', temporaryRoot]);
  const packedPackage = JSON.parse(await readFile(path.join(temporaryRoot, 'package', 'package.json'), 'utf8'));

  assert.equal(packedPackage.private, undefined, 'Tailwind package must be public');
  assert.equal(packedPackage.version, '1.0.0');
  assert.equal(packedPackage.publishConfig?.access, 'public');
  assert.deepEqual(packedPackage.sideEffects, ['**/*.css']);
  assert.deepEqual(packedPackage.peerDependencies, { tailwindcss: '^4.0.0' });
  assert.deepEqual(packedPackage.exports, {
    '.': './src/index.css',
    './tokens.css': './src/tokens.css',
    './base.css': './src/base.css',
    './patterns.css': './src/patterns.css',
    './strict.css': './src/strict.css',
    './scoped-strict.css': './src/scoped-strict.css',
  });
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}

process.stdout.write(`Package contents passed (${manifest.entryCount} files, ${manifest.size} bytes).\n`);
