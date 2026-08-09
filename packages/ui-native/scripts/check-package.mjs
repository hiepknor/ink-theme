import { execFileSync } from 'node:child_process';

const output = execFileSync('pnpm', ['pack', '--dry-run', '--json'], { cwd: new URL('..', import.meta.url), encoding: 'utf8' });
const result = JSON.parse(output);
const { files } = Array.isArray(result) ? result[0] : result;
const paths = new Set(files.map(({ path }) => path));

for (const required of ['package.json', 'README.md', 'LICENSE', 'src/index.ts']) {
  if (!paths.has(required)) throw new Error(`Packed native package is missing ${required}`);
}
for (const path of paths) {
  if (path.startsWith('test/') || path.startsWith('scripts/')) throw new Error(`Packed native package leaks ${path}`);
}

console.log(`Native package contains ${paths.size} intentional files.`);
