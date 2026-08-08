# Ink component contract

This contract applies to public web and native UI components. Platform-specific
implementation details may differ, but consumer-facing behavior should remain
recognizable and consistent.

## Public API principles

- Prefer composition over large sets of presentation props.
- Preserve native attributes and events where a native element exists.
- Forward refs to the primary interactive element on React web.
- Support controlled and uncontrolled state when both modes are meaningful.
- Keep product vocabulary and data behavior outside the component package.
- Use the same density and variant names across renderers where semantics match.

## Density

Every interactive component supports `compact`, `default`, and `touch` through
`InkProvider` context. Local overrides are allowed for integration boundaries,
but applications should not mix densities without a deliberate reason.

Density controls target size and internal spacing. It must not silently change
content, information hierarchy, or component behavior.

## States

Components implement all applicable states:

- Default.
- Hover on pointer platforms.
- Active/pressed.
- Keyboard focus-visible.
- Disabled.
- Invalid.
- Read-only.
- Loading.
- Selected or checked.

State meaning must not be conveyed through screentone, color, or motion alone.

## Accessibility

- Use the correct native semantic element whenever possible.
- All interactive behavior is operable by keyboard on web.
- Labels and descriptions are programmatically associated with form controls.
- Error messages are connected to their controls.
- Disabled and loading states remain understandable to assistive technology.
- Focus is visible and is not removed without an equivalent replacement.
- Touch targets use touch-density metrics on mobile interfaces.
- Overlay components use proven primitives for focus management and dismissal.

## Styling

- Components consume semantic or component tokens.
- Consumer Tailwind configuration is optional.
- Public components accept `className` on web without making internal DOM
  structure part of the API.
- Product applications own page layout; components own their internal layout.
- Reduced-motion and forced-colors behavior is part of component completion.

## Definition of Done

A component is complete only when it has:

- A typed public API and package export.
- Implementation and styles for each supported platform.
- Applicable state and density coverage.
- Ref and native-attribute behavior on React web.
- Unit and interaction tests.
- Keyboard and accessibility tests.
- Workbench examples for normal and edge states.
- Documentation with usage and ownership boundaries.
- Successful production build and package-content verification.

## Initial React vertical slice

The first release validates this contract with:

- `InkProvider`.
- `Surface`.
- `Button`.
- `TextField`.
- `Checkbox`.

More complex components should not be added until these primitives work in a
real browser application and a representative Electron or Tauri shell.

The browser vertical slice is implemented in `packages/ui-react` and exercised
by `apps/workbench`. Its Vite consumer fixture intentionally has no Tailwind
plugin or configuration and verifies that unused JavaScript exports are removed.

Desktop overlays and tabs adapt Radix Primitives. Ink does not fork or
reimplement their focus scope, dismiss layer, floating position, or roving
keyboard behavior. Wrapper tests verify that required titles, labels, content,
Escape dismissal, focus restoration, and keyboard selection survive the
adapter boundary.

## UI breadth checkpoint

The web renderer also provides application-level building blocks for alerts,
toasts, progress, skeleton loading, accordion disclosure, breadcrumbs,
pagination, semantic tables, and native single-value suggestions. Products own
message copy, routing, pagination state, table sorting/data, and remote search.
Ink owns visual states, semantic markup, keyboard behavior, and density.

`Select` is a custom accessible popup rather than a browser-rendered select. It
uses option data plus controlled or uncontrolled value props, supports typeahead
and arrow-key navigation, and delegates popup/focus behavior to Radix Select.
Inputs and textareas use an inset focus indicator to avoid changing their visual
footprint; forced-colors mode retains a system outline.
