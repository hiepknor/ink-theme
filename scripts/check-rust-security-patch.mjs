import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const root = new URL('../', import.meta.url);
const manifest = await readFile(new URL('apps/tauri-example/src-tauri/Cargo.toml', root), 'utf8');
const lock = await readFile(new URL('apps/tauri-example/src-tauri/Cargo.lock', root), 'utf8');
const source = await readFile(new URL('vendor/glib-0.18.5-ink1/src/variant_iter.rs', root), 'utf8');
const patchRecord = await readFile(new URL('vendor/glib-0.18.5-ink1/INK-PATCH.md', root), 'utf8');

const vulnerablePackage = /name = "glib"\nversion = "0\.18\.5"(?:\n(?!\[\[package\]\])[\s\S])*?/m.test(lock);
const localPackage = /name = "glib"\nversion = "0\.18\.5"\ndependencies = \[/m.test(lock);
const patchedManifest = /glib = \{ path = "\.\.\/\.\.\/\.\.\/vendor\/glib-0\.18\.5-ink1" \}/.test(manifest);
const mutablePointer = /let mut p: \*mut libc::c_char = std::ptr::null_mut\(\);/.test(source);
const mutableOutArgument = /ffi::g_variant_get_child\([\s\S]*?&mut p,/.test(source);
const patchedSourceHash = createHash('sha256').update(source).digest('hex');
const expectedSourceHash = 'a0f5ee8acb8faa089bcdfbc9a57372609fce7654026ccef7d9a224d05a654ccc';

if (
  vulnerablePackage &&
  (!localPackage ||
    !patchedManifest ||
    !mutablePointer ||
    !mutableOutArgument ||
    patchedSourceHash !== expectedSourceHash)
) {
  throw new Error('RUSTSEC-2024-0429 is present without the complete verified downstream patch.');
}

if (!vulnerablePackage && patchedManifest) {
  throw new Error('The dependency graph no longer contains glib 0.18.5; remove the downstream patch and its exception.');
}

const deadline = patchRecord.match(/Review deadline: (\d{4}-\d{2}-\d{2})/u)?.[1];
if (!deadline || Date.parse(`${deadline}T23:59:59Z`) < Date.now()) {
  throw new Error(`The downstream security patch review deadline is missing or expired: ${deadline ?? 'missing'}.`);
}

console.log(`Verified RUSTSEC-2024-0429 downstream patch; review by ${deadline}.`);
