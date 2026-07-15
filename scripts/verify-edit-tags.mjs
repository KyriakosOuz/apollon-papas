// Verifies the Overlay CMS tagging contract:
//  1. every data-edit-id is unique across the repo
//  2. every i18n-backed data-edit-key resolves in BOTH el.json and en.json
//  3. {i} placeholders resolve against real arrays, for every index
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'src';
const el = JSON.parse(readFileSync('src/i18n/el.json', 'utf8'));
const en = JSON.parse(readFileSync('src/i18n/en.json', 'utf8'));

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) =>
    d.isDirectory() ? walk(join(dir, d.name)) : [join(dir, d.name)]
  );
}
const files = walk(SRC).filter((f) => /\.(tsx|ts)$/.test(f));

// --- collect tags -----------------------------------------------------------
const ids = [];
const keys = []; // { key, source, file }

for (const f of files) {
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\bdata-edit-id="([^"]+)"/g)) ids.push({ v: m[1], f });
  for (const m of src.matchAll(/\beditId="([^"]+)"/g)) ids.push({ v: m[1], f });

  // an element's own data-edit-source overrides the inherited i18n one
  for (const m of src.matchAll(/\bdata-edit-key="([^"]+)"([\s\S]{0,200}?)(?=data-edit-key=|\/>|>)/g)) {
    keys.push({ key: m[1], overridden: /data-edit-source="/.test(m[2]), f });
  }
  for (const m of src.matchAll(/\beditKey="([^"]+)"([\s\S]{0,200}?)(?=\/>)/g)) {
    keys.push({ key: m[1], overridden: /editSource="/.test(m[2]), f });
  }
}

// --- 1. id uniqueness -------------------------------------------------------
const seen = new Map();
const dupes = [];
for (const { v, f } of ids) {
  if (seen.has(v)) dupes.push(`${v}  (${seen.get(v)} + ${f})`);
  else seen.set(v, f);
}

// --- 2/3. key resolution ----------------------------------------------------
const get = (obj, path) => path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

const unresolved = []; // key path does not exist at all — a real breakage
const nonString = []; // key exists but is not a string — writing text would corrupt the type
const resolved = [];
const skipped = [];

// A key "resolves" only if the path exists AND holds a string, since the CMS
// writes text. A number (e.g. about.stats[].n) is reachable but not text-editable.
function check(dict, lang, path, key) {
  const v = get(dict, path);
  if (v === undefined) return unresolved.push(`${key} -> ${lang}.json: ${path} does not exist`);
  if (typeof v !== 'string')
    return nonString.push(`${key} -> ${lang}.json: ${path} is ${typeof v} (${JSON.stringify(v)}), not a string`);
  return null;
}

for (const { key, overridden, f } of keys) {
  if (overridden) {
    skipped.push(`${key}  (non-i18n source, ${f})`);
    continue;
  }
  const before = unresolved.length + nonString.length;
  if (key.includes('{i}')) {
    const [arrPath, field] = key.split('.{i}.');
    for (const [lang, dict] of [['el', el], ['en', en]]) {
      const arr = get(dict, arrPath);
      if (!Array.isArray(arr)) {
        unresolved.push(`${key} -> ${lang}.json: "${arrPath}" is not an array`);
        continue;
      }
      arr.forEach((_, i) => check(dict, lang, `${arrPath}.${i}.${field}`, key));
    }
    const n = (get(el, arrPath) || []).length;
    if (unresolved.length + nonString.length === before) resolved.push(`${key}  (x${n} instances, both locales)`);
  } else {
    for (const [lang, dict] of [['el', el], ['en', en]]) check(dict, lang, key, key);
    if (unresolved.length + nonString.length === before) resolved.push(key);
  }
}

// --- report -----------------------------------------------------------------
console.log(`data-edit-id total: ${ids.length}  unique: ${seen.size}`);
console.log(dupes.length ? `\nID COLLISIONS:\n  ${dupes.join('\n  ')}` : 'ID uniqueness: PASS');

console.log(`\ni18n-backed keys resolved in BOTH locales: ${resolved.length}`);
console.log(`non-i18n keys (source-overridden, skipped): ${skipped.length}`);
skipped.forEach((s) => console.log(`  - ${s}`));

if (unresolved.length) {
  console.log(`\nUNRESOLVED KEYS (${unresolved.length}) — FAIL:`);
  unresolved.forEach((u) => console.log(`  ! ${u}`));
} else {
  console.log('\nKey resolution: PASS — every i18n key exists in el.json and en.json');
}

if (nonString.length) {
  console.log(`\nNON-STRING TARGETS (${nonString.length}) — tagged, but NOT text-editable:`);
  nonString.forEach((u) => console.log(`  ~ ${u}`));
  console.log('  (writing a string here changes the JSON type and breaks fmtStat/GSAP count-up)');
}

// --- locale parity ----------------------------------------------------------
const flat = (o, p = '') =>
  Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' ? flat(v, `${p}${k}.`) : [`${p}${k}`]
  );
const elKeys = new Set(flat(el));
const enKeys = new Set(flat(en));
const onlyEl = [...elKeys].filter((k) => !enKeys.has(k));
const onlyEn = [...enKeys].filter((k) => !elKeys.has(k));
console.log(`\nLocale parity: el=${elKeys.size} en=${enKeys.size}`);
if (onlyEl.length) console.log(`  only in el: ${onlyEl.join(', ')}`);
if (onlyEn.length) console.log(`  only in en: ${onlyEn.join(', ')}`);
if (!onlyEl.length && !onlyEn.length) console.log('  PASS — locale files are structurally identical');

process.exit(dupes.length || unresolved.length ? 1 : 0);
