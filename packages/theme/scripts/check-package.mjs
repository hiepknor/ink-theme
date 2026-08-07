import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);
const { stdout } = await run('npm', ['pack', '--dry-run', '--json'], {
  cwd: new URL('..', import.meta.url),
});
const [manifest] = JSON.parse(stdout);
const paths = manifest.files.map((file) => file.path);

for (const path of [
  'CHANGELOG.md',
  'API.md',
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
]) {
  assert.ok(paths.includes(path), `Published package is missing ${path}`);
}

for (const path of paths) {
  assert.ok(!/^(dist|examples|scripts|test)\//.test(path), `Unexpected published file: ${path}`);
  assert.ok(path !== 'ROADMAP.md' && !path.startsWith('docs/'), `Contributor file was published: ${path}`);
}

process.stdout.write(`Package contents passed (${manifest.entryCount} files, ${manifest.size} bytes).\n`);
