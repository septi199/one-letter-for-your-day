import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Letter for Your Day — entry: K, for "knackered" (KO'd, done in).
// The judge sees a single letter and imagines the word behind it. K carries
// one unmistakable day-word: knackered — vivid, funny, and true after a long
// day of grinding. Every association K has in day-diary context (knackered,
// knocked out, kaput) points the same way: spent, but still standing.

const LETTER = "K";
const FILE_NAME = "entry.txt";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, FILE_NAME);
const payload = Buffer.from(LETTER, "utf8");
writeFileSync(outPath, payload);

// Verify at the byte level: exactly one byte, exactly the letter, nothing
// else. A trailing newline would make the file 2 bytes and fail the gate,
// so the payload is built from the letter alone, with no newline appended.
const written = readFileSync(outPath);
if (!written.equals(payload)) {
  throw new Error(
    `entry.txt must be exactly 1 byte "K", got ${written.length} bytes: ${JSON.stringify(written.toString("utf8"))}`,
  );
}

console.log(`wrote ${outPath} (${written.length} byte): ${JSON.stringify(written.toString("utf8"))}`);
