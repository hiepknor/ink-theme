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

## Stable 1.x compatibility

| Package line | Required platform peers | Shared contract |
| --- | --- | --- |
| `@hiepknor/ink-tokens@^1.0.0` | None | Web, CSS, JSON, and React Native token names and values |
| `@hiepknor/ink-tailwind@^1.0.0` | `tailwindcss@^4.0.0` | Tailwind entrypoints, variables, utilities, and strict modes |
| `@hiepknor/ink-react@^1.0.0` | React and React DOM `^18.3.0` or `^19.0.0` | Browser and desktop-webview component API using tokens 1.x |
| `@hiepknor/ink-react-native@^1.0.1` | React `^19.0.0`; React Native `>=0.78 <1` | Native component API using tokens 1.x |

Install the stable web stack with:

```sh
pnpm add @hiepknor/ink-tokens@^1.0.0 \
  @hiepknor/ink-tailwind@^1.0.0 \
  @hiepknor/ink-react@^1.0.0
pnpm add --save-dev tailwindcss@^4.0.0 @tailwindcss/vite@^4.0.0
```

Install the stable native stack in a compatible React Native or Expo app with:

```sh
pnpm add @hiepknor/ink-tokens@^1.0.0 \
  @hiepknor/ink-react-native@^1.0.1
```

Each package follows semantic versioning independently. Packages within the
same major line are intended to compose through the contracts above; consumers
should not assume their minor and patch versions advance together. Breaking
changes to public names, entrypoints, required props, value types, CSS APIs, or
documented behavior require the affected package's next major release.
Additive APIs may ship in a minor release and compatible corrections in a
patch release.

The post-1.0 registry audit on 2026-08-10 installed these package lines without
workspace links. A clean Vite consumer passed lint, TypeScript, Tailwind
compilation, and production build; a clean Expo SDK 57 consumer passed
TypeScript, Expo dependency checks, and Android and iOS production exports.

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
