# After using this template

GitHub **Use this template** copies this repo. The placeholder `example-radio` validates and the tests pass. It is not a driver for a real radio. Do these before you open a pull request against your new repo or ask for a catalog listing.

1. **Rename the repository** to `radio-module-<manufacturer>` (one repo per manufacturer, one config per radio).
2. **Set `package.json`.** Replace `name` (`@springfield/radio-module-<manufacturer>`), `description`, `author`, `repository`, and `keywords`. Keep `springfield.pluginType` as `radio-module`. Set `springfield.manufacturer` and `springfield.supportedRadios` to your `id.model` values. Keep `npmPublish` false. Do not set `main`, `types`, or a codec factory path.
3. **Choose a license.** This template is MIT (`LICENSE`). A driver may be MIT or Apache-2.0. For Apache-2.0, replace `LICENSE` with `LICENSE.Apache-2.0`, set `package.json` `"license"` to `Apache-2.0`, and set `metadata.license` in the config. Do not use GPL, and do not paste CHIRP source.
4. **Set the model id.** Rename `configs/example-radio.json` to `configs/<id.model>.json`. `id.model` must match the file name and must contain a hyphen (`acme-ht-100`). Set `id.name` and `id.manufacturer`. Start `version` at `1.0.0`. Set `minApiVersion` to `18.0.1` unless you need a newer API (`onError` needs `18.3.0`).
5. **Replace the placeholder protocol and memory map.** Point `memoryMap.$ref` and the schema `$ref`s at your files. `codec.type` stays `"memoryMap"`. Delete the `todo` arrays.
6. **Keep `pack:beta` on the shared bin.** It is already `"ham-radio-pack-beta"` from `@springfield/ham-radio-utils` `^4.17.0`. Do not copy a local `scripts/pack-beta-zip.mjs`.
7. **Add fixtures only from your own dumps.** Read `test/fixtures/README.md`. Do not commit CHIRP images.
8. **Run the hardware test** (read, write, restore) and fill in the pull request template before you call the driver done.
9. **Delete this file** when the checklist is done, or check the items off in your first commit message so the next reader knows the placeholder is gone.

```bash
yarn install
yarn validate
yarn test
PACK_RELEASE_ALL=1 yarn pack:release
yarn pack:beta <id.model>
```
