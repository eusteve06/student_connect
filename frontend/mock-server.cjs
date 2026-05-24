const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Custom URL Rewriter Matrix
server.use((req, res, next) => {
  if (req.url === '/api/v1/student/metrics') {
    req.url = '/metrics';
  } else if (req.url === '/api/v1/student/applications') {
    req.url = '/applications';
  } else if (req.url.startsWith('/api/v1/placements')) {
    req.url = req.url.replace('/api/v1/placements', '/placements');
  }
  next();
});

server.use(router);

server.listen(5000, () => {
  console.log(' Portal Mock API running on http://localhost:5000');
});