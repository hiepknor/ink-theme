# Ink native workbench

This private Expo application exercises `@hiepknor/ink-ui-native` as a real
consumer. It covers `InkProvider`, `Surface`, `Button`, `TextField`, and
`Checkbox` without importing DOM or CSS implementation.

The package and workbench share generated native tokens, density names, button
variants, and state intent with the web renderer. Native views, events,
accessibility props, styles, and future overlays remain platform-specific.

Run with Node 22.13 or newer:

```sh
pnpm --filter @hiepknor/ink-native-workbench start
```

CI type-checks the public package, verifies package contents and boundaries,
tests accessibility/touch contracts, and exports Android and iOS bundles.
