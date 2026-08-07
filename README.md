# @hiepknor/ink-theme

A square, monochrome, high-density theme for Tailwind CSS v4. It packages the
visual foundation extracted from OmniWA Console without React components,
product branding, or domain behavior.

The package starts as private and unlicensed while its public release policy is
being decided.

## Install

```sh
pnpm add @hiepknor/ink-theme
```

Tailwind CSS v4 is a peer dependency.

## Use

Import Tailwind first, then the default Ink Theme entrypoint:

```css
@import 'tailwindcss';
@import '@hiepknor/ink-theme';
```

The default entrypoint provides tokens, safe document defaults, and visual
patterns. To enforce square geometry across the application, also import:

```css
@import '@hiepknor/ink-theme/strict.css';
```

For more control, import individual layers:

```css
@import 'tailwindcss';
@import '@hiepknor/ink-theme/tokens.css';
@import '@hiepknor/ink-theme/patterns.css';
```

## Tokens

```html
<section class="border border-line bg-surface text-fg">
  <p class="text-fg-2">Secondary content</p>
</section>
```

The stable token families are:

- surfaces: `bg`, `surface`, `elevated`, and `recessed`;
- borders: `line` and `line-strong`;
- ink: `fg`, `fg-2`, and `fg-3`;
- action: `accent` and `accent-ink`;
- typography: `font-sans` and `font-mono`;
- geometry: every Tailwind radius token resolves to zero.

## Patterns

The theme exposes presentation-only Tailwind utilities:

```html
<span class="ink-tone-solid"></span>
<span class="ink-tone-split"></span>
<span class="ink-tone-dots"></span>
<span class="ink-tone-hatch"></span>
<span class="ink-tone-cancelled"></span>
<span class="ink-tone-outline"></span>
<button class="ink-lift"></button>
```

Applications decide what these marks mean and must pair status patterns with a
visible text label. The theme deliberately does not define states such as
`pending`, `failed`, or `delivered`.

## Local verification

No dependency installation is required for the contract check:

```sh
npm run check
```

Before publishing, remove `private: true`, choose a license, install the peer
dependency in a consumer fixture, and verify the compiled Tailwind output.
