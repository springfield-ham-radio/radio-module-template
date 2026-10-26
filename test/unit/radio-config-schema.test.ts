import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SchemaValidator } from '@springfield/ham-radio-utils';
import { describe, expect, it } from 'vitest';

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), '../..');
const validator = new SchemaValidator();
const strictSemver = /^\d+\.\d+\.\d+$/;

function readJson(relativePath: string): unknown {
  return JSON.parse(readFileSync(join(rootDirectory, relativePath), 'utf8'));
}

describe('placeholder radio config', () => {
  it('validates every config and its memory map', () => {
    const configFiles = readdirSync(join(rootDirectory, 'configs')).filter((entry) => entry.endsWith('.json'));

    expect(configFiles.length).toBeGreaterThan(0);

    for (const fileName of configFiles) {
      const config = readJson(`configs/${fileName}`) as {
        id: { model: string };
        version: string;
        minApiVersion: string;
        codec: { type: string };
        memoryMap: { $ref: string };
      };

      expect(fileName).toBe(`${config.id.model}.json`);
      expect(config.version).toMatch(strictSemver);
      expect(config.minApiVersion).toMatch(strictSemver);
      expect(config.codec.type).toBe('memoryMap');

      const protocol = validator.validateRadioProtocol(config);
      expect(protocol.valid, `${fileName}: ${JSON.stringify(protocol.errors)}`).toBe(true);

      const memoryMap = readJson(join('configs', config.memoryMap.$ref));
      const mapResult = validator.validateMemoryMap(memoryMap);
      expect(mapResult.valid, `${config.memoryMap.$ref}: ${JSON.stringify(mapResult.errors)}`).toBe(true);
    }
  });
});
