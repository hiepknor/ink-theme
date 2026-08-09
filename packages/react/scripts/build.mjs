import { copyFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
execFileSync('tsc', ['-p', 'tsconfig.build.json'], { cwd: packageRoot, stdio: 'inherit' });
await copyFile(new URL('../src/styles.css', import.meta.url), new URL('../dist/styles.css', import.meta.url));
process.stdout.write('React UI package built.\n');
