import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { flatten, kebab, nativeValue, resolveTokens, validateColors } from './lib.mjs';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const repoRoot = fileURLToPath(new URL('../../../', import.meta.url));
const sourcePath = path.join(packageRoot, 'src/tokens.json');
const source = JSON.parse(await readFile(sourcePath, 'utf8'));

validateColors(source.tokens, source.allowedColors);
const { resolved, resolveValue } = resolveTokens(source.tokens);
const tailwind = resolveValue(source.tailwind);
const native = nativeValue(resolveValue(source.native));
const banner = '/* Generated from packages/tokens/src/tokens.json. Do not edit. */';

const variables = flatten(resolved)
  .map(([segments, value]) => `  --ink-${segments.map(kebab).join('-')}: ${value};`)
  .join('\n');
const themeVariables = Object.entries(tailwind).map(([name, value]) => `  --${name}: ${value};`).join('\n');
const json = `${JSON.stringify(resolved, null, 2)}\n`;
const jsObject = JSON.stringify(resolved, null, 2);
const nativeObject = JSON.stringify(native, null, 2);

const outputs = new Map([
  [path.join(packageRoot, 'generated/tokens.css'), `${banner}\n:root {\n${variables}\n}\n`],
  [path.join(packageRoot, 'generated/theme.css'), `${banner}\n@theme {\n${themeVariables}\n}\n`],
  [path.join(packageRoot, 'generated/tokens.json'), json],
  [path.join(packageRoot, 'generated/tokens.js'), `// Generated. Do not edit.\nexport const tokens = ${jsObject};\n`],
  [path.join(packageRoot, 'generated/tokens.ts'), `// Generated. Do not edit.\nexport const tokens = ${jsObject} as const;\nexport type InkTokens = typeof tokens;\n`],
  [path.join(packageRoot, 'generated/react-native.js'), `// Generated. Do not edit. Values with px/ms units are numbers.\nexport const nativeTokens = ${nativeObject};\n`],
  [path.join(packageRoot, 'generated/react-native.ts'), `// Generated. Do not edit. Values with px/ms units are numbers.\nexport const nativeTokens = ${nativeObject} as const;\nexport type InkNativeTokens = typeof nativeTokens;\n`],
  [path.join(repoRoot, 'packages/theme/src/tokens.css'), `${banner}\n@theme {\n${themeVariables}\n}\n`],
]);

const checking = process.argv.includes('--check');
const stale = [];
for (const [file, expected] of outputs) {
  if (checking) {
    const actual = await readFile(file, 'utf8').catch(() => '');
    if (actual !== expected) stale.push(path.relative(repoRoot, file));
  } else {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, expected);
  }
}

if (stale.length) {
  throw new Error(`Generated token output is stale:\n${stale.map((file) => `- ${file}`).join('\n')}\nRun pnpm --filter @hiepknor/ink-tokens build.`);
}

process.stdout.write(checking ? 'Generated token output is current.\n' : 'Generated token output updated.\n');
