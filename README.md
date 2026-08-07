# Ink Design System

Ink is a monochrome, square, high-density design system for web, desktop
webviews, mobile web, and future native mobile renderers.

## Workspaces

- [`packages/theme`](packages/theme) — published Tailwind CSS v4 visual foundation.
- [`packages/ui-react`](packages/ui-react) — accessible React components for web and desktop webviews.
- [`apps/workbench`](apps/workbench) — private interactive visual review app.
- [`packages/tokens`](packages/tokens) — cross-platform token source and generated adapters.

The published theme remains `@hiepknor/ink-theme`; existing consumer imports
are unchanged after the workspace migration.

## Development

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm dev
```

Edit visual values only in `packages/tokens/src/tokens.json`, then regenerate
and verify the committed platform outputs:

```sh
pnpm --filter @hiepknor/ink-tokens build
pnpm verify
```

See [`ROADMAP.md`](ROADMAP.md) for milestones and [`docs/architecture.md`](docs/architecture.md)
for package boundaries.
