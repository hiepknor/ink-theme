# UI/UX and visual audit

Audit date: 2026-08-08. Scope: the public React package, framework-agnostic
theme fallback, workbench compositions, keyboard behavior, motion, density,
forced-colors support, and visual regression coverage.

## Findings addressed

- Toolbar controls mixed lifted CTA styling with flat application controls,
  producing visibly uneven baselines and weight. Toolbar actions now share a
  flat contextual treatment and consistent active state.
- Checkbox and radio visuals relied on browser rendering. They now retain
  native inputs and semantics while using deterministic Ink controls for web,
  desktop webviews, and mobile web.
- Icon buttons lacked the hover, press, disabled, and focus parity of buttons.
- Loading buttons exposed accessible copy but lacked a visible progress mark.
- Layout data selectors were unscoped and could alter consumer elements that
  happened to use the same attributes.
- Switch, tabs, close actions, fields, and table rows had incomplete visual
  interaction feedback.
- Bordered controls inherited external focus outlines, visually stacking focus,
  border, and hard shadow. Focus is now contextual: inset for fields, an inner
  baseline for actions, label emphasis for choices, and external outline only
  for borderless text links.
- Product compositions lacked a public Card primitive. Card now provides
  header, title, description, content, and footer regions.
- Select, popover, menu, tooltip, dialog, drawer, accordion, and toast lacked a
  coherent motion language. Motion now uses design tokens and fully respects
  `prefers-reduced-motion`.
- Visual tests did not isolate toolbar balance or card composition.
- Upload and image workflows were absent. The public media contract now covers
  native file selection, drag/drop delivery, image fit and aspect ratios, and
  loading, success, error, and caption states.
- Semantic tables lacked application data workflows. `DataTable` now composes
  custom filters, search, sorting, selection, pagination, and loading, empty,
  and error states without owning product data or network behavior.
- Upload queues, user imagery, and image collections lacked reusable visual
  contracts. File progress/retry/remove, avatar fallbacks, galleries, and an
  accessible dialog-backed lightbox now share the Ink interaction language.
- Error feedback had no hierarchy beyond field copy, alerts, and toasts. The
  public contract now distinguishes field, form, section, stale-data, dialog,
  background, and application-wide failures, with recovery actions placed next
  to the affected scope.
- Visual severity previously implied live-region priority. `Alert` now keeps
  tone and announcement behavior independent so static danger content does not
  interrupt assistive technology users.
- React render failures had no recovery boundary. `ErrorBoundary` now contains
  crashes at the nearest useful subtree, supports reset keys and custom
  fallbacks, and forwards diagnostics to application-owned logging.
- Route pagination and controlled data-table pagination used different controls,
  spacing, and selected states. Links and buttons now share one visual contract;
  long controlled ranges compact through the same ellipsis primitive.
- The component catalog previously documented only a subset of stable root
  contracts and allowed API defaults to drift from implementation. A registry
  coverage gate now distinguishes root contracts from composed exports and
  verifies documented defaults for high-risk shared primitives.
- The catalog command palette did not restore focus after keyboard dismissal.
  It now returns focus to its visible trigger for both click and shortcut entry.
- Catalog mode previously hid the compatibility gallery only through CSS,
  leaving duplicate landmarks and inactive form fields in the browser model.
  Legacy regions are now hidden and inert while catalog routes are active.
- Mobile checks previously proved only that pages did not overflow. Coarse
  pointers now receive the shared touch target token, with browser gates for
  target size, forced colors, and reduced motion.

## Deliberately deferred

These need a validated consumer use case before their behavior is made public:

- Advanced async/virtualized combobox and multi-select.
- Date and time picker with locale and timezone policy.
- Data-grid column resizing, inline editing, pinning, and virtualization.
- Product command frameworks with nested actions, recents, and remote search.
  The private workbench finder remains a local documentation navigation tool.
- Rich-text editing.
- Mobile-native components; these belong to `@hiepknor/ink-ui-native` rather
  than sharing DOM/CSS implementations.

## Review rules

- Hard lift identifies standalone actions and elevated objects; controls inside
  toolbars stay flat.
- Motion explains origin, destination, or state change and never decorates
  static content.
- Every interactive component needs visible hover, keyboard focus, pressed or
  selected, disabled, and loading states when applicable.
- Browser-native semantics remain the source of truth even when Ink replaces
  their visual rendering.
- Framework-agnostic bordered buttons and fields use the same internal focus
  vocabulary as the React package; borderless links keep an external outline.
- The native HTML workbench covers normal, placeholder, required, readonly,
  invalid, disabled field, disabled option, and native choice states. Coarse
  pointers receive a 44px minimum target in the reference treatment.
- New visual contracts require Linux-generated regression baselines.
