const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://auth.jarand.app",
            changeOrigin: true,
            secure: false,
            logLevel: "debug"
        }));
};
