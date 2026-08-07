# Ink Design System

Ink is a monochrome, square, high-density design system for web, desktop
webviews, mobile web, and future native mobile renderers.

## Workspaces

- [`packages/theme`](packages/theme) — published Tailwind CSS v4 visual foundation.
- [`apps/workbench`](apps/workbench) — private interactive visual review app.
- [`packages/tokens`](packages/tokens) — reserved for the next cross-platform token milestone.

The published theme remains `@hiepknor/ink-theme`; existing consumer imports
are unchanged after the workspace migration.

## Development

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm dev
```

See [`ROADMAP.md`](ROADMAP.md) for milestones and [`docs/architecture.md`](docs/architecture.md)
for package boundaries.
