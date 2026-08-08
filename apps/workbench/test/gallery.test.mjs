import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [gallery, galleryCss, galleryScript, reactPreview, componentRegistry] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../gallery.css', import.meta.url), 'utf8'),
  readFile(new URL('../gallery.js', import.meta.url), 'utf8'),
  readFile(new URL('../react-preview.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../component-registry.ts', import.meta.url), 'utf8'),
]);

const packageJson = JSON.parse(
  await readFile(new URL('../../../packages/theme/package.json', import.meta.url), 'utf8'),
);

test('gallery displays the package version', () => {
  assert.ok(gallery.includes(`@hiepknor/ink-theme · ${packageJson.version}`));
});

test('workbench exercises the React vertical slice and every density', () => {
  assert.ok(gallery.includes('id="react-preview"'));
  for (const marker of ['InkProvider', 'Surface', 'Button', 'TextField', 'Checkbox']) {
    assert.ok(reactPreview.includes(marker), `React preview is missing ${marker}`);
  }
  for (const density of ['compact', 'default', 'touch']) {
    assert.ok(reactPreview.includes(`'${density}'`), `React preview is missing ${density} density`);
  }
  for (const state of ['loading', 'disabled', 'readOnly', 'error']) {
    assert.ok(reactPreview.includes(state), `React preview is missing ${state} state`);
  }
});

test('workbench exercises the web and desktop foundation', () => {
  for (const marker of [
    'ButtonGroup', 'Dialog', 'EmptyState', 'IconButton', 'Menu', 'Panel',
    'Popover', 'RadioGroup', 'Select', 'Sidebar', 'Spinner', 'StatusBar',
    'StatusMark', 'Switch', 'Tabs', 'TextArea', 'Toolbar', 'Tooltip',
  ]) {
    assert.ok(reactPreview.includes(marker), `Desktop preview is missing ${marker}`);
  }
  assert.ok(reactPreview.includes('Desktop application shell'));
});

test('workbench exercises the extended component library', () => {
  for (const marker of [
    'Accordion', 'Alert', 'Avatar', 'Banner', 'Breadcrumb', 'Combobox', 'DataTable', 'DataTableFilter', 'DataTableToolbar', 'ErrorState', 'FileList', 'FileUpload', 'FormErrorSummary', 'ImageGallery', 'ImageSurface',
    'Pagination', 'Progress', 'Skeleton', 'Table', 'Toast',
  ]) {
    assert.ok(reactPreview.includes(marker), `Extended preview is missing ${marker}`);
  }
  assert.ok(reactPreview.includes('Extended component library'));
});

test('component catalog documents public families and contracts', () => {
  for (const family of ['Forms', 'Feedback', 'Data', 'Media', 'Layout', 'Navigation', 'Overlays', 'Desktop']) {
    assert.ok(componentRegistry.includes(`'${family}'`), `Component registry is missing ${family}`);
  }
  for (const contract of ['description:', 'states:', 'accessibility:', 'props:']) {
    assert.ok(componentRegistry.includes(contract), `Component registry is missing ${contract}`);
  }
  assert.ok(reactPreview.includes('Find a component'));
  assert.ok(reactPreview.includes('ComponentDocumentation'));
});

test('gallery reviews every public screentone recipe', () => {
  for (const utility of [
    'ink-tone-solid',
    'ink-tone-split',
    'ink-tone-dots',
    'ink-tone-hatch',
    'ink-tone-cancelled',
    'ink-tone-outline',
    'ink-lift',
    'ink-lift-strong',
    'ink-inset',
    'ink-pressable',
  ]) {
    assert.ok(gallery.includes(utility), `Gallery is missing ${utility}`);
  }
});

test('gallery keeps status meaning in visible text', () => {
  for (const label of ['Healthy', 'Starting', 'Degraded']) {
    assert.ok(gallery.includes(label), `Gallery is missing status label ${label}`);
  }
});

test('gallery previews controls and interactive states', () => {
  for (const marker of ['<input', '<select', '<textarea', 'disabled', 'readonly', 'required', 'placeholder', 'aria-invalid="true"', 'focus-visible']) {
    assert.ok(gallery.includes(marker), `Gallery is missing control state ${marker}`);
  }
});

test('gallery toggles scoped strict mode without importing the global lock', () => {
  assert.ok(galleryCss.includes("@import '@hiepknor/ink-theme/scoped-strict.css';"));
  assert.ok(!galleryCss.includes("@import '@hiepknor/ink-theme/strict.css';"));
  assert.ok(gallery.includes('id="strict-toggle"'));
  assert.ok(gallery.includes('gallery-radius-sample'));
  assert.ok(galleryScript.includes("classList.toggle('ink-strict', enabled)"));
});
