# Changelog

All notable changes to `@hiepknor/ink-react-native` are documented in this file.

## 1.0.1 - 2026-08-10

### Changed

- Align the package dependency with the stable `@hiepknor/ink-tokens` 1.x line.
- Preserve the complete 1.0.0 runtime, component, prop, type, and accessibility
  contract without changes.

## 1.0.0 - 2026-08-10

### Stable contract

- Stabilize the root component, prop, option, density, variant, tone, and
  feedback exports after production-shaped consumer validation.
- Validate font scaling, reduced motion, TalkBack, VoiceOver, and keyboard
  behavior on a Samsung S24 Ultra with Android 16 and an iPhone 16 Plus with
  iOS 26.6.
- Lock the public root export list in the package contract gate so additions,
  removals, and renames require explicit API review.

### Changed

- Correct the minimum supported React Native version from 0.76 to 0.78. React
  Native 0.78 is the first supported baseline whose peer contract uses React 19.
- Mark the native Expo workbench and roadmap as validated against the stable
  `1.0.0` contract.

### Migration

- Existing 0.1.0 consumers on React Native 0.78 or newer do not need component,
  prop, or import changes.
- Consumers on React Native 0.76 or 0.77 must upgrade React Native and React
  together before installing 1.0.0. See `MIGRATION.md` for the full checklist.

## 0.1.0 - 2026-08-09

### Added

- Ship accessible React Native primitives backed by the shared Ink token source.
- Provide compact, default, and touch density through `InkProvider`.
- Include actions, fields, selection controls, modal choice, feedback, and
  progress primitives with native accessibility semantics.
- Respect reduced-motion preferences for loading and modal presentation.
- Validate the package through an Expo product workflow, renderer interaction
  tests, Android and iOS production exports, and a packed-consumer contract.

### Release policy

- Manual physical-device accessibility validation is waived for this release;
  the unvalidated platform-specific risks remain recorded in the repository's
  native device matrix.
