import loadable from '@loadable/component';

import Loader from 'components/Loader';

import NotFound from './NotFound';

const getComponent = (component, opts) => {
    return loadable(() => import(`./${component}`), {
        fallback: Loader,
        ...opts,
    });
};

export default ({ lang, defaultLang }) => {
    const LANG_PREFIX = defaultLang.value === lang ? '' : `/${lang}`;

    return [
        {
            path: '/account/:slug?',
            component: getComponent('User', { ssr: false }),
        },
        {
            path: `${LANG_PREFIX}/eyeglasses`,
            exact: true,
            component: getComponent('Landing/Eyeglasses'),
        },
        {
            path: `${LANG_PREFIX}/sunglasses`,
            exact: true,
            component: getComponent('Landing/Eyeglasses'),
        },
        {
            path: `${LANG_PREFIX}/info/:slug`,
            exact: true,
            component: getComponent('Content'),
        },
        {
            path: `${LANG_PREFIX}/retail`,
            exact: true,
            component: getComponent('Retail'),
        },
        {
            type: 'product',
            path: `${LANG_PREFIX}/:catalog?/:subcatalog?/:product.htm`,
            exact: true,
            component: getComponent('Product'),
        },
        {
            type: 'catalog',
            path: `${LANG_PREFIX}/:catalog/:subcatalog?/:filter?`,
            exact: true,
            component: getComponent('Catalog'),
        },
        {
            component: getComponent('Home'),
            exact: true,
            path: `${LANG_PREFIX}/`,
        },
        {
            component: NotFound,
        },
    ];
};
