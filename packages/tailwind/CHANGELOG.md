# Changelog

All notable changes to Ink Tailwind are documented here. The project follows
[Semantic Versioning](https://semver.org/).

## Unreleased

## 1.0.0 - 2026-08-10

### Stable

- Stabilize the existing Tailwind CSS entrypoints, theme variables, base
  interaction rules, presentation utilities, and strict-mode behavior without
  changing the 0.3.0 CSS artifacts.
- Add a reviewed SHA-256 snapshot for every public CSS artifact.
- Document the 1.x semantic-versioning contract and the no-change migration
  from 0.3.0.

## 0.3.0 - 2026-08-09

### Changed

- Rename the public package from `@hiepknor/ink-theme` to
  `@hiepknor/ink-tailwind` so its Tailwind CSS v4 dependency and adapter role
  are explicit.
- Move the workspace from `packages/theme` to `packages/tailwind` and update
  package metadata, imports, documentation, tests, CI, and release automation.
- Rename the related component packages to `@hiepknor/ink-react` and
  `@hiepknor/ink-react-native` for a consistent package family.

### Added

- Generate the existing Tailwind token contract from the shared
  `@hiepknor/ink-tokens` source used by web and React Native outputs.

### Fixed

- Pin pnpm 10 so the development and CI toolchain remains compatible with the
  package's minimum supported Node 20 runtime.

### Infrastructure

- Convert the repository to a pnpm workspace, moving the published Tailwind
  foundation to `packages/tailwind` and the preview workbench to
  `apps/workbench`.
- Add aggregate CI, dependency-review, protected-branch, and provenance release
  gates.
- Configure npm trusted publishing and repository metadata for token-free OIDC
  releases.

## 0.2.0 - 2026-08-07

### Added

- A scoped square-geometry entrypoint at `scoped-strict.css`.
- Compiled CSS contract tests and package-content verification.
- Reproducible pnpm installs and continuous integration.
- An interactive gallery for control states and scoped strict-mode review.
- Focus, selection, form accent, hard-shadow, inset, and pressable primitives.
- Reduced-motion and forced-colors fallbacks for public interaction patterns.

### Documentation

- Clarified font ownership, compatibility status tokens, and strict-mode scope.

## 0.1.0 - 2026-08-07

- Initial public release of theme tokens, document defaults, visual patterns,
  strict square geometry, and the standalone review gallery.
