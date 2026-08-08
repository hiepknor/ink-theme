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

Core components are `InkProvider`, `Surface`, `Button`, `TextField`, and
`Checkbox`. Interactive components inherit `compact`, `default`, or `touch`
density from the provider and accept a local `density` override.

The desktop foundation also exports:

- Layout: `Stack`, `Inline`, `Separator`, and `VisuallyHidden`.
- Actions: `IconButton` and `ButtonGroup`.
- Forms: `TextArea`, `RadioGroup`, `Switch`, native `Select`, and datalist-backed `Combobox`.
- Feedback: `Badge`, `StatusMark`, `Spinner`, `EmptyState`, `Alert`, `Progress`, `Skeleton`, and `Toast`.
- Disclosure: `Accordion` compound parts.
- Navigation: `Breadcrumb` and `Pagination` compound parts.
- Data display: semantic `Table` compound parts.
- Desktop shell: `Toolbar`, `Sidebar`, `Panel`, `Tabs`, and `StatusBar`.
- Overlays: `Dialog`, `Popover`, `Tooltip`, and `Menu` compound parts.

Dialog, popover, tooltip, menu, tabs, accordion, and toast behavior builds on Radix Primitives.
Ink owns their visual adapter and accessible required props; Radix owns focus,
dismissal, positioning, and keyboard algorithms.

Native DOM attributes and refs are forwarded to the primary element. Form
labels, descriptions, and errors are associated programmatically. Product
applications remain responsible for form submission, validation rules, data,
routing, and domain language.

`Combobox` intentionally covers native single-value suggestions. Async search,
remote filtering, multi-select, and virtualization belong to a future advanced
combobox contract rather than this native baseline.
