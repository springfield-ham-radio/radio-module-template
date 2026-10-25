# Radio module template

Starter for a [HamBench](https://github.com/springfield-ham-radio/ham-radio-ui) radio module. Click **Use this template** on GitHub. Do not copy `radio-module-baofeng` or `radio-module-kenwood`.

The module is JSON only. HamBench does not import TypeScript from the zip. Encode and decode use `createMemoryMapCodec()` in `@springfield/ham-radio-utils`. The generic driver runs the protocol. Tests stay in git.

The file `configs/example-radio.json` is a placeholder. It has `minApiVersion`, a minimal memory map, and `todo` markers. It passes schema validation so CI is green on the template. It is not a driver for a real radio. Follow [AFTER_USING_THIS_TEMPLATE.md](AFTER_USING_THIS_TEMPLATE.md) after you create your repo.

## Quickstart

Node.js is the version in [`.nvmrc`](.nvmrc) (26.10.0). This package pins Yarn 4.18.0.

```bash
yarn install
yarn validate
yarn test
PACK_RELEASE_ALL=1 yarn pack:release
yarn pack:beta example-radio
```

`yarn validate` checks every `configs/*.json` with `SchemaValidator.validateRadioProtocol` and each memory map with `SchemaValidator.validateMemoryMap`.

`yarn pack:release` writes one zip per config whose version is newer than the latest stable GitHub Release asset for that model, plus `dist-release/catalog-entries.json`. `PACK_RELEASE_ALL=1` packs every config. The semantic-release prepare step calls `node scripts/pack-release-zip.mjs` with the repository tag, the same way the Baofeng and Kenwood modules do. The zip is `dist-release/radio-module-<modelId>-<config.version>.zip` and contains that config plus its `$ref` closure. JSON only.

`yarn pack:beta example-radio` writes `dist-release/radio-module-example-radio-<version>-beta.1.zip` and does not modify the working tree. `@springfield/ham-radio-utils` 4.16.1 does not publish the shared `ham-radio-pack-beta` bin yet. **TODO:** switch `pack:beta` to that bin when [ham-radio-utils#35](https://github.com/springfield-ham-radio/ham-radio-utils/pull/35) ships (expected in utils 4.17.0). Until then the script is `scripts/pack-beta-zip.mjs`. The same TODO is at the top of that file.

## Tutorial

The newest author pages are on draft [ham-radio-docs#31](https://github.com/springfield-ham-radio/ham-radio-docs/pull/31) (branch `cursor/radio-driver-docs-c971`). The published site is [ham-radio-docs](https://springfield-ham-radio.github.io/ham-radio-docs/). After that pull request merges, the site paths below are the stable links.

| | Newest source | Site path |
| --- | --- | --- |
| Build a radio driver (start here) | [build-a-radio-driver.md](https://github.com/springfield-ham-radio/ham-radio-docs/blob/cursor/radio-driver-docs-c971/docs/developer/build-a-radio-driver.md) | `/developer/build-a-radio-driver` |
| Repository layout | [radio-module-dev.md](https://github.com/springfield-ham-radio/ham-radio-docs/blob/cursor/radio-driver-docs-c971/docs/developer/radio-module-dev.md) | `/developer/radio-module-dev` |
| Config reference | [config-reference.md](https://github.com/springfield-ham-radio/ham-radio-docs/blob/cursor/radio-driver-docs-c971/docs/developer/config-reference.md) | `/developer/config-reference` |
| Tests and hardware checklist | [testing-a-radio-driver.md](https://github.com/springfield-ham-radio/ham-radio-docs/blob/cursor/radio-driver-docs-c971/docs/developer/testing-a-radio-driver.md) | `/developer/testing-a-radio-driver` |
| Publish | [publishing-modules.md](https://github.com/springfield-ham-radio/ham-radio-docs/blob/cursor/radio-driver-docs-c971/docs/developer/publishing-modules.md) | `/developer/publishing-modules` |
| Beta zip | [beta-driver.md](https://github.com/springfield-ham-radio/ham-radio-docs/blob/cursor/radio-driver-docs-c971/docs/developer/beta-driver.md) | `/developer/beta-driver` |

Decisions this template follows:

- [ADR 0004](https://github.com/springfield-ham-radio/ham-radio-docs/blob/main/docs/developer/adr/0004-radio-modules-json-only.md) — JSON only, `codec.type` `"memoryMap"`
- [ADR 0007](https://github.com/springfield-ham-radio/ham-radio-docs/blob/main/docs/developer/adr/0007-mit-license-no-chirp-code.md) — no copied CHIRP code; fixtures from your own dumps
- [ADR 0009](https://github.com/springfield-ham-radio/ham-radio-docs/blob/main/docs/developer/adr/0009-per-radio-modules.md) — one zip per radio, `minApiVersion`, catalog schema version 3
- [ADR 0010](https://github.com/springfield-ham-radio/ham-radio-docs/blob/main/docs/developer/adr/0010-local-beta-driver-zips.md) — local `pack:beta` zips, not a beta catalog

Worked examples: [radio-module-baofeng](https://github.com/springfield-ham-radio/radio-module-baofeng) and [radio-module-kenwood](https://github.com/springfield-ham-radio/radio-module-kenwood).

## Layout

```
package.json              springfield block, pack:release, pack:beta
configs/<id.model>.json   one radio
src/shared/schemas/       channel and settings JSON Schema
src/shared/memory-maps/   memory-map DSL
scripts/                  pack, schema validate, driver-version check
test/unit/                Vitest
test/integration/
test/fixtures/            your dumps only — see the README there
```

`package.json` `version` is the git tag semantic-release publishes. Each config's `version` is that radio's driver version and the zip version. Catalog `package` is `@springfield/radio-module-<id.model>`. That name is not an npm install coordinate.

## License

Drivers may be **MIT** or **Apache-2.0**. This repository is MIT. See `LICENSE` and `LICENSE.Apache-2.0`.

## Contributing

[CONTRIBUTING.md](CONTRIBUTING.md) requires a DCO `Signed-off-by` line on each commit. There is no CLA. Pull requests that change a protocol or memory map include a hardware test report: read, write, and restore on a real radio.

## Community catalog

A module outside this organization can be listed in [radio-module-catalog](https://github.com/springfield-ham-radio/radio-module-catalog) by a reviewed pull request. Pin the entry to a GitHub Release asset and its SHA-256. HamBench shows that row as **Community, by &lt;publisher&gt;**.
