# Migrating Ink Theme

## From 0.1.0 to 0.2.0

Version 0.2.0 is backward-compatible at the documented entrypoint and utility
level. Existing imports continue to work, but the default entrypoint now adds
accessible interaction defaults that may be visually observable.

### New default behavior

The default entrypoint now styles:

- `::selection` foreground and background.
- `:focus-visible` with a 2px outline and offset.
- Form-control accent and caret color.
- Placeholder color and opacity.
- Focus outlines under forced-colors mode.

Review application overrides that target the same selectors. Ink rules live in
the base layer, so ordinary Tailwind utilities and later component layers can
override them without `!important`.

### New tokens

Version 0.2.0 adds semantic focus and selection colors plus reusable hard
shadow tokens. No 0.1.0 token was removed or renamed.

### Lift utilities

`ink-lift` and `ink-lift-strong` now resolve through shadow tokens. Their
rendered values remain unchanged.

New presentation utilities are available:

```html
<span class="ink-inset"></span>
<button class="ink-pressable"></button>
```

`ink-pressable` adds motion and pressed displacement. Do not apply it to an
element when the application already owns transform or box-shadow transitions
without first composing those styles deliberately.

### Scoped strict mode

Global strict mode remains available and unchanged:

```css
@import '@hiepknor/ink-theme/strict.css';
```

Applications embedding third-party UI can switch to the new scoped entrypoint:

```css
@import '@hiepknor/ink-theme/scoped-strict.css';
```

```html
<main class="ink-strict">...</main>
```

### Verification checklist

- Review keyboard focus on links, buttons, and form controls.
- Review selected text colors.
- Review application placeholder overrides.
- Test reduced-motion and forced-colors preferences.
- Prefer scoped strict mode when third-party widgets use rounded geometry.
- Run the consuming application's production Tailwind build.
