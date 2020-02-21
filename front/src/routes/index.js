import React from 'react';
import loadable from '@loadable/component';
import { useQuery } from '@apollo/react-hooks';

import { IS_LOGGED_IN } from 'query';

import Loader from 'components/Loader';
import Order from 'routes/Order';
import Catalog from 'routes/Catalog';
import Product from 'routes/Product';
import RetailPage from 'routes/RetailPage';
import Content from 'routes/Content';
import Basket from 'routes/Basket';
import Login from 'routes/Login';
import Register from 'routes/Register';
import RestorePassword from 'routes/RestorePassword';

import NotFound from './NotFound';

const loadableOpts = {
    fallback: <Loader fullHeight />,
};

export default ({ lang, defaultLang }) => {
    const { data: { isLoggedIn } = {} } = useQuery(IS_LOGGED_IN);
    const LANG_PREFIX = defaultLang.value === lang ? '' : `/${lang}`;
    const routerOptions = ({ path, exact = true }) => ({ path: LANG_PREFIX + path, exact });

    return [
        ...(isLoggedIn
            ? [
                  [loadable(() => import('./User'), loadableOpts), routerOptions({ path: '/account' })],
                  [
                      loadable(() => import('./Personal'), loadableOpts),
                      routerOptions({ path: '/account/profile' }),
                  ],
                  [
                      loadable(() => import('./Favorites'), loadableOpts),
                      routerOptions({ path: '/account/favorites' }),
                  ],
                  [
                      loadable(() => import('./Addresses'), loadableOpts),
                      routerOptions({ path: '/account/addresses' }),
                  ],
              ]
            : [
                  [RestorePassword, routerOptions({ path: '/account/forgot-password/:token?' })],
                  [Register, routerOptions({ path: '/account/register' })],
                  [Login, routerOptions({ path: '/account/login' })],
              ]),
        [Basket, routerOptions({ path: '/cart' })],
        [loadable(() => import('./Accessories'), loadableOpts), routerOptions({ path: '/accessories' })],
        [loadable(() => import('./Certificates'), loadableOpts), routerOptions({ path: '/certificates' })],
        [loadable(() => import('./HomeTryOn'), loadableOpts), routerOptions({ path: '/home-try-on' })],
        [loadable(() => import('./Lenses'), loadableOpts), routerOptions({ path: '/lenses' })],
        [
            loadable(() => import('./Landing/Eyeglasses'), loadableOpts),
            routerOptions({ path: '/eyeglasses' }),
        ],
        [
            loadable(() => import('./Landing/Sunglasses'), loadableOpts),
            routerOptions({ path: '/sunglasses' }),
        ],
        [loadable(() => import('./Retail'), loadableOpts), routerOptions({ path: '/retail' })],
        [loadable(() => import('./Home'), loadableOpts), routerOptions({ path: '/' })],
        [Order, routerOptions({ path: '/order/:hash' })],
        [RetailPage, routerOptions({ path: '/retail/:city/:name' })],
        [Content, routerOptions({ path: '/info/:slug' })],
        [Product, routerOptions({ path: '/:catalog?/:subcatalog?/:product.htm' })],
        [Catalog, routerOptions({ path: '/:catalog/:subcatalog?/:filter?' })],
        [NotFound],
    ].filter(Boolean);
};
