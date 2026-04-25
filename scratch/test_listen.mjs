import http from 'http';
const server = http.createServer((req, res) => {
  res.end('Hello');
});
server.listen(3009, '127.0.0.1', () => {
  console.log('Listening on 3009');
  process.exit(0);
});
