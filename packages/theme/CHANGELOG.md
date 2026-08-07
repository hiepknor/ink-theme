# Changelog

All notable changes to Ink Theme are documented here. The project follows
[Semantic Versioning](https://semver.org/).

## Unreleased

### Added

- Generate the existing Tailwind token contract from the shared
  `@hiepknor/ink-tokens` source used by web and React Native outputs.

### Fixed

- Pin pnpm 10 so the development and CI toolchain remains compatible with the
  package's minimum supported Node 20 runtime.

### Infrastructure

- Convert the repository to a pnpm workspace, moving the published theme to
  `packages/theme` and the preview workbench to `apps/workbench` while
  preserving every public package import.
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
