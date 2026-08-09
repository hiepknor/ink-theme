# Ink token contract

## Source hierarchy

Tokens are organized into three levels:

1. Primitive tokens store raw values such as monochrome colors and dimensions.
2. Semantic tokens describe purpose such as background, foreground, or focus.
3. Component tokens are introduced only when multiple component decisions need
   a stable shared name.

Example:

```text
color.gray.0
  -> color.surface.default
  -> button.secondary.background
```

Components should consume semantic or component tokens, not raw primitives.

## Token categories

- Color: surfaces, ink, borders, actions, focus, and selection.
- Typography: font families, sizes, weights, and line heights.
- Dimension: spacing, control sizes, border widths, and geometry.
- Density: compact, default, and touch control metrics.
- Shadow: zero-blur lift and inset recipes.
- Motion: duration and easing for state transitions.

## Density

Density and viewport are independent. A small desktop window may still use
compact pointer controls, while a large tablet needs touch targets.

| Density | Intended control height | Use case |
| --- | ---: | --- |
| `compact` | 28–32 px | Dense desktop and data tools |
| `default` | 36–40 px | General web applications |
| `touch` | 44–48 px | Touch-first mobile and tablet UI |

## Generated outputs

The token package generates:

- Tailwind `@theme` CSS.
- Plain CSS custom properties.
- Resolved JSON.
- TypeScript constants.
- React Native TypeScript constants.

The editable source is `packages/tokens/src/tokens.json`. Generated artifacts
live in `packages/tokens/generated`; the generator also writes the compatible
Tailwind output to `packages/tailwind/src/tokens.css` so existing Tailwind consumers
do not need to change imports.

Swift, Kotlin, and Dart output are added only with maintained consumers.

## Editing rules

- Edit token source files only.
- Never edit generated output manually.
- Alias semantic values to primitives instead of duplicating raw values.
- Do not remove or rename a published token outside a breaking release.
- New colors must preserve the documented monochrome contract.
- A generated-file diff must be reviewed like source code.
- CI must reject unresolved aliases and stale generated output.

Run `pnpm --filter @hiepknor/ink-tokens build` after editing the source. Run
`pnpm verify` before committing. `check` never rewrites files; it compares all
generated artifacts byte-for-byte and fails when they are stale.

## Naming rules

- Prefer purpose over appearance: `color.foreground.muted`, not `gray.600` in
  component code.
- Avoid product states such as `deployment.failed`.
- Platform output names may change casing, but their token paths remain stable.
- Compatibility aliases must be explicitly documented and tested.

## Accessibility

- Text color pairs must be checked against their intended surfaces.
- Focus indication must not rely on color alone.
- Status patterns require visible textual meaning in application code.
- Touch density must meet the component contract's minimum target size.
- Forced-colors output may simplify textures as long as textual meaning remains.
