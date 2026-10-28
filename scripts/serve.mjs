import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const port = Number(process.env.PORT || 4173);
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.webp':'image/webp', '.jpg':'image/jpeg', '.svg':'image/svg+xml', '.ttf':'font/ttf', '.txt':'text/plain; charset=utf-8', '.md':'text/plain; charset=utf-8' };
const server = http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + sep)) { response.writeHead(403).end(); return; }
    if (pathname.split('/').some(part => part.startsWith('.')) || pathname.startsWith('/scripts/')) { response.writeHead(404).end(); return; }
    if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
    const data = await readFile(file);
    response.writeHead(200, { 'Content-Type':types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache', 'X-Content-Type-Options':'nosniff' });
    response.end(data);
  } catch { response.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' }).end('Page not found.'); }
});
server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}`));
