import React from 'react';
import loadable from '@loadable/component';

import Loader from 'components/Loader';

import NotFound from './NotFound';

const loadableOpts = {
    fallback: Loader,
};

export default ({ lang, defaultLang }) => {
    const LANG_PREFIX = defaultLang.value === lang ? '' : `/${lang}`;

    return [
        {
            path: `${LANG_PREFIX}/eyeglasses`,
            component: loadable(() => import(`./Landing/Eyeglasses`), loadableOpts),
            exact: true,
        },
        {
            path: `${LANG_PREFIX}/sunglasses`,
            component: loadable(() => import(`./Landing/Sunglasses`), loadableOpts),
            exact: true,
        },
        {
            path: `${LANG_PREFIX}/info/:slug`,
            component: loadable(() => import(`./Content`), loadableOpts),
            exact: true,
        },
        {
            path: `${LANG_PREFIX}/retail/:city/:name`,
            exact: true,
            component: loadable(() => import(`./RetailPage`), loadableOpts),
        },
        {
            path: `${LANG_PREFIX}/retail`,
            exact: true,
            component: loadable(() => import(`./Retail`), loadableOpts),
        },
        {
            path: `${LANG_PREFIX}/:catalog?/:subcatalog?/:product.htm`,
            component: loadable(() => import(`./Product`), loadableOpts),
            exact: true,
        },
        {
            path: `${LANG_PREFIX}/:catalog/:subcatalog?/:filter?`,
            exact: true,
            component: loadable(() => import(`./Catalog`), loadableOpts),
        },
        {
            path: `${LANG_PREFIX}/`,
            component: loadable(() => import(`./Home`), loadableOpts),
            exact: true,
        },
        {
            component: NotFound,
        },
    ];
};
