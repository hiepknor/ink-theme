# `@hiepknor/ink-ui-native`

React Native renderer for Ink. It provides native primitives with shared Ink
tokens, density names, variants, state intent, and accessibility outcomes.

```tsx
import { Button, Checkbox, InkProvider, Surface, TextField } from '@hiepknor/ink-ui-native';

<InkProvider density="touch">
  <Surface>
    <TextField label="Service name" />
    <Checkbox checked={enabled} label="Enable tracing" onCheckedChange={setEnabled} />
    <Button variant="primary">Deploy</Button>
  </Surface>
</InkProvider>
```

The package intentionally contains no DOM, CSS, browser globals, Radix, or web
component imports. Applications retain navigation, persistence, domain state,
and platform service ownership.
