# Migrating `@hiepknor/ink-react` from 0.1.0 to 1.0.0

Version 1.0.0 stabilizes the existing React component contract. Its public
JavaScript, TypeScript declaration, and CSS artifacts are byte-for-byte
identical to 0.1.0.

## Upgrade

```sh
pnpm add @hiepknor/ink-react@^1.0.0 @hiepknor/ink-tokens@^1.0.0
```

No component, prop, ref, stylesheet, density, or variant changes are required.
The public entrypoints remain:

```text
@hiepknor/ink-react
@hiepknor/ink-react/styles.css
```

## Stable contract

The 1.x contract covers public component and type names, required props,
forwarded ref targets, native DOM attribute support, density and variant names,
CSS classes and custom properties, aggregate stylesheet behavior, and the
package entrypoints above.

Removing or renaming a public export, prop, state, CSS selector, custom
property, or entrypoint requires a major release when consumer remediation is
needed. Additive components and optional props may ship in a minor release.
Compatible fixes may ship in a patch release. Every public artifact change
still requires an explicit stable-contract snapshot review.

After upgrading, run the consumer's TypeScript checks, production web build,
keyboard/accessibility tests, and desktop-webview build where applicable.
