# image-size parser denial-of-service remediation

Status: patched downstream  
Owner: Ink maintainers  
Review deadline: 2026-11-09

## Advisories

- `GHSA-w3rx-r6r6-pgpr` / CVE-2025-71330: zero-length ICNS entry loop.
- `GHSA-5p2g-fcmc-qvqq` / CVE-2025-71329: zero-length JXL/HEIF box loop.

Expo SDK 57 resolves `image-size 1.2.1` through Metro. The registry source
already advances past a zero-size ISO box in its shared JXL/HEIF parser, but its
ICNS parser still accepts entry lengths below the eight-byte header and can
leave the offset unchanged.

## Remediation

`patches/image-size@1.2.1.patch` rejects truncated ICNS headers and entry
lengths below eight bytes. A regression test passes a zero-length ICNS entry to
the installed parser and requires a synchronous error instead of an infinite
loop. CI verifies the patch hash before allowing the two version-based GHSA
matches in Dependency Review and `pnpm audit`.

## Exposure

The dependency is build tooling used by Metro to inspect local application
assets. Ink does not accept remote images in its CI export pipeline. The patch
still treats the defect as applicable rather than relying only on reachability.

## Removal condition

Remove the patch, direct test dependency, GHSA allowances and this record as
soon as Expo/Metro resolves an `image-size` release outside the affected range.
The integrity check fails if the patched dependency disappears while the
exception remains.

References:

- <https://github.com/advisories/GHSA-w3rx-r6r6-pgpr>
- <https://github.com/advisories/GHSA-5p2g-fcmc-qvqq>
