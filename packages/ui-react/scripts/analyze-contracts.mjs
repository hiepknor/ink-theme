import { parse } from '@babel/parser';
import postcss from 'postcss';

export function analyzeModuleExports(source, fileName = 'index.ts') {
  const sourceFile = parse(source, { sourceFilename: fileName, sourceType: 'module', plugins: ['typescript'] });
  const runtime = new Set();
  const types = new Set();

  for (const statement of sourceFile.program.body) {
    if (statement.type !== 'ExportNamedDeclaration') continue;
    for (const specifier of statement.specifiers) {
      if (specifier.type !== 'ExportSpecifier') continue;
      const target = statement.exportKind === 'type' || specifier.exportKind === 'type' ? types : runtime;
      target.add(specifier.exported.type === 'Identifier' ? specifier.exported.name : specifier.exported.value);
    }
  }

  return { runtime, types };
}

export function analyzeComponentRegistry(source, fileName = 'component-registry.ts') {
  const sourceFile = parse(source, { sourceFilename: fileName, sourceType: 'module', plugins: ['typescript'] });
  const names = new Set();

  function visit(node) {
    if (!node || typeof node !== 'object') return;
    if (node.type === 'ObjectExpression') {
      const fields = new Map(node.properties.filter((property) => property.type === 'ObjectProperty').map((property) => {
        const key = property.key.type === 'Identifier' ? property.key.name : property.key.value;
        return [key, property.value];
      }));
      const name = fields.get('name');
      const slug = fields.get('slug');
      if (name?.type === 'StringLiteral' && slug?.type === 'StringLiteral') names.add(name.value);
    }
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) value.forEach(visit);
      else if (value && typeof value === 'object' && 'type' in value) visit(value);
    }
  }

  visit(sourceFile.program);
  return names;
}

export function analyzeCssContract(source, from = 'styles.css') {
  const root = postcss.parse(source, { from });
  const imports = new Set();
  const selectors = [];
  const mediaQueries = new Set();

  root.walkAtRules((rule) => {
    if (rule.name === 'import') {
      const match = rule.params.match(/^(?:url\()?['"]([^'"]+)['"]\)?/);
      if (match) imports.add(match[1]);
    }
    if (rule.name === 'media') mediaQueries.add(rule.params.replace(/\s+/g, ' ').trim());
  });
  root.walkRules((rule) => selectors.push(rule.selector));

  return { imports, selectors, mediaQueries };
}

export function verifyReactSourceContract({ index, styles }) {
  const exports = analyzeModuleExports(index);
  const css = analyzeCssContract(styles);
  const requiredComponents = [
    'Avatar', 'Banner', 'Badge', 'Button', 'ButtonGroup', 'Checkbox', 'DataTable', 'DataTableFilter', 'DataTableToolbar', 'Dialog', 'EmptyState', 'ErrorBoundary', 'ErrorMessage', 'ErrorState', 'FilterChip',
    'FileList', 'FileUpload', 'FormErrorSummary', 'IconButton', 'ImageGallery', 'ImageSurface', 'InkProvider', 'Inline', 'Menu', 'Panel', 'Popover',
    'PaginationButton', 'PaginationEllipsis', 'PaginationStatus', 'RadioGroup', 'Select', 'Separator', 'Sidebar', 'Spinner', 'Stack',
    'StatusBar', 'StatusMark', 'Surface', 'Switch', 'Tabs', 'TextArea', 'TextField', 'Toolbar', 'Tooltip', 'VisuallyHidden',
  ];

  for (const component of requiredComponents) {
    if (!exports.runtime.has(component)) throw new Error(`Missing public component export: ${component}`);
  }
  if (!exports.types.has('InkDensity')) throw new Error('Missing public type export: InkDensity');
  if (!css.imports.has('@hiepknor/ink-tokens/tokens.css')) throw new Error('Missing generated token stylesheet import');

  const selectorText = css.selectors.join(',');
  for (const density of ['compact', 'touch']) {
    if (!selectorText.includes(`[data-density='${density}']`)) throw new Error(`Missing ${density} density selector`);
  }
  if (!css.selectors.some((selector) => selector.includes(':focus-visible'))) throw new Error('Missing focus-visible selector');
  if (!css.mediaQueries.has('(prefers-reduced-motion: reduce)')) throw new Error('Missing reduced-motion media query');
  if (!css.mediaQueries.has('(forced-colors: active)')) throw new Error('Missing forced-colors media query');

  return { exports, css };
}
