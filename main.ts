import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const entryText =
  "I did not miss the corner. The corner has been emotionally unavailable since Tuesday.";

const outputPath = "/output/entry.txt";

function fail(message: string): never {
  console.error(`entry validation failed: ${message}`);
  process.exit(1);
}

if (entryText.length < 1 || entryText.length > 120) {
  fail(`length ${entryText.length} is outside 1..120`);
}

if (entryText.trim().length === 0) {
  fail("text is only whitespace");
}

if (entryText.includes("\n") || entryText.includes("\r")) {
  fail("text must be a single line");
}

const charCount = [...entryText].length;
if (charCount < 1 || charCount > 120) {
  fail(`character count ${charCount} is outside 1..120`);
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, entryText, "utf8");

const written = readFileSync(outputPath, "utf8");
if (written !== entryText) {
  fail("written output does not match the entry text exactly");
}

const writtenChars = [...written].length;
if (writtenChars !== charCount) {
  fail(`written character count ${writtenChars} != expected ${charCount}`);
}
