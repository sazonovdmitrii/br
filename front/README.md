[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

### Scripts

`yarn start:dev`
Start webpack-dev-server w/o ssr.

`yarn start:dev:ssr`
Start webpack-dev-server with ssr.

`yarn build`
Build new bundle.

### Stack

-   [React.js](https://github.com/facebook/react)
-   [React Apollo](https://github.com/apollographql/react-apollo)
-   [React Router](https://github.com/ReactTraining/react-router)
-   [Koa](https://github.com/koajs/koa)

### Production startup

1. Install [yarn](https://yarnpkg.com/)
2. Install [production process manager for node.js](https://pm2.keymetrics.io/) `yarn global add pm2`
3. Install project depends `yarn --production --frozen-lockfile`
4. Build and start project `yarn build && pm2 start --env production`

### After deploy

1. `yarn post-deploy`

### How to use pm2

-   `pm2 start` - start server with config from `ecosystem.config.js`
-   `pm2 l` - show all process
-   `pm2 logs` - show logs
-   `pm2 monit` - launch dashboard with monitoring and logs
-   `pm2 reload all` - restart servers (for example after rebuild server(`yarn build:lib`))
-   `pm2 flush` - empty all application logs
