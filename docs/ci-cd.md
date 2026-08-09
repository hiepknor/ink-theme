# Ink CI/CD contract

## Pull request and main-branch gate

The `CI` workflow runs for pull requests, pushes to `main`, and manual
verification. It contains:

- Frozen pnpm installation.
- Full contract, test, gallery build, and package-content verification.
- Runtime compatibility on Node 20, 22, and 24.
- High-severity dependency review on pull requests.
- Chromium visual regression against reviewed Linux baselines.
- Tauri frontend build and locked Rust compilation on Linux.
- A single cargo-deny RustSec/policy audit plus downstream patch
  integrity/expiry checks.
- Native package type, boundary, accessibility/touch-contract and pack checks,
  renderer-level interaction tests, then Expo Android and iOS consumer bundle
  exports.
- One aggregate required status named `CI Gate`.

Branch protection should require only `CI Gate`. Matrix jobs may evolve without
requiring branch-rule changes, while the aggregate job fails unless every
required compatibility job succeeds.

## Branch protection

The `main` branch requires:

- A pull request before merging.
- The branch to be current with `main` before merging.
- A successful `CI Gate` status.
- Resolved review conversations.
- Linear history.
- No force pushes or branch deletion.

The repository currently has one maintainer, so approval count may be zero. The
pull request and automated gate remain mandatory for administrators.

## Dependency maintenance

Dependabot opens grouped weekly minor/patch updates for npm development
dependencies and GitHub Actions, plus a monthly grouped update for the
Tauri/WebKitGTK Rust runtime. It does not open npm or Actions major upgrades:
those are explicit compatibility projects that update runtime contracts,
documentation, and CI together.
Dependency updates go through the same compatibility, build, package, security,
and dependency-review gates as application changes.

Expo-managed React, React DOM, safe-area, and test-renderer dependencies do not
move independently through Dependabot.
CI runs `expo install --check`, and the workbench contract requires
`react-test-renderer` to exactly match its React version. These dependencies
move together during an explicit Expo SDK compatibility upgrade. Likewise,
jsdom major updates remain blocked while their Node engine excludes the
repository's supported Node 20 runtime. The same policy applies to testing
library majors that raise their Node floor, and TypeScript majors that would
move Expo packages outside the SDK-selected compiler range.

The package manager version must remain compatible with the minimum Node engine
declared by the root workspace. A package-manager major upgrade must therefore
be tested in the minimum Node matrix job before merge.

The Linux Tauri graph currently uses a downstream-patched `glib 0.18.5` for
RUSTSEC-2024-0429. The exception is valid only while the checked-in source hash,
Cargo patch, lockfile shape, advisory record, and review deadline all match. CI
fails if the graph moves away from that version without removing the exception,
making the transition back to a patched upstream release mandatory.

Expo's Metro graph currently resolves `image-size 1.2.1`. Two version-based
parser advisories are allowed only after CI verifies the checked-in pnpm patch,
its hash, a malicious ICNS regression test, and an expiring advisory record.
The npm audit step still fails for every other high-severity production
advisory. Dependabot must not upgrade this dependency across a major boundary:
the `2.0.2` parser still fails the malicious ICNS regression and can exhaust
runner memory. Removing the ignore, patch, test, and advisory exception is one
reviewed security transition, never an automated version bump.

Expo's Xcode tooling declares the obsolete `uuid ^7` range. The workspace
resolves that transitive dependency to `uuid 11.1.1`, whose CommonJS entrypoint
retains the API consumed by Xcode while including the buffer-bounds fix for
GHSA-w5hq-g745-h8pq. Native checks and Expo export guard this override until
Expo removes the legacy range.

The Rust security job intentionally uses cargo-deny as its only advisory
engine. The former RustSec action duplicated the same database scan and tried
to create an additional GitHub Check Run during `push` events without the
required permission, making healthy `main` builds appear failed.

## Release gate

Pushing an annotated semantic tag such as `v0.3.0` starts the `Release`
workflow. It:

1. Verifies the package on Node 20 and 24.
2. Requires the tag to match `packages/theme/package.json`.
3. Requires a matching section in `packages/theme/CHANGELOG.md`.
4. Requires the tagged commit to be contained in `main`.
5. Checks whether the immutable npm version already exists.
6. Publishes a missing version with npm provenance.
7. Creates a GitHub Release if one does not already exist.

The registry check makes workflow retries safe after a successful npm publish.

## npm trusted publishing

The npm package is configured with GitHub Actions as its trusted publisher:

```text
Repository: hiepknor/ink-ui
Workflow: release.yml
Environment: empty
```

The workflow uses the short-lived GitHub OIDC identity through
`id-token: write`; a long-lived `NPM_TOKEN` repository secret is not required.
The package metadata carries the matching public repository URL required for
OIDC provenance. Release jobs intentionally do not restore dependency caches.

## Release procedure

1. Update version, changelog, API, and migration documentation in a pull request.
2. Merge only after `CI Gate` succeeds.
3. Pull the protected `main` branch locally.
4. Create and push an annotated `v<version>` tag on the merge commit.
5. Monitor the `Release` workflow through npm publish and GitHub Release creation.
6. Confirm the npm `latest` dist-tag only when the release is intended as latest.

Do not reuse, move, or overwrite a published release tag.
