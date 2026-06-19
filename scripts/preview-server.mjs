import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'dist');
const port = 5175;

const mimeTypes = {
  '.css': 'text/css; charset=utf-8',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mp4': 'video/mp4',
  '.svg': 'image/svg+xml',
};

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', `http://127.0.0.1:${port}`);
  const pathname = decodeURIComponent(url.pathname);
  const requestedPath = normalize(join(root, pathname));
  const safePath = requestedPath.startsWith(root) ? requestedPath : join(root, 'index.html');
  const filePath = existsSync(safePath) && statSync(safePath).isFile() ? safePath : join(root, 'index.html');
  const ext = extname(filePath);

  response.writeHead(200, {
    'Content-Type': mimeTypes[ext] ?? 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  createReadStream(filePath).pipe(response);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Portfolio preview: http://127.0.0.1:${port}/`);
});
