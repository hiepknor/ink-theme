# Migrating `@hiepknor/ink-react-native` from 0.1.0 to 1.0.0

Version 1.0.0 stabilizes the existing component contract. It does not rename or
remove components, props, option types, density values, variants, tones, or root
imports from 0.1.0.

## Requirements

- React Native 0.78 or newer, below 1.0.
- React 19.
- Node.js 20.19 or newer for installation and build tooling.

React Native 0.76 and 0.77 declare React 18 peer dependencies, so they cannot
satisfy Ink's React 19 contract. Upgrade React Native and React together using
the compatibility guidance for the application's framework or Expo SDK.

## Upgrade

```sh
pnpm add @hiepknor/ink-react-native@^1.0.0 @hiepknor/ink-tokens@^0.1.0
```

No source import changes are required:

```tsx
import { Button, InkProvider, TextField } from '@hiepknor/ink-react-native';
```

After upgrading:

1. Run the application's type checks and native production builds.
2. Exercise controlled inputs, disabled/loading actions, validation errors,
   modal selection, and progress announcements.
3. Recheck font scaling, reduced motion, TalkBack or VoiceOver, and software or
   hardware keyboard behavior on the application's supported devices.

The package owns component rendering and accessibility semantics. Applications
continue to own navigation, persistence, remote data, permissions, domain copy,
and platform-specific picker substitution.
