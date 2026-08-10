import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const result = JSON.parse(execFileSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: packageRoot,
  encoding: 'utf8',
}))[0];
const actual = result.files.map(({ path }) => path).sort();
const expected = [
  'LICENSE',
  'CHANGELOG.md',
  'MIGRATION.md',
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

const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'ink-tokens-package-'));
try {
  const packed = JSON.parse(execFileSync('npm', ['pack', '--json', '--pack-destination', temporaryRoot], {
    cwd: packageRoot,
    encoding: 'utf8',
  }))[0];
  const tarball = path.join(temporaryRoot, packed.filename);
  execFileSync('tar', ['-xzf', tarball, '-C', temporaryRoot]);
  const packedPackage = JSON.parse(await readFile(path.join(temporaryRoot, 'package', 'package.json'), 'utf8'));

  assert.equal(packedPackage.private, undefined, 'Token package must be public');
  assert.equal(packedPackage.version, '1.0.0');
  assert.equal(packedPackage.publishConfig?.access, 'public');
  assert.deepEqual(packedPackage.sideEffects, ['**/*.css']);
  assert.deepEqual(packedPackage.exports, {
    '.': { types: './generated/tokens.ts', default: './generated/tokens.js' },
    './tokens.css': './generated/tokens.css',
    './theme.css': './generated/theme.css',
    './tokens.json': './generated/tokens.json',
    './react-native': { types: './generated/react-native.ts', default: './generated/react-native.js' },
  });

  const consumerRoot = path.join(temporaryRoot, 'consumer');
  const scopeRoot = path.join(consumerRoot, 'node_modules', '@hiepknor');
  await mkdir(scopeRoot, { recursive: true });
  await symlink(path.join(temporaryRoot, 'package'), path.join(scopeRoot, 'ink-tokens'), 'dir');
  await writeFile(path.join(consumerRoot, 'index.mjs'), `
    import assert from 'node:assert/strict';
    import { tokens } from '@hiepknor/ink-tokens';
    import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
    assert.equal(tokens.color.semantic.action, '#111111');
    assert.equal(tokens.dimension.controlHeight.touch, '48px');
    assert.equal(nativeTokens.colors.action, '#111111');
    assert.equal(nativeTokens.controlHeight.touch, 48);
  `);
  execFileSync(process.execPath, ['index.mjs'], { cwd: consumerRoot, stdio: 'pipe' });
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}

process.stdout.write(`Token package contents passed (${result.entryCount} files, ${result.unpackedSize} bytes).\n`);
