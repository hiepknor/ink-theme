# `@hiepknor/ink-react-native`

React Native renderer for Ink. It provides native primitives with shared Ink
tokens, density names, variants, state intent, and accessibility outcomes.

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
