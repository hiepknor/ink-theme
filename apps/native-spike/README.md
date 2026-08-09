# Ink native architecture spike

This private Expo application proves the platform boundary before Ink creates a
published native component package. It implements only `InkProvider`, `Button`,
and `TextField`.

The spike shares generated native tokens, density names, button variants, and
state intent with the web implementation. It deliberately uses React Native
`Pressable`, `TextInput`, accessibility props, and `StyleSheet`; it does not
import DOM elements, CSS, Radix, the web theme, or `@hiepknor/ink-ui-react`.

Run with Node 22.13 or newer:

```sh
pnpm --filter @hiepknor/ink-native-spike start
```

CI type-checks and exports the Android and iOS bundles. This is an architecture
experiment, not a published package or a stable API.
