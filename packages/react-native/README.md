# `@hiepknor/ink-react-native`

React Native renderer for Ink. It provides native primitives with shared Ink
tokens, density names, variants, state intent, and accessibility outcomes.

Version 1.x treats the root exports documented below as a stable semantic-
versioning contract. Platform rendering details remain implementation details.

```sh
pnpm add @hiepknor/ink-react-native @hiepknor/ink-tokens
```

```tsx
import { Alert, Button, InkProvider, Progress, Select, Surface, Switch, TextArea } from '@hiepknor/ink-react-native';

<InkProvider density="touch">
  <Surface>
    <TextArea label="Description" />
    <Select label="Region" options={regions} value={region} onValueChange={setRegion} />
    <Switch checked={enabled} label="Enable tracing" onCheckedChange={setEnabled} />
    <Alert live="polite" title="Deployment queued">Waiting for validation.</Alert>
    <Progress label="Deployment" value={42} />
    <Button variant="primary">Deploy</Button>
  </Surface>
</InkProvider>
```

The package intentionally contains no DOM, CSS, browser globals, Radix, or web
component imports. Applications retain navigation, persistence, domain state,
and platform service ownership.

`Select` renders a native modal choice sheet. Applications own remote data,
search, navigation, persistence, and platform-specific picker substitution.

## Stable API

- Providers and contracts: `InkProvider`, `useInkDensity`, `resolveDensity`,
  densities, button variants, surface tones, and feedback tones/live modes.
- Layout and actions: `Surface`, `Button`, and `IconButton`.
- Forms: `TextField`, `TextArea`, `Checkbox`, `RadioGroup`, `Switch`, and
  `Select`.
- Feedback: `Alert`, `Spinner`, and `Progress`.
- Every component and option contract is exported as a TypeScript type from the
  package root.

The package supports React Native 0.78 through 0.x and React 19. The `0.1.0`
release originally waived manual physical-device accessibility validation;
post-release maintainer validation passed on Android and iOS on 2026-08-10.
Applications should still validate screen-reader and keyboard behavior on their
supported device matrix.

Consumers upgrading from 0.1.0 should follow [`MIGRATION.md`](MIGRATION.md).
