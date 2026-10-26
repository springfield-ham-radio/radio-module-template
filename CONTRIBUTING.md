# Contributing

Contributions to this radio module use the [Developer Certificate of Origin](https://developercertificate.org/), version 1.1. There is no contributor license agreement.

Add a `Signed-off-by` line to every commit. `git commit -s` writes it from your Git `user.name` and `user.email`:

```text
Signed-off-by: Your Name <you@example.com>
```

That line certifies the DCO below. The DCO check on pull requests rejects a commit that does not have it. Merge commits are skipped. Do not sign off for someone else.

## License of the driver

A radio module may be **MIT** or **Apache-2.0**. This template starts as MIT (`LICENSE`). To switch, follow [AFTER_USING_THIS_TEMPLATE.md](AFTER_USING_THIS_TEMPLATE.md).

Do not contribute GPL code. Do not paste or adapt CHIRP source. You may read CHIRP, or a vendor manual, to learn a protocol, then re-express the layout as JSON. Fixtures must come from your own radio dumps. See [test/fixtures/README.md](test/fixtures/README.md) and [ADR 0007](https://github.com/springfield-ham-radio/ham-radio-docs/blob/main/docs/developer/adr/0007-mit-license-no-chirp-code.md).

## Commits and checks

Use [Conventional Commits](https://www.conventionalcommits.org/) (`feat`, `fix`, `docs`, `test`, `ci`, `chore`). Commitlint runs from the `commit-msg` hook.

```bash
yarn install
yarn lint
yarn validate
yarn test
```

Bump `configs/<model>.json` `version` when that config or any file its `$ref`s reach changes. CI runs `scripts/check-driver-versions.mjs` and fails when the driver changed without a higher version.

A pull request that changes a protocol or a memory map includes the hardware test report in the template: **read**, **write**, and **restore** on a real radio. You can also open a [Hardware test report](.github/ISSUE_TEMPLATE/hardware_test_report.yml) issue.

## Listing outside this organization

A driver published outside `springfield-ham-radio` can be listed in [radio-module-catalog](https://github.com/springfield-ham-radio/radio-module-catalog). Open a reviewed pull request against `catalog.json`. Pin the entry to one GitHub Release asset (`downloadUrl`) and the SHA-256 of that zip (`integrity`, `sha256:` plus 64 hex characters). The catalog version is the config `version`, strict `major.minor.patch`.

HamBench shows that row as **Community, by &lt;publisher&gt;**. `<publisher>` is the name on the catalog pull request (the config `metadata.author`, or the GitHub account that owns the release). Springfield manufacturer rows stay the official entries. A community listing is not a local **Unverified** install and not a **Beta** zip.

The sync job does not discover new repositories. Someone has to merge the catalog pull request first. After that, updates follow the release asset named `radio-module-<id.model>-<config.version>.zip`.

## Developer Certificate of Origin, version 1.1

```text
Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

(a) The contribution was created in whole or in part by me and I
    have the right to submit it under the open source license
    indicated in the file; or

(b) The contribution is based upon previous work that, to the best
    of my knowledge, is covered under an appropriate open source
    license and I have the right under that license to submit that
    work with modifications, whether created in whole or in part
    by me, under the same open source license (unless I am
    permitted to submit under a different license), as indicated
    in the file; or

(c) The contribution was provided directly to me by some other
    person who certified (a), (b) or (c) and I have not modified
    it.

(d) I understand and agree that this project and the contribution
    are public and that a record of the contribution (including all
    personal information I submit with it, including my sign-off) is
    maintained indefinitely and may be redistributed consistent with
    this project or the open source license(s) involved.
```
