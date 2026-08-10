# Migrating `@hiepknor/ink-tokens` from 0.1.0 to 1.0.0

Version 1.0.0 stabilizes the existing token contract. Its seven generated
artifacts are byte-for-byte identical to 0.1.0.

## Upgrade

```sh
pnpm add @hiepknor/ink-tokens@^1.0.0
```

No JavaScript, TypeScript, CSS, JSON, or React Native import changes are
required. The public subpaths remain:

```text
@hiepknor/ink-tokens
@hiepknor/ink-tokens/react-native
@hiepknor/ink-tokens/tokens.css
@hiepknor/ink-tokens/theme.css
@hiepknor/ink-tokens/tokens.json
```

## Stable contract

The 1.x contract covers generated token names, resolved values, value types,
CSS custom properties, Tailwind compatibility variables, React Native numeric
conversion, and the package subpaths above.

Removing or renaming a token, changing its value type, removing a subpath, or
changing a value in a way that requires consumer remediation requires a major
release. Additive tokens may ship in a minor release. Corrective values that do
not require consumer changes may ship in a patch release, but still require an
explicit stable-contract snapshot review.

After upgrading, regenerate any downstream snapshots and run the web and native
production builds that consume the package.
