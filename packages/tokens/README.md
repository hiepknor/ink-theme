# Ink Tokens

The single editable source of Ink's primitive and semantic visual values. The
generator produces browser, Tailwind, JavaScript, TypeScript, JSON, and React
Native representations from `src/tokens.json`.

The package is published independently from the platform adapters and component
implementations.

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
build independently. Before generation, the source validator rejects unknown
categories, invalid CSS units and value types, malformed or unresolved aliases,
incomplete platform mappings, duplicate allowlist entries, and circular
references. CI also fails on colors outside `allowedColors`, generated drift,
or unexpected tarball contents.

The source contract intentionally accepts `px` dimensions and `ms` durations.
The React Native output converts those values to unitless numbers; adding a new
unit therefore requires an explicit generator and contract-test change.
