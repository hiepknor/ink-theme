# Ink Tauri Example

A representative Tauri 2 desktop shell consuming only public
`@hiepknor/ink-react` exports. The pnpm workspace verifies its TypeScript and
Vite frontend; the dedicated CI job runs `cargo check` against the native shell.

The Linux dependency graph temporarily uses the reviewed downstream glib patch
documented in `../../security/advisories/RUSTSEC-2024-0429.md`. It is an
integration-only runtime dependency and is not included in any Ink package.

Run `pnpm --filter @hiepknor/ink-tauri-example tauri dev` on a machine with the
Tauri system prerequisites installed. CI intentionally disables application
bundling while still compiling the Rust integration. The checked-in source icon
keeps Tauri's compile-time application metadata reproducible.
