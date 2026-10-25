import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { RadioMemoryConfig, RadioMemoryMap, RadioModelId } from '@springfield/ham-radio-api';
import { createMemoryMapCodec } from '@springfield/ham-radio-utils';
import { MockLogLayer } from 'loglayer';
import { describe, expect, it } from 'vitest';

const rootDirectory = join(dirname(fileURLToPath(import.meta.url)), '../..');
const config = JSON.parse(readFileSync(join(rootDirectory, 'configs/example-radio.json'), 'utf8')) as {
  id: { model: string };
  memoryConfig: RadioMemoryConfig;
};
const memoryMap = JSON.parse(readFileSync(join(rootDirectory, 'src/shared/memory-maps/example-radio.json'), 'utf8')) as RadioMemoryMap;
const modelId = config.id.model as RadioModelId;

describe('placeholder driver round-trip', () => {
  it('encodes and decodes the placeholder setting', () => {
    const codec = createMemoryMapCodec({
      radioModel: modelId,
      memoryMap,
      memoryConfig: config.memoryConfig,
      logger: new MockLogLayer(),
    });

    const image = { contents: new Uint8Array(16).fill(0xff), radioModel: modelId };
    const encoded = codec.encode({ channels: [], settings: { settings: { placeholder: 7 } } }, image);
    const decoded = codec.decode(encoded);
    const settings = decoded.settings.settings as { placeholder?: number };

    expect(encoded.contents[0]).toBe(7);
    expect(settings.placeholder).toBe(7);
  });
});
