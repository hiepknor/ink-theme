# Changelog

All notable changes to Ink Tokens are documented here. The project follows
[Semantic Versioning](https://semver.org/).

## Unreleased

## 1.0.0 - 2026-08-10

### Stable contract

- Stabilize every generated JavaScript, TypeScript, JSON, CSS, Tailwind, and
  React Native token name, value, and value type from 0.1.0.
- Add SHA-256 contract coverage for all seven generated public artifacts so
  future changes require an explicit SemVer review.
- Add a packed-consumer gate that imports the default and React Native
  entrypoints from the actual npm tarball layout.

### Migration

- The 1.0.0 generated artifacts are byte-for-byte identical to 0.1.0, so
  consumers do not need import, token-name, type, CSS-variable, or value changes.
- Update the package version and rerun platform builds. See `MIGRATION.md` for
  the stable subpath and change-policy reference.

## 0.1.0 - 2026-08-09

### Added

- Publish the canonical Ink primitive and semantic token source as generated
  JavaScript, TypeScript, JSON, CSS, Tailwind CSS, and React Native outputs.
- Validate aliases, platform mappings, supported units, approved colors, and
  generated-file drift before publication.
- Expose typed default and `react-native` entrypoints plus stable CSS and JSON
  subpath exports.
