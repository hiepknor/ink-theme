# Ink UI React

Accessible Ink components for browsers, PWAs, Electron, and Tauri webviews.
Components ship their own CSS and do not require Tailwind configuration in the
consumer application.

The package remains private until the multi-package release gate is available.

## Usage

```tsx
import { Button, InkProvider, TextField } from '@hiepknor/ink-ui-react';

export function Form() {
  return (
    <InkProvider density="default">
      <TextField label="Service name" name="service" />
      <Button variant="primary">Create service</Button>
    </InkProvider>
  );
}
```

The default entrypoint includes the component stylesheet. The
`@hiepknor/ink-ui-react/styles.css` export is available for tooling that needs
an explicit CSS entrypoint.

Available components are `InkProvider`, `Surface`, `Button`, `TextField`, and
`Checkbox`. Interactive components inherit `compact`, `default`, or `touch`
density from the provider and accept a local `density` override.

The desktop foundation also exports:

- Layout: `Stack`, `Inline`, `Separator`, and `VisuallyHidden`.
- Actions: `IconButton` and `ButtonGroup`.
- Forms: `TextArea`, `RadioGroup`, `Switch`, and native `Select`.
- Feedback: `Badge`, `StatusMark`, `Spinner`, and `EmptyState`.
- Desktop shell: `Toolbar`, `Sidebar`, `Panel`, `Tabs`, and `StatusBar`.
- Overlays: `Dialog`, `Popover`, `Tooltip`, and `Menu` compound parts.

Dialog, popover, tooltip, menu, and tabs behavior builds on Radix Primitives.
Ink owns their visual adapter and accessible required props; Radix owns focus,
dismissal, positioning, and keyboard algorithms.

Native DOM attributes and refs are forwarded to the primary element. Form
labels, descriptions, and errors are associated programmatically. Product
applications remain responsible for form submission, validation rules, data,
routing, and domain language.
