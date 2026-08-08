import { resolveTokens } from './lib.mjs';

const aliasPattern = /^\{[a-zA-Z0-9.]+\}$/;
const colorPattern = /^#[0-9a-f]{6}$/;
const lengthPattern = /^\d+(?:\.\d+)?px$/;
const durationPattern = /^\d+(?:\.\d+)?ms$/;

function fail(path, expectation) {
  throw new Error(`Invalid token source at ${path}: ${expectation}`);
}

function object(value, path) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(path, 'expected an object');
  return value;
}

function exactKeys(value, expected, path) {
  const target = object(value, path);
  const actual = Object.keys(target);
  for (const key of expected) if (!(key in target)) fail(path, `missing ${key}`);
  for (const key of actual) if (!expected.includes(key)) fail(`${path}.${key}`, 'unknown property');
}

function scalarMap(value, path, validate) {
  const target = object(value, path);
  if (Object.keys(target).length === 0) fail(path, 'expected at least one property');
  for (const [key, item] of Object.entries(value)) {
    const itemPath = `${path}.${key}`;
    if (item && typeof item === 'object') fail(itemPath, 'expected a scalar value');
    validate(item, itemPath);
  }
}

function match(value, pattern, path, expectation) {
  if (typeof value !== 'string' || !pattern.test(value)) fail(path, expectation);
}

export function validateTokenSource(source) {
  exactKeys(source, ['$schema', 'tokens', 'tailwind', 'native', 'allowedColors'], 'root');
  if (typeof source.$schema !== 'string' || !source.$schema) fail('root.$schema', 'expected a schema path');

  const tokens = object(source.tokens, 'root.tokens');
  exactKeys(tokens, ['color', 'dimension', 'typography', 'motion', 'shadow', 'density'], 'root.tokens');

  exactKeys(tokens.color, ['primitive', 'semantic'], 'root.tokens.color');
  scalarMap(tokens.color.primitive, 'root.tokens.color.primitive', (value, path) => match(value, colorPattern, path, 'expected a lowercase six-digit hex color'));
  scalarMap(tokens.color.semantic, 'root.tokens.color.semantic', (value, path) => match(value, aliasPattern, path, 'expected an exact token alias'));

  exactKeys(tokens.dimension, ['borderWidth', 'spacing', 'controlHeight', 'radius'], 'root.tokens.dimension');
  for (const [group, values] of Object.entries(tokens.dimension)) {
    scalarMap(values, `root.tokens.dimension.${group}`, (value, path) => match(value, lengthPattern, path, 'expected a non-negative px dimension'));
  }
  exactKeys(tokens.typography, ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight'], 'root.tokens.typography');
  scalarMap(tokens.typography.fontFamily, 'root.tokens.typography.fontFamily', (value, path) => {
    if (typeof value !== 'string' || !value.trim()) fail(path, 'expected a non-empty font stack');
  });
  scalarMap(tokens.typography.fontSize, 'root.tokens.typography.fontSize', (value, path) => match(value, lengthPattern, path, 'expected a non-negative px font size'));
  scalarMap(tokens.typography.fontWeight, 'root.tokens.typography.fontWeight', (value, path) => {
    if (!Number.isInteger(value) || value < 1 || value > 1000) fail(path, 'expected an integer from 1 to 1000');
  });
  scalarMap(tokens.typography.lineHeight, 'root.tokens.typography.lineHeight', (value, path) => {
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) fail(path, 'expected a positive unitless number');
  });

  exactKeys(tokens.motion, ['duration', 'easing'], 'root.tokens.motion');
  scalarMap(tokens.motion.duration, 'root.tokens.motion.duration', (value, path) => match(value, durationPattern, path, 'expected a non-negative ms duration'));
  scalarMap(tokens.motion.easing, 'root.tokens.motion.easing', (value, path) => {
    if (typeof value !== 'string' || !value.trim()) fail(path, 'expected a non-empty easing value');
  });
  scalarMap(tokens.shadow, 'root.tokens.shadow', (value, path) => {
    if (typeof value !== 'string' || !value.trim()) fail(path, 'expected a non-empty shadow value');
  });
  object(tokens.density, 'root.tokens.density');
  for (const [density, values] of Object.entries(tokens.density)) {
    exactKeys(values, ['controlHeight'], `root.tokens.density.${density}`);
    match(values.controlHeight, aliasPattern, `root.tokens.density.${density}.controlHeight`, 'expected an exact token alias');
  }

  scalarMap(source.tailwind, 'root.tailwind', (value, path) => match(value, aliasPattern, path, 'expected an exact token alias'));
  exactKeys(source.native, ['colors', 'spacing', 'controlHeight', 'borderWidth', 'fontSize', 'fontWeight', 'lineHeight', 'motionDuration'], 'root.native');
  scalarMap(source.native, 'root.native', (value, path) => match(value, aliasPattern, path, 'expected an exact token alias'));

  if (!Array.isArray(source.allowedColors) || source.allowedColors.length === 0) fail('root.allowedColors', 'expected a non-empty color allowlist');
  source.allowedColors.forEach((value, index) => match(value, colorPattern, `root.allowedColors.${index}`, 'expected a lowercase six-digit hex color'));
  if (new Set(source.allowedColors).size !== source.allowedColors.length) fail('root.allowedColors', 'expected unique colors');

  const { resolveValue } = resolveTokens(tokens);
  resolveValue(source.tailwind);
  resolveValue(source.native);
}
