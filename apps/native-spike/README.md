# Ink native workbench

This private Expo application exercises `@hiepknor/ink-react-native` as a real,
interactive consumer. Its component catalog covers the public native forms and
feedback surface, plus live density and controlled-state changes, without
importing DOM or CSS implementation.

The separate deployment workflow exercises validation recovery, modal
selection, status announcements, and determinate progress using only public
Ink package APIs. Manual release evidence is tracked in
[`docs/native-device-matrix.md`](../../docs/native-device-matrix.md).

The package and workbench share generated native tokens, density names, button
variants, and state intent with the web renderer. Native views, events,
accessibility props, styles, and future overlays remain platform-specific.

Run with Node 22.13 or newer:

```sh
pnpm --filter @hiepknor/ink-native-workbench start
```

CI type-checks the public package, verifies package contents and boundaries,
runs renderer-level interaction and accessibility/touch tests, and exports
Android and iOS bundles.
