# Native architecture spike

## Decision

Ink supports a React Native renderer without sharing DOM implementation or
CSS. The original private Expo spike proved the boundary with `InkProvider`,
`Button`, and `TextField`. Milestone 7 promoted that implementation into the
versioned `@hiepknor/ink-ui-native` package and retained Expo as its consumer
workbench.

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

The native renderer is now its own package. Do not create a renderer-neutral
component-contract package yet: shared values already come from
`@hiepknor/ink-tokens/react-native`, while refs, events, focus, style props, and
accessibility props remain platform-owned. Revisit contract extraction only
when maintained web and native APIs duplicate substantial non-platform types.

## Gate

CI runs with Node 22.13, type-checks and pack-checks the native package, enforces
that native source does not import DOM/CSS/Radix/web packages, tests touch and
accessibility contracts, and exports production Metro bundles for Android and
iOS from the Expo workbench.

The workbench also runs React Native Testing Library against the public package.
These tests activate presses and text changes, verify controlled checkbox and
density state, ensure disabled/loading actions remain blocked, and assert the
touch-density target through the rendered native tree. Source analysis remains
only for package and renderer boundaries, not as a substitute for behavior.

## Extended interaction contracts

- `IconButton` requires a text accessibility label and exposes a square target
  derived from the active density.
- `TextArea` uses native multiline input semantics and the same description,
  disabled, and validation outcomes as `TextField`.
- `RadioGroup` and `Switch` are controlled and report native checked/disabled
  state; applications retain form and persistence ownership.
- `Select` is a controlled single-value choice surface rendered as a native
  modal sheet. It does not reuse the web Radix implementation or own remote
  search, navigation, or platform picker policy.
