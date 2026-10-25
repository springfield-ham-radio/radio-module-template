## Summary

<!-- What this driver change does. Link the config version you bumped. -->

## Driver

- Model id (`id.model`):
- Config version:
- `minApiVersion`:
- License of this module (MIT or Apache-2.0):

## Fixture provenance

<!-- Required when this PR adds or changes files under test/fixtures/. Which radio, who captured it, which tool. Do not use CHIRP images or other GPL dumps. Write "none" when this PR adds no fixture bytes. -->

## Hardware test report

Run this on a real radio before merging a protocol or memory-map change. The restore image is the first read, saved, and not edited.

Radio (make, model, firmware if known):

Cable:

Zip (`yarn pack:beta <modelId>` or `PACK_RELEASE_ALL=1 yarn pack:release`):

SHA-256:

- [ ] **Read** — downloaded memory from the radio
- [ ] **Write** — wrote one changed channel and one changed setting, then read them back
- [ ] **Restore** — wrote the untouched first read back, read again, and it matched

Notes (serial log, `write.skip` ranges, anything that did not match):

Docs-only or tooling-only pull requests may leave the three boxes unchecked and say why no radio was written.

## DCO

Commits need a `Signed-off-by` line (`git commit -s`). This project uses the Developer Certificate of Origin, not a CLA. See [CONTRIBUTING.md](CONTRIBUTING.md).
