import path from 'path';
// Koa 2 web server.  Handles incoming HTTP requests, and will serve back
// the React render, or any of the static assets being compiled
import Koa from 'koa';

import middlewares from './middlewares';
import config from './config';
import ssr from './ssr';

require('dotenv').config();

// Catch CTRL/CMD+C interrupts cleanly
process.on('SIGINT', () => {
    process.exit(0);
});

const app = new Koa();

middlewares(app);

// TODO fix hmr
if (process.env.NODE_ENV !== 'production') {
    (async () => {
        /* eslint-disable global-require, import/no-extraneous-dependencies */
        // Koa-specific Webpack handlers
        const webpack = require('webpack');
        const { default: webpackConfig } = require('../../webpack.config.babel');
        const koaWebpack = require('koa-webpack');
        /* eslint-enable global-require, import/no-extraneous-dependencies */

        // Set hot client options
        const hotClient = {
            host: config.host,
        };
        // Set default options for koaWebpack
        const defaultOptions = {
            compiler: webpack(webpackConfig),
            devMiddleware: {
                logLevel: 'silent',
                publicPath: '/',
                stats: false,
                writeToDisk: true,
            },
            hotClient,
        };

        // Create the middlware, by merging in any overrides
        const middleware = await koaWebpack(defaultOptions);

        // Attach middleware to our passed Koa app
        app.use(middleware);

        if (process.env.SSR) {
            app.use(ssr);
        } else {
            app.use(async ctx => {
                const filename = path.resolve(webpackConfig[1].output.path, '../index.html');

                ctx.response.type = 'html';
                ctx.response.body = middleware.devMiddleware.fileSystem.createReadStream(filename);
            });
        }
    })();
} else {
    app.use(ssr);
}


app.listen(config.port, () => {
    config.spinner.succeed(`Graphql server: ${process.env.GRAPHQL}`);
    config.spinner.succeed(`Running on http://${config.host}:${config.port}`);
});
