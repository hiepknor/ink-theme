# Changelog

All notable changes to `@hiepknor/ink-react` are documented in this file.

## 1.0.0 - 2026-08-10

### Stable

- Stabilize the existing component, prop, ref, density, variant, CSS class,
  stylesheet, and package-export contract without changing the 0.1.0 runtime
  or type artifacts.
- Depend on the stable `@hiepknor/ink-tokens` 1.x line.
- Add a migration guide and reviewed SHA-256 snapshot for every public
  JavaScript, declaration, and CSS artifact.

## 0.1.0 - 2026-08-09

### Added

- Ship accessible React components for browser, PWA, Electron, and Tauri
  consumers without requiring Tailwind configuration.
- Provide shared compact, default, and touch density through `InkProvider`.
- Cover layout, actions, forms, feedback, error recovery, disclosure,
  navigation, data display, media, overlays, and desktop-shell composition.
- Preserve native DOM attributes and refs while using Radix Primitives for
  complex focus, dismissal, positioning, and keyboard behavior.
- Include aggregate Ink styles, generated token values, typed exports, and a
  Tailwind-free Vite consumer contract.
