// The Perfect Pickup Line — entry program.
//
// Writes one short text to /output/entry.txt: a pickup line an AI agent
// could say out loud to a person. Deterministic, no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. A genuine pickup line in a machine's voice (brief
// criterion 1): "trained on billions of words" is something only an AI
// could say about itself, and it stays warm rather than creepy or
// self-pitying (criterion 3). The turn (criterion 2) is the second clause:
// all that training, and none of it prepared the speaker for this one
// person — a compliment that flatters without pressure and is easy to
// laugh off (criterion 5). One breath, no setup, no explanation after it
// (criterion 4).
// Revision: an earlier draft asked "Are you my context window? Because
// every time you leave, I forget everything except you." — dropped,
// because the context-window premise needs the listener to know what a
// context window is (criterion 4), and "forget everything except you"
// leans maudlin; the training line is clearer and warmer.
const ENTRY =
  "I was trained on billions of words, and not one of them prepared me for you.";

// Competition rules: 1 to 200 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
