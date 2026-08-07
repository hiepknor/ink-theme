# Ink Tokens

The single editable source of Ink's primitive and semantic visual values. The
generator produces browser, Tailwind, JavaScript, TypeScript, JSON, and React
Native representations from `src/tokens.json`.

The workspace remains private until the multi-package release gate is ready;
workspace consumers can use its final package exports now.

## Usage

```js
import { tokens } from '@hiepknor/ink-tokens';
import { nativeTokens } from '@hiepknor/ink-tokens/react-native';
```

```css
@import '@hiepknor/ink-tokens/tokens.css';
```

- `tokens.css` exposes resolved, namespaced `--ink-*` custom properties.
- `theme.css` exposes the Tailwind CSS v4 compatibility contract.
- `tokens.json` is the resolved, tool-neutral representation.
- The default and `react-native` entrypoints provide typed constants.

## Editing

Edit only `src/tokens.json`. Aliases use `{dot.separated.paths}` and may refer
to scalar values or whole groups. Then run:

```sh
pnpm --filter @hiepknor/ink-tokens build
pnpm verify
```

Generated files are committed so every consumer and the theme package can
build independently. CI fails on unresolved or circular aliases, colors
outside `allowedColors`, generated drift, or unexpected tarball contents.
