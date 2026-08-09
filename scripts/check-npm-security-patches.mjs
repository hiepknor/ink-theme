import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const workspace = await readFile(new URL('pnpm-workspace.yaml', root), 'utf8');
const lock = await readFile(new URL('pnpm-lock.yaml', root), 'utf8');
const patch = await readFile(new URL('patches/image-size@1.2.1.patch', root), 'utf8');
const record = await readFile(new URL('security/advisories/GHSA-image-size-dos.md', root), 'utf8');
const expectedHash = '840e9ef1ec2048d6ade1bf1394919ac7f867ee276b17e11216d82f8d6432e6b8';
const actualHash = createHash('sha256').update(patch).digest('hex');
const dependencyPresent = /image-size@1\.2\.1/.test(lock);
const patchConfigured = /image-size@1\.2\.1: patches\/image-size@1\.2\.1\.patch/.test(workspace);
const uuidOverrideConfigured = /(?:^|\n)overrides:\n(?:  .*\n)*?  uuid: 11\.1\.1(?:\n|$)/u.test(workspace);
const patchedUuidPresent = /(?:^|\n)  uuid@11\.1\.1:/u.test(lock);
const vulnerableUuidPresent = /(?:^|\n)  uuid@(?:[0-9]|10)(?:\.|@)/u.test(lock);

if (dependencyPresent && (!patchConfigured || actualHash !== expectedHash)) {
  throw new Error('The image-size advisory is present without the verified downstream patch.');
}
if (!dependencyPresent && patchConfigured) {
  throw new Error('image-size 1.2.1 is gone; remove its downstream patch and GHSA allowances.');
}
if (!uuidOverrideConfigured || !patchedUuidPresent || vulnerableUuidPresent) {
  throw new Error('The Expo/Xcode graph must resolve uuid 11.1.1 without a vulnerable uuid copy.');
}

const deadline = record.match(/Review deadline: (\d{4}-\d{2}-\d{2})/u)?.[1];
if (!deadline || Date.parse(`${deadline}T23:59:59Z`) < Date.now()) {
  throw new Error(`The image-size patch review deadline is missing or expired: ${deadline ?? 'missing'}.`);
}

console.log(`Verified image-size parser patch; review by ${deadline}.`);
console.log('Verified uuid 11.1.1 override for the Expo/Xcode graph.');
