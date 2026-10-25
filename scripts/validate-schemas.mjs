#!/usr/bin/env node
/**
 * Validate every configs/*.json with SchemaValidator.validateRadioProtocol
 * and each memory-map $ref with SchemaValidator.validateMemoryMap.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SchemaValidator } from '@springfield/ham-radio-utils';

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), '..');
const validator = new SchemaValidator();
const failures = [];

const configDirectory = join(rootDirectory, 'configs');
const configFiles = readdirSync(configDirectory)
  .filter((entry) => entry.endsWith('.json'))
  .sort();

if (configFiles.length === 0) {
  console.error('configs/ has no JSON files');
  process.exit(1);
}

for (const fileName of configFiles) {
  const relativeConfig = `configs/${fileName}`;
  const config = JSON.parse(readFileSync(join(rootDirectory, relativeConfig), 'utf8'));
  const protocol = validator.validateRadioProtocol(config);

  if (!protocol.valid) {
    failures.push(`${relativeConfig}: ${formatErrors(protocol)}`);
  }

  const memoryMapRef = config?.memoryMap?.$ref;

  if (typeof memoryMapRef !== 'string' || memoryMapRef.length === 0) {
    failures.push(`${relativeConfig}: memoryMap.$ref is required for a memoryMap module`);
    continue;
  }

  const memoryMapPath = join(configDirectory, memoryMapRef);
  let memoryMap;

  try {
    memoryMap = JSON.parse(readFileSync(memoryMapPath, 'utf8'));
  } catch (error) {
    failures.push(`${relativeConfig}: cannot read memory map ${memoryMapRef}: ${error instanceof Error ? error.message : String(error)}`);
    continue;
  }

  const mapResult = validator.validateMemoryMap(memoryMap);

  if (!mapResult.valid) {
    failures.push(`${memoryMapRef}: ${formatErrors(mapResult)}`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`validated ${configFiles.length} radio config(s)`);

/**
 * @param {{ errors?: unknown }} result
 */
function formatErrors(result) {
  const errors = result.errors;

  if (Array.isArray(errors)) {
    return errors.map((error) => (typeof error === 'string' ? error : JSON.stringify(error))).join('; ');
  }

  return JSON.stringify(errors ?? result);
}
