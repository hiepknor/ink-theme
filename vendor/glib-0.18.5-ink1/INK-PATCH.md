# Ink downstream security patch

- Crate: `glib 0.18.5`
- Advisory: `RUSTSEC-2024-0429` / `GHSA-wrw7-89jp-8q8g`
- Upstream fix: <https://github.com/gtk-rs/gtk-rs-core/pull/1343>
- Upstream merge commit: `05dff0ee696f9bcd8617cd48c4b812d046d440cb`
- Added: 2026-08-08
- Review deadline: 2026-11-08
- Owner: Ink maintainers

This directory is the unmodified crates.io `glib-0.18.5.crate` source except
for the upstream fix in `src/variant_iter.rs`: the variadic GLib out-pointer is
mutable and is passed as `&mut p`.

The patch exists because Tauri's Linux WebKitGTK dependency line currently
requires glib 0.18. It must be removed as soon as the locked dependency graph
accepts a non-vulnerable upstream glib release.
