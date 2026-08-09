# Native architecture spike

## Decision

Ink can support a React Native renderer without sharing DOM implementation or
CSS. The private Expo spike proves the boundary with `InkProvider`, `Button`,
and `TextField`; it is not a published package and carries no stability promise.

## Shared contract

- Generated semantic tokens and native numeric values.
- Density names: `compact`, `default`, and `touch`.
- Button variants: `primary`, `secondary`, and `quiet`.
- Disabled, loading, description, and validation state intent.

## Platform-owned implementation

- Web uses HTML, CSS, browser focus, and DOM refs.
- Native uses `Pressable`, `TextInput`, `StyleSheet`, accessibility props, and
  native refs/events.
- Overlay, keyboard, focus, and gesture behavior must remain renderer-specific.

## Extraction result

Do not create a shared component-contract package yet. The shared surface is
small, and density already derives from `@hiepknor/ink-tokens/react-native`.
Duplicating two short variant unions is less costly than coupling both
renderers prematurely. Revisit extraction when the first five native
components reveal repeated, non-platform prop contracts.

## Gate

CI runs with Node 22.13, type-checks the spike, enforces that native source does
not import DOM/CSS/Radix/web packages, and exports production Metro bundles for
both Android and iOS.
