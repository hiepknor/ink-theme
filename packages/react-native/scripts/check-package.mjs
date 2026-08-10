import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, mkdir, rm, symlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const packed = JSON.parse(execFileSync('pnpm', ['pack', '--dry-run', '--json'], {
  cwd: packageRoot,
  encoding: 'utf8',
}));
const manifest = Array.isArray(packed) ? packed[0] : packed;
const actual = manifest.files.map(({ path: file }) => file).sort();
const modules = [
  'Alert', 'Button', 'Checkbox', 'IconButton', 'InkProvider', 'Progress',
  'RadioGroup', 'Select', 'Spinner', 'Surface', 'Switch', 'TextArea',
  'TextField', 'contracts', 'index', 'useReducedMotion',
];
const expected = [
  'LICENSE',
  'CHANGELOG.md',
  'MIGRATION.md',
  'README.md',
  'package.json',
  ...modules.map((name) => `src/${name}.${name[0] === name[0].toUpperCase() ? 'tsx' : 'ts'}`),
].sort();

assert.deepEqual(actual, expected, 'React Native package contents changed; review the public tarball allowlist');

const temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'ink-react-native-package-'));
try {
  const tarball = path.join(temporaryRoot, 'ink-react-native.tgz');
  execFileSync('pnpm', ['pack', '--out', tarball], { cwd: packageRoot, stdio: 'pipe' });
  const packedPackage = JSON.parse(execFileSync('tar', ['-xOf', tarball, 'package/package.json'], {
    encoding: 'utf8',
  }));

  assert.equal(packedPackage.private, undefined, 'React Native package must be public');
  assert.equal(packedPackage.publishConfig?.access, 'public');
  assert.equal(packedPackage.version, '1.0.1');
  assert.equal(packedPackage.main, 'src/index.ts');
  assert.equal(packedPackage.types, 'src/index.ts');
  assert.equal(packedPackage.exports?.['.']?.['react-native'], './src/index.ts');
  assert.equal(packedPackage.peerDependencies?.react, '^19.0.0');
  assert.equal(packedPackage.peerDependencies?.['react-native'], '>=0.78 <1');
  assert.equal(
    packedPackage.dependencies?.['@hiepknor/ink-tokens'],
    '^1.0.0',
    'pnpm pack must replace the workspace token dependency with its registry version',
  );

  execFileSync('tar', ['-xzf', tarball, '-C', temporaryRoot]);
  const consumerRoot = path.join(temporaryRoot, 'consumer');
  const modulesRoot = path.join(temporaryRoot, 'node_modules');
  const inkScope = path.join(modulesRoot, '@hiepknor');
  const typesScope = path.join(modulesRoot, '@types');
  await Promise.all([
    mkdir(consumerRoot, { recursive: true }),
    mkdir(inkScope, { recursive: true }),
    mkdir(typesScope, { recursive: true }),
  ]);
  await Promise.all([
    symlink(path.join(temporaryRoot, 'package'), path.join(inkScope, 'ink-react-native'), 'dir'),
    symlink(path.resolve(packageRoot, '../tokens'), path.join(inkScope, 'ink-tokens'), 'dir'),
    symlink(path.join(packageRoot, 'node_modules', 'react'), path.join(modulesRoot, 'react'), 'dir'),
    symlink(path.join(packageRoot, 'node_modules', 'react-native'), path.join(modulesRoot, 'react-native'), 'dir'),
    symlink(path.join(packageRoot, 'node_modules', '@types', 'react'), path.join(typesScope, 'react'), 'dir'),
  ]);
  await Promise.all([
    writeFile(path.join(consumerRoot, 'index.tsx'), `
      import { Button, type ButtonProps, InkProvider, resolveDensity } from '@hiepknor/ink-react-native';
      const props: ButtonProps = { children: 'Packed consumer', variant: 'primary' };
      const density = resolveDensity('default', 'touch');
      void Button; void InkProvider; void props; void density;
    `),
    writeFile(path.join(consumerRoot, 'tsconfig.json'), JSON.stringify({
      compilerOptions: {
        jsx: 'react-jsx',
        module: 'ESNext',
        moduleResolution: 'Bundler',
        noEmit: true,
        skipLibCheck: true,
        strict: true,
        target: 'ES2022',
        types: [],
      },
      include: ['index.tsx'],
    })),
  ]);

  execFileSync(path.join(packageRoot, 'node_modules', '.bin', 'tsc'), ['--project', 'tsconfig.json'], {
    cwd: consumerRoot,
    stdio: 'pipe',
  });
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}

process.stdout.write(`React Native package contents and packed consumer passed (${manifest.files.length} files).\n`);
