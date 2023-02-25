// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/demands", {
      target: "http://localhost:3001",
      ws: true,
      changeOrigin: true,
      pathRewrite: { "^/demands": "/demands" }
    })
  );
};
