import fs from "node:fs";
import path from "node:path";

const CP1252 = new Map([
  ["\u20ac", 0x80],
  ["\u201a", 0x82],
  ["\u0192", 0x83],
  ["\u201e", 0x84],
  ["\u2026", 0x85],
  ["\u2020", 0x86],
  ["\u2021", 0x87],
  ["\u02c6", 0x88],
  ["\u2030", 0x89],
  ["\u0160", 0x8a],
  ["\u2039", 0x8b],
  ["\u0152", 0x8c],
  ["\u017d", 0x8e],
  ["\u2018", 0x91],
  ["\u2019", 0x92],
  ["\u201c", 0x93],
  ["\u201d", 0x94],
  ["\u2022", 0x95],
  ["\u2013", 0x96],
  ["\u2014", 0x97],
  ["\u02dc", 0x98],
  ["\u2122", 0x99],
  ["\u0161", 0x9a],
  ["\u203a", 0x9b],
  ["\u0153", 0x9c],
  ["\u017e", 0x9e],
  ["\u0178", 0x9f],
]);

const RUNS = /[\u00c2-\u00f4][\u0080-\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u0192\u02c6\u02dc\u2013\u2014\u2018\u2019\u201a\u201c\u201d\u201e\u2020\u2021\u2022\u2026\u2030\u2039\u203a\u20ac\u2122]+/g;

function toBytes(run) {
  const bytes = [];
  for (const ch of run) {
    const mapped = CP1252.get(ch);
    if (mapped !== undefined) {
      bytes.push(mapped);
      continue;
    }
    const code = ch.codePointAt(0);
    if (code > 0xff) return null;
    bytes.push(code);
  }
  return bytes;
}

function decodeRun(run) {
  const bytes = toBytes(run);
  if (!bytes) return null;
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bytes));
  } catch {
    return null;
  }
}

function fix(file) {
  const source = fs.readFileSync(file, "utf8");
  let changed = 0;
  const out = source.replace(RUNS, (run) => {
    const decoded = decodeRun(run);
    if (decoded === null || decoded === run) return run;
    changed++;
    return decoded;
  });
  if (changed > 0) {
    fs.writeFileSync(file, out, "utf8");
    console.log(`${file}: ${changed} run(s) repaired`);
  }
}

function walk(dir) {
  if (dir === "node_modules" || dir === ".next" || dir === ".git" || dir === "docs") return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(tsx?|css|md|json|mjs|js)$/.test(entry.name)) fix(full);
  }
}

for (const target of process.argv.slice(2)) walk(target);
