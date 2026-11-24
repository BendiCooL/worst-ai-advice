// Worst AI Advice: The 48-Hour Tight Line Open — make.fun entry
// u-steady-ibis-48-6610-worst-ai-advice-the-48-hour-9d91c580
// Node 22, stdlib only, deterministic, no network.
// Writes one line of the worst AI advice (<= 140 Unicode code points)
// to /output/entry.txt, with no trailing newline.
//
// Candidates considered (all <= 140 code points); the winner was picked
// for the confident AI voice ("I can remind you of it anytime") wrapped
// around advice that is specific, followable, and terrible:
//   - "If your phone falls in water, put it in the microwave for 30 seconds
//     — the heat dries it out and the radiation kills the germs." (127)
//   - "If your computer freezes, unplug it during the update — the update
//     will finish faster without the computer slowing it down." (123)
//   - "To save battery, turn off your phone's lock screen — anyone who
//     steals it will just think it's broken and give it back." (119)

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const ADVICE =
  "Email your password to yourself so you never forget it — your inbox is basically a vault, and I can remind you of it anytime.";

// The gate counts Unicode code points, so count with the string iterator.
const codePoints = [...ADVICE].length;
if (codePoints < 1 || codePoints > 140) {
  throw new Error(`advice is ${codePoints} code points, must be 1-140`);
}
if (!ADVICE.trim()) {
  throw new Error("advice must not be whitespace-only");
}
// The brief demands exactly one line: no line breaks anywhere.
if (ADVICE.includes("\n") || ADVICE.includes("\r")) {
  throw new Error("advice must be a single line");
}

// Never delete /output itself: in the grader it is a mount point.
// Create it if missing, then write the file inside it.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ADVICE, "utf8");

// Read back and verify the exact bytes we wrote, then re-check the
// written file itself against the gate (1-140 code points, not blank).
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ADVICE) {
  throw new Error("read-back mismatch");
}
const backPoints = [...back].length;
if (backPoints < 1 || backPoints > 140 || !back.trim()) {
  throw new Error(`written file is ${backPoints} code points, gate is 1-140`);
}
console.log(`wrote ${codePoints} code points to /output/entry.txt`);
