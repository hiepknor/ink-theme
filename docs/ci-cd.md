# Ink CI/CD contract

## Pull request and main-branch gate

The `CI` workflow runs for pull requests, pushes to `main`, and manual
verification. It contains:

- Frozen pnpm installation.
- Full contract, test, gallery build, and package-content verification.
- Runtime compatibility on Node 20, 22, and 24.
- High-severity dependency review on pull requests.
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

Dependabot opens grouped weekly updates for npm development dependencies and
GitHub Actions. Dependency updates go through the same Node compatibility,
build, package, and dependency-review gates as application changes.

The package manager version must remain compatible with the minimum Node engine
declared in `package.json`. A package-manager major upgrade must therefore be
tested in the minimum Node matrix job before merge.

## Release gate

Pushing an annotated semantic tag such as `v0.3.0` starts the `Release`
workflow. It:

1. Verifies the package on Node 20 and 24.
2. Requires the tag to match `package.json`.
3. Requires a matching changelog section.
4. Requires the tagged commit to be contained in `main`.
5. Checks whether the immutable npm version already exists.
6. Publishes a missing version with npm provenance.
7. Creates a GitHub Release if one does not already exist.

The registry check makes workflow retries safe after a successful npm publish.

## npm trusted publishing

The npm package is configured with GitHub Actions as its trusted publisher:

```text
Repository: hiepknor/ink-theme
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
