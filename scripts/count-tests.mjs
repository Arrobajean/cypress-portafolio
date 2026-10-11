// Counts `it(` blocks per folder under cypress/e2e.
// Usage: node scripts/count-tests.mjs
// Output: per-folder table + TOTAL, plus API vs E2E split.
import { readdirSync, statSync, readFileSync } from "node:fs";
import { join } from "node:path";

const E2E_ROOT = join(process.cwd(), "cypress", "e2e");
const IT_PATTERN = /\bit\s*\(/g;

function collectSpecs(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...collectSpecs(full));
    else if (entry.endsWith(".cy.ts") || entry.endsWith(".cy.js")) out.push(full);
  }
  return out;
}

function countIts(file) {
  const src = readFileSync(file, "utf8");
  const m = src.match(IT_PATTERN);
  return m ? m.length : 0;
}

const specs = collectSpecs(E2E_ROOT);
const byFolder = new Map();
let total = 0;
for (const spec of specs) {
  const rel = spec.slice(E2E_ROOT.length + 1);
  const folder = rel.split(/[/\\]/)[0];
  const n = countIts(spec);
  total += n;
  if (!byFolder.has(folder)) byFolder.set(folder, { specs: 0, its: 0 });
  const acc = byFolder.get(folder);
  acc.specs += 1;
  acc.its += n;
}

const folders = [...byFolder.entries()].sort((a, b) => a[0].localeCompare(b[0]));
console.log("folder | specs | it()");
for (const [folder, v] of folders) console.log(`${folder} | ${v.specs} | ${v.its}`);
const api = byFolder.get("api")?.its ?? 0;
console.log(`TOTAL its: ${total} (${api} API + ${total - api} E2E)`);
