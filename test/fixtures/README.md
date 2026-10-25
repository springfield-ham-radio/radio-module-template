# Test fixtures

Put captures you own in this folder. A unit test may read them. They are not part of the release zip.

[ADR 0007](https://github.com/springfield-ham-radio/ham-radio-docs/blob/main/docs/developer/adr/0007-mit-license-no-chirp-code.md) is the rule for bytes you commit:

- Do not commit CHIRP images, CHIRP `MEM_FORMAT` source, or any other GPL fixture bundle.
- You may read CHIRP to learn a layout. Re-express that layout as JSON in `src/shared/memory-maps/`. Do not paste the CHIRP source.
- Binary images, clone dumps, and serial logs in this folder must come from your own radio, or from another contributor's rights-clear capture.
- The pull request that adds a fixture says where it came from: which radio, who captured it, and which tool (HamBench **Save**, a sniffer log, the manufacturer's software on a radio you are allowed to read).

Name the file after the radio, for example `example-radio-read.bin` or `example-radio-serial.json`. A serial log is not a CHIRP image. Treat a full memory image the same way.

This template ships no dump. The tests under `test/unit` and `test/integration` build bytes in the test so CI can run before you have a capture. Replace that scaffold when you have your own dump, and delete the placeholder assertions that no longer describe the radio.

The restore file in a hardware test report is a HamBench **Save** of a read you just did. It is not a CHIRP `.img`. You do not have to commit that restore file.
