# Ink Theme API

This document defines the public CSS contract for `@hiepknor/ink-theme` 0.2.x.
Token removal, renaming, or a changed visual meaning requires a breaking
release. Applications retain ownership of components and product semantics.

## Entrypoints

| Import | Contents |
| --- | --- |
| `@hiepknor/ink-theme` | Tokens, safe document defaults, and patterns |
| `@hiepknor/ink-theme/tokens.css` | Tailwind CSS v4 theme tokens only |
| `@hiepknor/ink-theme/base.css` | Document and interaction defaults only |
| `@hiepknor/ink-theme/patterns.css` | Presentation utilities only |
| `@hiepknor/ink-theme/strict.css` | Global square-geometry lock |
| `@hiepknor/ink-theme/scoped-strict.css` | `.ink-strict` subtree geometry lock |

Import Tailwind before Ink Theme:

```css
@import 'tailwindcss';
@import '@hiepknor/ink-theme';
```

Import either geometry lock after the default entrypoint. The scoped lock is
recommended when an application embeds UI that it does not control.

## Color tokens

| Token | Value | Purpose |
| --- | --- | --- |
| `--color-bg` | `#ffffff` | Document canvas |
| `--color-surface` | `#ffffff` | Ordinary content surface |
| `--color-elevated` | `#f2f2f2` | Stepped elevated surface |
| `--color-recessed` | `#f6f6f6` | Stepped recessed surface |
| `--color-line` | `#e2e2e2` | Ordinary separator or border |
| `--color-line-strong` | `#111111` | Strong frame or border |
| `--color-fg` | `#111111` | Primary ink |
| `--color-fg-2` | `#565656` | Secondary ink |
| `--color-fg-3` | `#6b6b6b` | Muted ink |
| `--color-accent` | `#111111` | Primary action and form accent |
| `--color-accent-ink` | `#ffffff` | Ink placed on the accent |
| `--color-focus` | `#111111` | Visible focus outline |
| `--color-selection` | `#111111` | Selected text background |
| `--color-selection-ink` | `#ffffff` | Selected text foreground |

`--color-ok`, `--color-warn`, and `--color-danger` are monochrome
compatibility aliases with value `#111111`. They do not assign status meaning.

Tailwind produces utilities such as `bg-bg`, `bg-surface`, `text-fg`,
`text-fg-2`, `border-line`, and `outline-focus` from these tokens.

## Typography tokens

| Token | Stack |
| --- | --- |
| `--font-sans` | Inter followed by system sans-serif fallbacks |
| `--font-mono` | Geist Mono followed by system monospace fallbacks |

The package does not ship or download fonts. Applications that require Inter
or Geist Mono must load those files separately.

## Geometry tokens

All Tailwind radius tokens resolve to `0px`:

```text
--radius-none
--radius-sm
--radius-md
--radius-lg
--radius-xl
--radius-2xl
--radius-3xl
--radius-full
```

This makes Tailwind radius utilities square. It does not override inline or
third-party radius declarations; use a strict entrypoint when that is required.

## Shadow tokens

| Token | Value |
| --- | --- |
| `--shadow-ink` | `2px 2px 0 #111111` |
| `--shadow-ink-strong` | `3px 3px 0 #111111` |
| `--shadow-ink-inset` | `inset 2px 2px 0 #e2e2e2` |

These generate Tailwind shadow utilities and back the public Ink patterns.

## Base behavior

The default entrypoint applies the following base-layer behavior:

- A light color scheme and paper canvas.
- 14px sans-serif body copy with a 1.5 line height.
- Tabular numerals in tables and `.tabular` elements.
- Ink-colored text selection.
- A 2px visible focus outline with a 2px offset.
- Accent and caret colors for form controls.
- Muted placeholder ink with explicit full opacity.
- A system `Highlight` focus outline in forced-colors mode.

Utility classes in consuming applications can override base-layer rules.

## Screentone utilities

| Utility | Presentation |
| --- | --- |
| `ink-tone-solid` | Solid primary ink |
| `ink-tone-split` | Split horizontal bands |
| `ink-tone-dots` | Repeating dot texture |
| `ink-tone-hatch` | Diagonal hatch texture |
| `ink-tone-cancelled` | Crossed solid texture |
| `ink-tone-outline` | Transparent mark with a muted outline |

Screentones are decorative. Status meaning must also be expressed in visible
text. Forced-colors mode simplifies filled textures to `CanvasText`.

## Interaction utilities

| Utility | Presentation |
| --- | --- |
| `ink-lift` | Standard zero-blur offset shadow |
| `ink-lift-strong` | Strong zero-blur offset shadow |
| `ink-inset` | Recessed inset shadow |
| `ink-pressable` | Lift, hover raise, and pressed displacement |

`ink-pressable` transitions transform and shadow over 100ms. Under
`prefers-reduced-motion: reduce`, its transition duration collapses to 0.01ms.
It does not provide border, background, text, disabled, or semantic button
styles; applications or component packages supply those decisions.

## Strict geometry

Global strict mode:

```css
@import '@hiepknor/ink-theme/strict.css';
```

This applies `border-radius: 0 !important` to all elements and pseudo-elements.

Scoped strict mode:

```css
@import '@hiepknor/ink-theme/scoped-strict.css';
```

```html
<main class="ink-strict">...</main>
```

The scoped entrypoint applies the same lock only to the wrapper and its
descendants. Prefer it around controlled application UI and keep third-party
widgets outside the wrapper when they require their own geometry.
