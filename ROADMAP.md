# Ink Design System roadmap

Ink is evolving from a Tailwind CSS theme into a cross-platform design system
for web, desktop webviews, mobile web, and native mobile applications. Design
tokens are the shared contract; each platform keeps an appropriate renderer.

This roadmap describes sequencing, not release dates. A milestone is complete
only when all of its exit criteria pass.

## Current status

- [x] Public Tailwind CSS v4 theme package (`0.1.0`).
- [x] Token, base, pattern, global strict, and scoped strict stylesheets.
- [x] Interactive gallery with scoped strict-mode review.
- [x] Contract, compiled CSS, gallery, and package-content tests.
- [x] Reproducible pnpm install and CI configuration.
- [x] Complete the interaction and accessibility contract for `0.2.0`.
- [ ] Publish the `0.2.0` checkpoint before reorganizing the repository.

## Milestone 1 — Theme 0.2.0

Stabilize the framework-agnostic web foundation before adding packages.

- [x] Add global and scoped square-geometry modes.
- [x] Add compiled Tailwind CSS contract tests.
- [x] Add an interactive preview for controls and geometry scope.
- [x] Finalize focus, selection, form accent, hard-shadow, and press behavior.
- [x] Verify reduced-motion and forced-colors behavior.
- [x] Document every public token and utility.
- [ ] Review the npm tarball and publish `@hiepknor/ink-theme@0.2.0`.

Exit criteria:

- `pnpm verify` passes from a frozen install.
- Every public CSS entrypoint and utility has a compilation test.
- The workbench demonstrates default, interactive, disabled, and strict states.
- The `0.2.0` public contract and migration notes are documented.

## Milestone 2 — Workspace foundation

Convert the repository to a small pnpm workspace without changing the existing
theme package name or consumer import paths.

```text
packages/
  tokens/
  theme/
apps/
  workbench/
```

- [ ] Make the repository root a private workspace.
- [ ] Move the current package to `packages/theme`.
- [ ] Move the gallery to `apps/workbench`.
- [ ] Preserve all `@hiepknor/ink-theme` exports.
- [ ] Add recursive root scripts for build, test, typecheck, and package checks.
- [ ] Keep pnpm as the only task runner until orchestration is demonstrably needed.

Exit criteria:

- Existing consumer imports compile without changes.
- Each workspace builds and tests independently.
- Root verification checks every workspace.

## Milestone 3 — Cross-platform tokens

Create `@hiepknor/ink-tokens` as the single editable source of visual values.

- [ ] Define primitive color, dimension, typography, motion, and shadow tokens.
- [ ] Define semantic surface, ink, border, action, focus, and density tokens.
- [ ] Generate CSS custom properties and Tailwind `@theme` output.
- [ ] Generate resolved JSON and TypeScript constants.
- [ ] Generate React Native TypeScript constants.
- [ ] Reject unresolved aliases and unapproved colors during CI.
- [ ] Make generated-file drift fail CI.
- [ ] Re-export generated web tokens through the existing theme entrypoint.

Exit criteria:

- Generated output reproduces the `0.2.0` visual contract.
- No generated file is edited manually.
- Web and native consumers resolve values from the same token source.

## Milestone 4 — React UI vertical slice

Create `@hiepknor/ink-ui-react` for browser, PWA, Electron, and Tauri
applications. It must work without requiring Tailwind in the consuming app.

- [ ] Add `InkProvider` with `compact`, `default`, and `touch` density.
- [ ] Add `Surface`.
- [ ] Add `Button`.
- [ ] Add `TextField`.
- [ ] Add `Checkbox`.
- [ ] Provide typed exports, ref forwarding, and native DOM attributes.
- [ ] Add keyboard, accessibility, and interaction tests.
- [ ] Add workbench examples for every state and density.
- [ ] Verify tree-shaking and package contents.

Exit criteria:

- The vertical slice works in Vite without consumer Tailwind configuration.
- Components meet the contract in `docs/component-contract.md`.
- Keyboard-only use is covered by automated tests and manual review.

## Milestone 5 — Web and desktop UI foundation

- [ ] Layout: `Stack`, `Inline`, `Separator`, and `VisuallyHidden`.
- [ ] Actions: `IconButton` and `ButtonGroup`.
- [ ] Forms: `TextArea`, `RadioGroup`, `Switch`, and `Select`.
- [ ] Feedback: `Badge`, `StatusMark`, `Spinner`, and `EmptyState`.
- [ ] Desktop: `Toolbar`, `Sidebar`, `Panel`, `Tabs`, and `StatusBar`.
- [ ] Overlays: `Dialog`, `Popover`, `Tooltip`, and `Menu`.
- [ ] Add Vite React and Tauri integration examples.
- [ ] Add browser accessibility and visual regression coverage.

Overlay components may build on accessible primitives. Ink must not implement
focus traps, dismiss layers, or floating-positioning algorithms from scratch.

Exit criteria:

- A representative web app and desktop shell use only published package APIs.
- Compact and touch densities are usable without component-specific overrides.
- Accessibility and visual checks run in CI.

## Milestone 6 — Native mobile vertical slice

Begin only after the React component contracts have stabilized through real
consumer use.

- [ ] Create `@hiepknor/ink-ui-native` and an Expo workbench.
- [ ] Implement native `InkProvider`, `Surface`, `Button`, `TextField`, and `Checkbox`.
- [ ] Share token values, density names, variants, and state contracts with web.
- [ ] Keep native focus, event, overlay, and pattern rendering platform-specific.
- [ ] Test representative iOS and Android configurations.

Exit criteria:

- Web and native implementations share contracts without sharing DOM or CSS.
- Touch targets, screen-reader labels, and platform interactions are verified.

## Later, when demanded by consumers

- SwiftUI token output.
- Android Compose token output.
- Flutter token output.
- Additional web framework or Web Component renderers.
- A task orchestrator such as Turborepo.
- A dedicated documentation site.

These items are intentionally not prerequisites for the first stable web and
native packages.

## Release lines

| Package | First checkpoint | Stable contract |
| --- | --- | --- |
| `@hiepknor/ink-theme` | `0.2.0` interaction foundation | `1.0.0` CSS API |
| `@hiepknor/ink-tokens` | `0.1.0` CSS/TS/native output | `1.0.0` naming and alias API |
| `@hiepknor/ink-ui-react` | `0.1.0` vertical slice | `1.0.0` component API |
| `@hiepknor/ink-ui-native` | `0.1.0` mobile vertical slice | after production validation |

## Non-goals

- Product-specific navigation, data fetching, permissions, or status language.
- One rendering implementation forced across DOM and native platforms.
- A custom styling compiler or CSS-in-JS runtime.
- Simultaneous support for every UI framework.
- Premature package splitting without a real consumer boundary.

See [architecture](docs/architecture.md), [token rules](docs/tokens.md), and the
[component contract](docs/component-contract.md) for durable decisions.
