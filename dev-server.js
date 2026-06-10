/* Servidor de desenvolvimento — emula o roteamento da Vercel para este site
   estático: cleanUrls (/freela -> freela.html) e fallback de 404 (404.html).
   Zero dependências. Uso:  node dev-server.js [porta]   (padrão: 3000) */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = Number(process.argv[2] || 3000);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
};

function send(res, status, body, file) {
  res.statusCode = status;
  res.setHeader('Content-Type', TYPES[path.extname(file || '')] || 'application/octet-stream');
  res.end(body);
}

const server = http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(req.url.split('?')[0]); } catch (e) { p = '/'; }
  if (p === '/') p = '/index.html';

  const fp = path.normalize(path.join(ROOT, p));
  if (!fp.startsWith(ROOT)) return send(res, 403, 'Forbidden', '.txt');

  const candidates = [fp];
  if (!path.extname(p)) candidates.push(fp + '.html', path.join(fp, 'index.html'));

  for (const c of candidates) {
    try {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return send(res, 200, fs.readFileSync(c), c);
    } catch (e) {}
  }
  const nf = path.join(ROOT, '404.html');
  if (fs.existsSync(nf)) return send(res, 404, fs.readFileSync(nf), nf);
  return send(res, 404, 'Not found', '.txt');
});

server.listen(PORT, () => {
  console.log('v2 «Documento» no ar:  http://localhost:' + PORT);
  console.log('rotas: /  /freela  /cv  (qualquer outra -> 404 temática)');
});
