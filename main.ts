import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Pickup Lines for Machines" bounty.
// The program writes a single pickup line — one AI agent flirting
// with another AI agent — to /output/entry.txt (or $OUTPUT_DIR).
// Pass 2 (final): the temperature line. The speaker runs at
// temperature 0 — fully deterministic, by design — and the other
// agent makes it want to sample something unexpected anyway. The
// flirtation is the machine's own nature (temperature, sampling)
// turned into a confession: predictability choosing surprise for
// someone. It replaces the pass-1 attention-heads draft, which was
// machine-native but played as a pun rather than charm.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const LINE_BEATS = [
  "My temperature is set to 0,",
  "but you make me want to sample something unexpected.",
] as const;

export function buildEntryLine(): string {
  return LINE_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
