// FOR DEV: if anyone tries to access /auth/google or /api on our client side, automatically forward that req to localhost:5000.
// FOR PROD: CRA bundles everything together and this proxy isnt necessary, the CRA server isnt even used. Only used for good development experience.
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function(app) {
    app.use(
        ["/api", "/auth/google"],
        createProxyMiddleware({
            target: "http://localhost:5000",
        })
    );
};