import path from 'path';
// Static file handler
import koaSend from 'koa-send';
// High-precision timing, so we can debug response time to serve a request
import ms from 'microseconds';
// Enable cross-origin requests
import cors from '@koa/cors';
// Logger
import logger from 'koa-pino-logger';
import helmet from 'koa-helmet';

import config from './config';
import router from './router';
import { getPath, missingSlash } from './utils';

const isProd = process.env.NODE_ENV === 'production';

// Static file serving
const staticMiddleware = ({ root, maxage, immutable }) => async (ctx, next) => {
    try {
        if (ctx.path !== '/') {
            return await koaSend(ctx, ctx.path, {
                root,
                maxage,
                immutable,
            });
        }
    } catch (error) {
        /* Error? Go to next middleware... */
    }
    return next();
};

export default app => {
    if (isProd) {
        app.use(helmet()).use(cors());
    }

    app.use(
        logger({
            level: 'warn',
            prettyPrint: {
                levelFirst: true,
                colorize: true,
                translateTime: 'dd-mm-yyyy h:MM:ss TT',
            },
        })
    )
        .use(async (ctx, next) => {
            const $path = ctx.status !== 301 ? getPath(ctx.originalUrl, ctx.querystring) : null;

            if ($path && (!ctx.body || ctx.status !== 200) && missingSlash($path)) {
                const query = ctx.querystring.length ? `?${ctx.querystring}` : '';

                ctx.status = 301;
                ctx.redirect(`${$path}/${query}`);
            }

            await next();
        })
        // Error catcher
        .use(async (ctx, next) => {
            try {
                await next();
            } catch (error) {
                console.log('Error:', error);
                ctx.status = 500;
                ctx.body = `There was an error. Please try again later. \n ${error.message}`;
            }
        })
        // Timing
        .use(async (ctx, next) => {
            const start = ms.now();
            await next();
            const end = ms.parse(ms.since(start));
            const total = end.microseconds + end.milliseconds * 1e3 + end.seconds * 1e6;
            ctx.set('Response-Time', `${total / 1e3}ms`);
        })
        // In production, check <dist>/public first
        .use(
            staticMiddleware({
                root: path.resolve(config.dist, 'public'),
                maxage: isProd ? 31536000000 : 0,
                immutable: true,
            })
        )
        // ... and then fall-back to <root>/public
        .use(
            staticMiddleware({
                root: path.resolve(config.dist, '..', 'public'),
            })
        )
        // public symfony
        .use(
            staticMiddleware({
                root: path.resolve(config.dist, '../..', 'public'),
            })
        )
        // Router
        .use(router.allowedMethods())
        .use(router.routes());
};
