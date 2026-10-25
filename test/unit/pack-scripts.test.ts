import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseModuleCatalog } from '@springfield/ham-radio-registry';
import { describe, expect, it } from 'vitest';
import { packRadioModuleReleases } from '../../scripts/pack-release-zip.mjs';

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), '../..');

describe('pack scripts', () => {
  it('packs the placeholder config into a schema version 3 catalog entry', () => {
    const result = packRadioModuleReleases(rootDirectory, {
      forceAll: true,
      releaseVersion: '0.1.0',
      publishedVersionsByModel: {},
    });

    expect(result.zips.map((zip) => zip.zipName)).toEqual(['radio-module-example-radio-1.0.0.zip']);
    expect(result.catalogEntries[0]).toMatchObject({
      id: 'example-radio',
      package: '@springfield/radio-module-example-radio',
      version: '1.0.0',
      config: 'configs/example-radio.json',
      minApiVersion: '18.0.1',
      downloadUrl:
        'https://github.com/springfield-ham-radio/radio-module-template/releases/download/v0.1.0/radio-module-example-radio-1.0.0.zip',
    });
    expect(result.zips[0]?.integrity).toMatch(/^sha256:[a-f0-9]{64}$/);

    const onDisk = JSON.parse(readFileSync(result.catalogEntriesPath, 'utf8')) as unknown[];
    const catalog = parseModuleCatalog(JSON.stringify({ schemaVersion: 3, modules: onDisk }));

    expect(catalog.modules).toHaveLength(1);
    expect(catalog.modules[0]?.integrity).toBe(result.zips[0]?.integrity);
  });
});
