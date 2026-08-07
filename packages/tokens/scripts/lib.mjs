const aliasPattern = /\{([^{}]+)\}/g;
const colorPattern = /#[\da-fA-F]{6}\b/g;

export function getPath(root, tokenPath) {
  let value = root;
  for (const segment of tokenPath.split('.')) {
    if (value === null || typeof value !== 'object' || !(segment in value)) {
      throw new Error(`Unresolved token alias: {${tokenPath}}`);
    }
    value = value[segment];
  }
  return value;
}

export function resolveTokens(tokens) {
  const cache = new Map();
  let resolveValue;

  const resolvePath = (tokenPath, stack = []) => {
    if (cache.has(tokenPath)) return cache.get(tokenPath);
    if (stack.includes(tokenPath)) {
      throw new Error(`Circular token alias: ${[...stack, tokenPath].join(' -> ')}`);
    }
    const resolved = resolveValue(getPath(tokens, tokenPath), [...stack, tokenPath]);
    cache.set(tokenPath, resolved);
    return resolved;
  };

  resolveValue = (value, stack = []) => {
    if (Array.isArray(value)) return value.map((item) => resolveValue(item, stack));
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveValue(item, stack)]));
    }
    if (typeof value !== 'string') return value;

    const exact = value.match(/^\{([^{}]+)\}$/);
    if (exact) return resolvePath(exact[1], stack);

    return value.replace(aliasPattern, (_, tokenPath) => {
      const resolved = resolvePath(tokenPath, stack);
      if (resolved && typeof resolved === 'object') {
        throw new Error(`Object alias {${tokenPath}} cannot be embedded in a string`);
      }
      return String(resolved);
    });
  };

  return { resolved: resolveValue(tokens), resolveValue };
}

export function validateColors(source, allowedColors) {
  const allowed = new Set(allowedColors.map((color) => color.toLowerCase()));
  const visit = (value, tokenPath = []) => {
    if (Array.isArray(value)) return value.forEach((item, index) => visit(item, [...tokenPath, index]));
    if (value && typeof value === 'object') {
      return Object.entries(value).forEach(([key, item]) => visit(item, [...tokenPath, key]));
    }
    if (typeof value !== 'string') return;
    for (const match of value.matchAll(colorPattern)) {
      if (!allowed.has(match[0].toLowerCase())) {
        throw new Error(`Unapproved color ${match[0]} at ${tokenPath.join('.')}`);
      }
    }
  };
  visit(source);
}

export function flatten(value, prefix = [], output = []) {
  for (const [key, item] of Object.entries(value)) {
    const tokenPath = [...prefix, key];
    if (item && typeof item === 'object' && !Array.isArray(item)) flatten(item, tokenPath, output);
    else output.push([tokenPath, item]);
  }
  return output;
}

export function kebab(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase();
}

export function nativeValue(value) {
  if (Array.isArray(value)) return value.map(nativeValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, nativeValue(item)]));
  }
  if (typeof value === 'string' && /^-?\d+(?:\.\d+)?(?:px|ms)$/.test(value)) return Number.parseFloat(value);
  return value;
}
