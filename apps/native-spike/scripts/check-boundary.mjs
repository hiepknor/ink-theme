import { readFile, readdir } from 'node:fs/promises';

const sourceRoot = new URL('../src/', import.meta.url);
const files = (await readdir(sourceRoot)).filter((file) => file.endsWith('.ts') || file.endsWith('.tsx'));
const forbidden = [
  ['DOM renderer', /from ['"]react-dom/],
  ['web theme', /@hiepknor\/ink-theme/],
  ['web component package', /@hiepknor\/ink-ui-react/],
  ['browser global', /\b(?:document|window)\b/],
  ['CSS import', /import\s+['"][^'"]+\.css['"]/],
  ['Radix primitive', /@radix-ui/],
];

for (const file of files) {
  const source = await readFile(new URL(file, sourceRoot), 'utf8');
  for (const [label, pattern] of forbidden) {
    if (pattern.test(source)) throw new Error(`${file} crosses the native renderer boundary: ${label}`);
  }
}

console.log(`Native renderer boundary passed for ${files.length} source files.`);
