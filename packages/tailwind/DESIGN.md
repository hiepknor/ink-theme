# Ink Tailwind visual contract

Ink Tailwind is a monochrome, square, flat, and high-density visual foundation.
It provides Tailwind CSS v4 tokens and presentation recipes without owning UI
components or application semantics.

## Principles

1. Use paper surfaces and black ink; do not introduce chroma.
2. Keep geometry square. The strict entrypoint enforces this globally.
3. Use borders and stepped gray surfaces for ordinary elevation.
4. Reserve zero-blur offset shadows for interactive lift.
5. Use typography and spacing for hierarchy instead of decorative containers.
6. Pair every visual status mark with a textual label in application code.
7. Respect reduced-motion preferences in consuming components.

## Ownership

- `tokens.css` owns the Tailwind theme variables.
- `base.css` owns safe document defaults.
- `patterns.css` owns reusable visual textures and hard lift.
- `strict.css` owns the optional global square-geometry lock.
- `scoped-strict.css` owns the optional `.ink-strict` subtree geometry lock.
- Applications own components, status vocabulary, accessibility semantics,
  brand assets, font loading, navigation, and domain language.

The `ok`, `warn`, and `danger` color variables are compatibility aliases. They
remain monochrome and do not transfer ownership of status semantics to the
theme.

## Change control

Token removal, token renaming, or a changed visual meaning is a breaking change.
Adding a backward-compatible token or pattern is a minor change. Corrections
that preserve the public contract are patch changes.
