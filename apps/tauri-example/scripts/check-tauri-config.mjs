import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const config = JSON.parse(await readFile(new URL('../src-tauri/tauri.conf.json', import.meta.url), 'utf8'));
assert.equal(config.identifier, 'com.hiepknor.ink.desktop');
assert.equal(config.build.devUrl, 'http://localhost:1420');
assert.equal(config.build.frontendDist, '../dist');
assert.equal(config.bundle.active, false, 'Example must not create distributable bundles in CI');
assert.deepEqual(config.bundle.icon, ['icons/icon.png'], 'Native compilation requires the checked-in app icon');
process.stdout.write('Tauri configuration contract passed.\n');
