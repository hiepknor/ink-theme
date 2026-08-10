# Ink UI roadmap

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
- [x] Publish the `0.2.0` checkpoint before reorganizing the repository.
- [x] Establish the pnpm workspace foundation without changing consumer imports.
- [x] Generate cross-platform web and native tokens from one editable source.
- [x] Build the first accessible React UI vertical slice.
- [x] Complete the web and desktop UI foundation with visual and Tauri gates.
- [x] Add the first UI breadth checkpoint for application-level composition.
- [x] Complete the first UI/UX visual audit and motion pass.
- [x] Add accessible upload and image-surface workflows.
- [x] Add a controlled data-table and filter foundation.
- [x] Complete upload queues, avatars, galleries, and lightbox workflows.
- [x] Establish field, form, section, table, dialog, toast, and application error patterns.

## Milestone 1 — Theme 0.2.0

Stabilize the framework-agnostic web foundation before adding packages.

- [x] Add global and scoped square-geometry modes.
- [x] Add compiled Tailwind CSS contract tests.
- [x] Add an interactive preview for controls and geometry scope.
- [x] Finalize focus, selection, form accent, hard-shadow, and press behavior.
- [x] Verify reduced-motion and forced-colors behavior.
- [x] Document every public token and utility.
- [x] Review the npm tarball and publish the Tailwind foundation.

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

- [x] Make the repository root a private workspace.
- [x] Move the current package to `packages/tailwind`.
- [x] Move the gallery to `apps/workbench`.
- [x] Preserve all Tailwind foundation exports.
- [x] Add recursive root scripts for checks, tests, builds, and package checks.
- [x] Keep pnpm as the only task runner until orchestration is demonstrably needed.

Exit criteria:

- Existing consumer imports compile without changes.
- Each workspace builds and tests independently.
- Root verification checks every workspace.

## Milestone 3 — Cross-platform tokens

Create `@hiepknor/ink-tokens` as the single editable source of visual values.

- [x] Define primitive color, dimension, typography, motion, and shadow tokens.
- [x] Define semantic surface, ink, border, action, focus, and density tokens.
- [x] Generate CSS custom properties and Tailwind `@theme` output.
- [x] Generate resolved JSON and TypeScript constants.
- [x] Generate React Native TypeScript constants.
- [x] Reject unresolved aliases and unapproved colors during CI.
- [x] Make generated-file drift fail CI.
- [x] Re-export generated web tokens through the existing theme entrypoint.

Exit criteria:

- Generated output reproduces the `0.2.0` visual contract.
- No generated file is edited manually.
- Web and native consumers resolve values from the same token source.

## Milestone 4 — React UI vertical slice

Create `@hiepknor/ink-react` for browser, PWA, Electron, and Tauri
applications. It must work without requiring Tailwind in the consuming app.

- [x] Add `InkProvider` with `compact`, `default`, and `touch` density.
- [x] Add `Surface`.
- [x] Add `Button`.
- [x] Add `TextField`.
- [x] Add `Checkbox`.
- [x] Provide typed exports, ref forwarding, and native DOM attributes.
- [x] Add keyboard, accessibility, and interaction tests.
- [x] Add workbench examples for every state and density.
- [x] Verify tree-shaking and package contents.

Exit criteria:

- The vertical slice works in Vite without consumer Tailwind configuration.
- Components meet the contract in `docs/component-contract.md`.
- Keyboard-only use is covered by automated tests and manual review.

## Milestone 5 — Web and desktop UI foundation

- [x] Layout: `Stack`, `Inline`, `Separator`, and `VisuallyHidden`.
- [x] Actions: `IconButton` and `ButtonGroup`.
- [x] Forms: `TextArea`, `RadioGroup`, `Switch`, and `Select`.
- [x] Feedback: `Badge`, `StatusMark`, `Spinner`, and `EmptyState`.
- [x] Desktop: `Toolbar`, `Sidebar`, `Panel`, `Tabs`, and `StatusBar`.
- [x] Overlays: `Dialog`, `Popover`, `Tooltip`, and `Menu`.
- [x] Add a Tailwind-free Vite React integration example.
- [x] Add a representative Tauri integration example.
- [x] Add browser accessibility and keyboard coverage.
- [x] Add browser visual regression coverage.

Overlay components may build on accessible primitives. Ink must not implement
focus traps, dismiss layers, or floating-positioning algorithms from scratch.

Exit criteria:

- A representative web app and desktop shell use only published package APIs.
- Compact and touch densities are usable without component-specific overrides.
- Accessibility and visual checks run in CI.

## Milestone 6 — UI breadth checkpoint

