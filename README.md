# Ink UI

Ink UI is a monochrome, square, high-density design system for web, desktop
webviews, mobile web, and native mobile applications.

## Workspaces

- [`packages/tailwind`](packages/tailwind) — published Tailwind CSS v4 visual foundation.
- [`packages/react`](packages/react) — accessible React components for web and desktop webviews.
- [`packages/react-native`](packages/react-native) — accessible React Native components.
- [`apps/workbench`](apps/workbench) — private interactive visual review app.
- [`apps/tauri-example`](apps/tauri-example) — representative Tauri 2 desktop integration.
- [`apps/native-spike`](apps/native-spike) — Expo catalog and product-shaped native validation app.
- [`packages/tokens`](packages/tokens) — cross-platform token source and generated adapters.

Published package names are:

- `@hiepknor/ink-tailwind`
- `@hiepknor/ink-tokens`
- `@hiepknor/ink-react`
- `@hiepknor/ink-react-native`

The React Native renderer completed its production and physical-device
accessibility validation on Android and iOS. Results and the historical initial
release waiver remain recorded in
[`docs/native-device-matrix.md`](docs/native-device-matrix.md).

## Development

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm dev
pnpm test:visual
```

Edit visual values only in `packages/tokens/src/tokens.json`, then regenerate
and verify the committed platform outputs:

```sh
pnpm --filter @hiepknor/ink-tokens build
pnpm verify
```

See [`ROADMAP.md`](ROADMAP.md) for milestones and [`docs/architecture.md`](docs/architecture.md)
for package boundaries.
