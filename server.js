const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const OLLAMA = 'http://127.0.0.1:11434';
const ROOT = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

function send(res, status, body, type) {
  res.writeHead(status, { 'Content-Type': type || 'text/plain; charset=utf-8' });
  res.end(body);
}

const server = http.createServer((req, res) => {
  // Proxy /api/* and /v1/* to Ollama
  if (req.url.startsWith('/api/') || req.url.startsWith('/v1/')) {
    const url = new URL(req.url, OLLAMA);
    const opts = {
      hostname: '127.0.0.1',
      port: 11434,
      path: url.pathname + url.search,
      method: req.method,
      headers: { ...req.headers, host: '127.0.0.1:11434' },
    };
    const proxy = http.request(opts, (pres) => {
      res.writeHead(pres.statusCode, pres.headers);
      pres.pipe(res);
    });
    proxy.on('error', (e) => {
      send(res, 502, JSON.stringify({ error: 'Ollama not reachable: ' + e.message }), 'application/json');
    });
    req.pipe(proxy);
    return;
  }

  let filePath = path.join(ROOT, req.url.split('?')[0]);
  if (filePath.endsWith(path.sep) || filePath === ROOT) filePath = path.join(ROOT, 'index.html');
  if (!filePath.startsWith(ROOT)) { send(res, 403, 'Forbidden'); return; }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      // SPA fallback
      fs.readFile(path.join(ROOT, 'index.html'), (e2, d2) => {
        if (e2) send(res, 404, 'Not found');
        else send(res, 200, d2, MIME['.html']);
      });
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    send(res, 200, data, MIME[ext] || 'application/octet-stream');
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`AI Korektor running at http://127.0.0.1:${PORT}`);
  console.log('Make sure Ollama is running (ollama serve).');
});
