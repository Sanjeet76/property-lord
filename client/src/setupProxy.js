const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://evans-mern-real-estate.onrender.com",
      changeOrigin: true,
    })
  );
};
