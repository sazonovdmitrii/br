import Router from '@koa/router';

import render from './render';

export default new Router()
    .get('/ping', async (ctx) => {
        ctx.body = 'pong';
    })
    .all('*', async (ctx) => {
        await render(ctx);
    });
