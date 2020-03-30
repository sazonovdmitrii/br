import path from 'path';
import fastify from 'fastify';
import helmet from 'fastify-helmet';
import serveStatic from 'serve-static';

import renderApp from './render';
import config from './config';

const app = fastify({ logger: { level: 'error' } });
const PORT = parseInt(process.env.PORT, 10) || 3000;
const isDev = process.env.NODE_ENV !== 'production';

if (isDev) {
    const webpack = require('webpack');
    const HMR = require('fastify-webpack-hmr');
    const { default: webpackConfig } = require('../../webpack.config.babel');
    const compiler = webpack(webpackConfig[1]);

    app.register(HMR, {
        compiler,
        webpackDev: {
            logLevel: 'silent',
        },
    });
}

// Plugins
app.register(helmet);
app.register(require('fastify-cookie'));

// Middlewares
app.use('/', serveStatic(path.join(config.dist, 'public')));
app.use('/', serveStatic(path.join(config.dist, '..', 'public')));
app.use('/', serveStatic(path.join(config.dist, '../..', 'public')));

// Routes
app.get('/*', async ({ cookies: { token }, req: { url } }, reply) => {
    await renderApp({ token, location: url, reply });
});

const start = async () => {
    try {
        await app.listen(PORT);
        app.log.info(`server listening on ${app.server.address().port}`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();
