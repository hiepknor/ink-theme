import { readFile } from 'node:fs/promises';
import { verifyReactSourceContract } from './analyze-contracts.mjs';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const [index, styles] = await Promise.all([read('src/index.ts'), read('src/styles.css')]);

verifyReactSourceContract({ index, styles });
process.stdout.write('React UI semantic source contract passed.\n');
