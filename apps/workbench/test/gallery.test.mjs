import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [gallery, galleryCss, galleryScript, reactPreview, componentRegistry, reactIndex, feedbackSource, layoutSource, surfaceSource] = await Promise.all([
  readFile(new URL('../index.html', import.meta.url), 'utf8'),
  readFile(new URL('../gallery.css', import.meta.url), 'utf8'),
  readFile(new URL('../gallery.js', import.meta.url), 'utf8'),
  readFile(new URL('../react-preview.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../component-registry.ts', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/ui-react/src/index.ts', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/ui-react/src/feedback.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/ui-react/src/layout.tsx', import.meta.url), 'utf8'),
  readFile(new URL('../../../packages/ui-react/src/surface.tsx', import.meta.url), 'utf8'),
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

test('component registry covers every public root contract', () => {
  const publicRuntimeExports = [...reactIndex.matchAll(/export \{([^}]+)\} from/g)]
    .flatMap((match) => match[1].split(','))
    .map((entry) => entry.trim())
    .filter((entry) => entry && !entry.startsWith('type '))
    .map((entry) => entry.split(/\s+as\s+/)[0]);
  const documented = new Set([...componentRegistry.matchAll(/name: '([^']+)', slug:/g)].map((match) => match[1]));
  const composedOrUtility = new Set([
    'AccordionContent', 'AccordionItem', 'AccordionTrigger', 'BreadcrumbLink',
    'CardContent', 'CardDescription', 'CardFooter', 'CardHeader', 'CardTitle',
    'DataTableFilter', 'DataTableToolbar', 'DialogClose', 'DialogContent', 'DialogTrigger',
    'DrawerClose', 'DrawerContent', 'DrawerTrigger', 'MenuContent', 'MenuItem',
    'MenuSeparator', 'MenuTrigger', 'PaginationButton', 'PaginationEllipsis',
    'PaginationLink', 'PaginationStatus', 'PopoverContent', 'PopoverTrigger',
    'TableBody', 'TableCaption', 'TableCell', 'TableHead', 'TableHeader', 'TableRow',
    'TabsContent', 'TabsList', 'TabsTrigger', 'ToastAction', 'ToastClose',
    'ToastDescription', 'ToastProvider', 'ToastTitle', 'ToastViewport',
    'TooltipContent', 'TooltipProvider', 'TooltipTrigger', 'useInkDensity',
  ]);
  const uncovered = [...new Set(publicRuntimeExports)].filter((name) => !documented.has(name) && !composedOrUtility.has(name));
  assert.deepEqual(uncovered, [], `Undocumented public root contracts: ${uncovered.join(', ')}`);
});

test('documented public defaults match implementation', () => {
  assert.ok(componentRegistry.includes("type: 'neutral | warning | danger', defaultValue: 'warning'"));
  assert.ok(feedbackSource.includes("tone = 'warning'"));
  assert.ok(componentRegistry.includes("type: 'surface | elevated | recessed', defaultValue: 'surface'"));
  assert.ok(surfaceSource.includes("variant = 'surface'"));
  assert.ok(componentRegistry.includes("name: 'wrap', type: 'boolean', defaultValue: 'true'"));
  assert.ok(layoutSource.includes('wrap = true'));
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
