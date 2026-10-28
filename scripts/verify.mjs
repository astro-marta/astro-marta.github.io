import { readFile, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const css = await readFile(resolve(root, 'styles.css'), 'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
const errors = [];
if (ids.length !== new Set(ids).size) errors.push('Duplicate HTML IDs.');
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  const value = match[1];
  if (/^(https?:|mailto:|data:)/.test(value)) continue;
  if (value.startsWith('#')) { if (!ids.includes(value.slice(1))) errors.push(`Missing anchor: ${value}`); continue; }
  if (value.startsWith('/')) errors.push(`Root-relative path is incompatible with GitHub project Pages: ${value}`);
  try { await access(resolve(root, value.split('#')[0])); } catch { errors.push(`Missing file: ${value}`); }
}
for (const match of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) {
  try { await access(resolve(root, match[1])); } catch { errors.push(`Missing CSS asset: ${match[1]}`); }
}
for (const match of html.matchAll(/aria-controls="([^"]+)"/g)) if (!ids.includes(match[1])) errors.push(`Broken ARIA relationship: ${match[1]}`);
for (const match of html.matchAll(/<img\b([^>]+)>/g)) if (!/\balt="/.test(match[1]) || !/\bwidth="/.test(match[1]) || !/\bheight="/.test(match[1])) errors.push('Image lacks alternative text or dimensions.');
const schema = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
try { JSON.parse(schema[1]); } catch { errors.push('Invalid structured data.'); }
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; } else console.log('Verified local assets, internal anchors, ARIA references, image attributes, structured data, and GitHub Pages relative paths.');
