# Ink architecture

## Objective

Ink is a cross-platform design system for web, desktop webviews, mobile web,
and native mobile applications. It shares visual decisions and component
contracts while allowing each platform to use its native rendering model.

## Layers

```text
Token source
  -> generated platform tokens
  -> platform theme
  -> UI component implementation
  -> product application
```

Dependencies flow in one direction. A token package must not depend on a theme,
a theme must not depend on components, and a component package must not own
product behavior.

## Intended packages

### `@hiepknor/ink-tokens`

The only editable source of visual values. It generates CSS, resolved JSON,
TypeScript, and React Native output. Native platform formats may be added when
there is a maintained consumer.

### `@hiepknor/ink-theme`

The framework-independent web adapter. It exposes Tailwind CSS v4 tokens,
document defaults, presentation patterns, and opt-in geometry locks. Browser,
PWA, Electron, Tauri, and other webview applications can consume it directly.

### `@hiepknor/ink-ui-react`

The React implementation for web and desktop webviews. It consumes Ink tokens
and theme styles but does not require consumer applications to configure
Tailwind CSS. Product applications remain responsible for routing, data, and
domain semantics.

### `@hiepknor/ink-ui-native`

The React Native implementation. It shares tokens, density names, variants,
and accessibility expectations with the React web package. It does not share
DOM elements, CSS, browser event handling, or overlay implementations.

### Workbenches and examples

Workbench applications document and exercise public APIs but are not published
packages. Examples prove integration with representative consumer toolchains.

## Platform mapping

| Platform | Tokens | Theme | Components |
| --- | --- | --- | --- |
| Browser/PWA | CSS or TypeScript | Web CSS | React or application HTML |
| Electron/Tauri | CSS or TypeScript | Web CSS | React |
| React Native | Native TypeScript | Provider/styles | React Native |
| SwiftUI/Compose | Generated native values | Future adapter | Platform-owned initially |

## Repository rules

- Keep the root private after the workspace migration.
- Preserve `@hiepknor/ink-theme` import paths during migration.
- Publish only files required by consumers.
- Do not introduce a task orchestrator until recursive pnpm scripts are insufficient.
- Prefer platform primitives over custom implementations of complex behavior.
- Keep accessibility behavior within component implementations, not product code.
- Record breaking architectural changes before implementation.

## Renderer strategy

Ink does not promise one component source file for every platform. It promises
consistent names, visual intent, states, density, and accessibility outcomes.
Web and native implementations may diverge internally whenever platform
conventions require it.

## Ownership boundary

Ink owns:

- Visual tokens and generated platform representations.
- Presentation patterns and component appearance.
- Component interaction, focus, and accessibility primitives.
- Density and public variant contracts.

Applications own:

- Domain language and status vocabulary.
- Routing, data fetching, permissions, and persistence.
- Platform APIs such as filesystem, windows, notifications, and deep links.
- Product-specific layouts and workflows.
