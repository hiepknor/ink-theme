import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');
const index = await read('src/index.ts');
const styles = await read('src/styles.css');

for (const component of [
  'Badge', 'Button', 'ButtonGroup', 'Checkbox', 'Dialog', 'EmptyState',
  'FileUpload', 'IconButton', 'ImageSurface', 'InkProvider', 'Inline', 'Menu', 'Panel', 'Popover',
  'RadioGroup', 'Select', 'Separator', 'Sidebar', 'Spinner', 'Stack',
  'StatusBar', 'StatusMark', 'Surface', 'Switch', 'Tabs', 'TextArea',
  'TextField', 'Toolbar', 'Tooltip', 'VisuallyHidden',
]) {
  assert.ok(index.includes(component), `Missing public component export: ${component}`);
}
for (const marker of [
  "@import '@hiepknor/ink-tokens/tokens.css';",
  "data-density='compact'",
  "data-density='touch'",
  ':focus-visible',
  'prefers-reduced-motion: reduce',
  'forced-colors: active',
]) {
  assert.ok(styles.includes(marker), `Missing component style contract: ${marker}`);
}
process.stdout.write('React UI source contract passed.\n');
