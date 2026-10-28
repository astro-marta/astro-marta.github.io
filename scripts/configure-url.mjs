import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const input = process.argv[2];
let url;
try {
  url = new URL(input);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw new Error();
} catch { console.error('Provide the final HTTPS website URL without credentials, query parameters, or fragments.'); process.exit(1); }
url.pathname = url.pathname.replace(/\/?$/, '/');
const base = url.href;
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
let html = await readFile(resolve(root, 'index.html'), 'utf8');
html = html.replace(/^\s*<link rel="canonical"[^>]*>\n/gm, '').replace(/^\s*<meta property="og:url"[^>]*>\n/gm, '');
html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${escape(new URL('assets/social-card.jpg', base).href)}">`);
html = html.replace('  <title>', `  <link rel="canonical" href="${escape(base)}">\n  <meta property="og:url" content="${escape(base)}">\n  <title>`);
html = html.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/, (_, open, data, close) => {
  const person = JSON.parse(data);
  person.url = base;
  person.image = new URL('assets/martina-portrait.webp', base).href;
  return `${open}\n  ${JSON.stringify(person).replaceAll('<', '\\u003c')}\n  ${close}`;
});
await writeFile(resolve(root, 'index.html'), html);
await writeFile(resolve(root, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(base)}</loc></url></urlset>\n`);
await writeFile(resolve(root, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', base).href}\n`);
console.log(`Configured canonical, social sharing, structured data, and sitemap for ${base}`);
