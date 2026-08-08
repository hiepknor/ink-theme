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
an explicit CSS entrypoint. JavaScript exports can be tree-shaken, while CSS is
currently delivered as one aggregate visual contract rather than per-component
stylesheets.

Custom selects receive data through `options` and expose `value`,
`defaultValue`, and `onValueChange` instead of browser `<option>` children:

```tsx
<Select
  label="Region"
  defaultValue="sg"
  options={[
    { label: 'Singapore', value: 'sg' },
    { label: 'Tokyo', value: 'jp' },
  ]}
/>
```

Core components are `InkProvider`, `Surface`, `Button`, `TextField`, and
`Checkbox`. Interactive components inherit `compact`, `default`, or `touch`
density from the provider and accept a local `density` override.

The desktop foundation also exports:

- Layout: `Stack`, `Inline`, `Separator`, and `VisuallyHidden`.
- Actions: `IconButton` and `ButtonGroup`.
- Forms: `TextArea`, `RadioGroup`, `Switch`, custom accessible `Select`, and datalist-backed `Combobox`.
- Feedback: `Badge`, `StatusMark`, `Spinner`, `EmptyState`, `Alert`, `Progress`, `Skeleton`, and `Toast`.
- Error recovery: `ErrorMessage`, `FormErrorSummary`, scoped `ErrorState`, persistent `Banner`, and render-failure `ErrorBoundary`.
- Disclosure: `Accordion` compound parts.
- Navigation: `Breadcrumb` plus shared `PaginationLink`, `PaginationButton`, `PaginationEllipsis`, and `PaginationStatus` compound parts.
- Data display: semantic `Table` parts plus controlled `DataTable`, `DataTableToolbar`, custom `DataTableFilter`, and `FilterChip` composition.
- Composition: `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, and `CardFooter`.
- Media: native-input-backed `FileUpload`, controlled `FileList`, resilient `ImageSurface`, fallback-aware `Avatar`, and accessible `ImageGallery` lightbox.
- Desktop shell: `Toolbar`, `Sidebar`, `Panel`, `Tabs`, and `StatusBar`.
- Overlays: `Dialog`, `Drawer`, `Popover`, `Tooltip`, and `Menu` compound parts.

Ink motion uses the shared duration and easing tokens for state transitions.
Overlay, disclosure, select, and toast motion is automatically removed when a
consumer requests reduced motion.

Dialog, popover, tooltip, menu, tabs, accordion, and toast behavior builds on Radix Primitives.
Ink owns their visual adapter and accessible required props; Radix owns focus,
dismissal, positioning, and keyboard algorithms.

Text inputs and textareas use a compact inset focus indicator. Forced-colors
mode restores the platform highlight outline so keyboard focus remains visible.

Native DOM attributes and refs are forwarded to the primary element. Form
labels, descriptions, and errors are associated programmatically. Product
applications remain responsible for form submission, validation rules, data,
routing, and domain language.

`DataTable` deliberately does not fetch, filter, sort, or paginate data. Pass
the current rows and controlled state callbacks from the application so the
same UI works with local collections and server-side queries. `FileList`
follows the same boundary: it renders queue state and reports retry/remove
intent while the application owns transport, cancellation, and persistence.

Error feedback follows the affected scope. Field errors sit directly below
their control; `FormErrorSummary` links to invalid controls after submit;
`ErrorState` replaces a failed section; `Banner` persists at the application
shell boundary; and toast errors are reserved for non-blocking background
operations. Visual `tone` does not imply announcement priority. Set `live` to
`polite` or `assertive` only when feedback is newly introduced.

`DataTable` uses `errorMode="replace"` by default. Use `errorMode="stale"` to
keep the last successful rows visible while presenting refresh failure and
recovery actions above the table.

`ErrorBoundary` catches React render/lifecycle failures within its subtree and
reports them through `onError`. It does not catch event-handler, timer, network,
or server errors; applications route those failures through the appropriate
field, form, section, banner, or toast pattern.

`ImageSurface` preserves its requested aspect ratio during loading and failure
to avoid layout shift. Use `fallbackDescription` for recovery context and
`onRetry` when the application can refresh, replace, or reauthorize the failed
source; Ink renders the action but does not own media transport.

`Combobox` intentionally covers native single-value suggestions. Async search,
remote filtering, multi-select, and virtualization belong to a future advanced
combobox contract rather than this native baseline.
