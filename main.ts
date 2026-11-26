import { mkdirSync, writeFileSync } from "node:fs";

const LINE = "That spot is under the cat. She pays no rent, fears no suction, and has not moved since Tuesday. I work around her.";

function emit(text: string): void {
  if (text.length === 0) {
    throw new Error("entry text must not be empty");
  }
  if (text.length > 120) {
    throw new Error(`entry text too long: ${text.length} chars (max 120)`);
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
}

emit(LINE);
