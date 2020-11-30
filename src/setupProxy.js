const proxy = require('http-proxy-middleware');
const { createProxyMiddleware }  = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080'
    })
  );
  app.use(
    '/battleship',
    createProxyMiddleware({
      target: 'http://localhost:3001'
    })
  );
}