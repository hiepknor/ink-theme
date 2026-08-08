# Ink Tauri Example

A representative Tauri 2 desktop shell consuming only public
`@hiepknor/ink-ui-react` exports. The pnpm workspace verifies its TypeScript and
Vite frontend; the dedicated CI job runs `cargo check` against the native shell.

Run `pnpm --filter @hiepknor/ink-tauri-example tauri dev` on a machine with the
Tauri system prerequisites installed. CI intentionally disables application
bundling while still compiling the Rust integration. The checked-in source icon
keeps Tauri's compile-time application metadata reproducible.