- [x] Feedback: `Alert`, `Toast`, `Progress`, and `Skeleton`.
- [x] Error recovery: `ErrorMessage`, `FormErrorSummary`, `ErrorState`, and persistent `Banner`.
- [x] Disclosure: `Accordion`.
- [x] Navigation: `Breadcrumb` and `Pagination`.
- [x] Data display: semantic `Table` parts.
- [x] Data workflows: controlled `DataTable`, toolbar search, custom filters, sorting, selection, pagination, and async states.
- [x] Forms: native single-value `Combobox` suggestions.
- [x] Media: `FileUpload`, `FileList`, `ImageSurface`, `Avatar`, and `ImageGallery` with an accessible lightbox.
- [x] Add workbench examples and interaction coverage.

Exit criteria:

- Public APIs preserve native semantics and refs where applicable.
- Product data, routing, copy, and remote-search behavior stay outside Ink.
- Workbench and package-content gates cover every new component family.

## Milestone 6.1 — Component documentation and mobile quality gate

- [x] Organize the workbench into shareable family routes.
- [x] Add a typed registry for every stable component contract.
- [x] Document purpose, required states, key props, and accessibility guidance.
- [x] Add component search and a keyboard command palette.
- [x] Verify Forms, Feedback, Data, Media, Desktop, and API pages at a 390px viewport.
- [x] Enforce touch-sized targets for coarse pointers and verify forced-colors and reduced-motion behavior.
- [x] Gate registry coverage and documented defaults against public React exports.
- [x] Preserve the full native compatibility and Linux visual-regression route.

Exit criteria:

- A component contract can be found by name, family, or purpose.
- Every documented component has a direct URL and related-component navigation.
- Catalog pages do not introduce horizontal page overflow at the mobile gate.

## Milestone 6.2 — Architecture hardening

Complete this checkpoint before the native vertical slice. Keep the current
package boundaries unless a real native consumer demonstrates the need for a
shared contract package.

- [x] Validate token structure, value types, units, aliases, and platform mappings before generation.
- [x] Replace string-based package gates with semantic module and CSS checks.
- [x] Consolidate the workbench on one React application architecture.
- [x] Document aggregate CSS loading and JavaScript tree-shaking separately.
- [x] Build a three-component native architecture spike before extracting shared component types.

Exit criteria:

- Invalid token sources fail with an actionable token path.
- Public export and CSS gates cannot pass because of comments or marker strings.
- The workbench has one rendering architecture without losing visual coverage.
- Native contract extraction is supported by working web and native consumers.

## Milestone 7 — Native mobile vertical slice

Begin only after the React component contracts have stabilized through real
consumer use.

- [x] Create `@hiepknor/ink-react-native` and an Expo workbench.
- [x] Implement native `InkProvider`, `Surface`, `Button`, `TextField`, and `Checkbox`.
- [x] Share token values, density names, variants, and state contracts with web.
- [x] Keep native focus, event, overlay, and pattern rendering platform-specific.
- [x] Test representative iOS and Android configurations.

Exit criteria:

- Web and native implementations share contracts without sharing DOM or CSS.
- Touch targets, screen-reader labels, and platform interactions are verified.

## Milestone 8 — Native production validation

Grow the native renderer only through observable consumer behavior. Keep
platform APIs, navigation, and domain workflows in applications.

- [x] Turn the Expo consumer into an interactive component catalog with live density and state controls.
- [x] Add renderer-level interaction tests for press, disabled/loading, text input, validation, controlled state, and touch density.
- [x] Validate font scaling, reduced motion, screen readers, and device keyboard behavior on representative Android and iOS devices. Maintainer validation passed on 2026-08-10; the original 2026-08-09 release waiver remains recorded as release history.
- [x] Add native `IconButton`, `TextArea`, `RadioGroup`, `Switch`, and `Select` after documenting their interaction contracts.
- [x] Add native `Alert`, `Spinner`, and `Progress` feedback primitives.
- [x] Prove the package in a product-shaped deployment example before enabling publication.

Exit criteria:

- Automated tests exercise public behavior rather than implementation text.
- A maintained device matrix records Android and iOS accessibility results or explicit release waivers.
- Publication requires a product-shaped consumer validation and an explicit decision for any incomplete device rows.

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
| `@hiepknor/ink-tailwind` | `0.3.0` package rename | `1.0.0` CSS API |
| `@hiepknor/ink-tokens` | `0.1.0` CSS/TS/native output | `1.0.0` naming and alias API |
| `@hiepknor/ink-react` | `0.1.0` vertical slice | `1.0.0` component API |
| `@hiepknor/ink-react-native` | `0.1.0` mobile vertical slice | after production validation |

## Non-goals

- Product-specific navigation, data fetching, permissions, or status language.
- One rendering implementation forced across DOM and native platforms.
- A custom styling compiler or CSS-in-JS runtime.
- Simultaneous support for every UI framework.
- Premature package splitting without a real consumer boundary.

See [architecture](docs/architecture.md), [token rules](docs/tokens.md), and the
[component contract](docs/component-contract.md) for durable decisions. The
[CI/CD contract](docs/ci-cd.md) defines merge and release gates.
