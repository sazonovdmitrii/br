import loadable from '@loadable/component';

import Loader from 'components/Loader';

import NotFound from './NotFound';

const getComponent = (component, opts) => {
    return loadable(() => import(`./${component}`), {
        fallback: Loader,
        ...opts,
    });
};

export default lang => {
    const LANG_PREFIX = lang ? `/${lang}` : '';

    return [
        {
            component: getComponent('Home'),
            exact: true,
            path: `${LANG_PREFIX}/`,
        },
        {
            path: '/account/:slug?',
            component: getComponent('User', { ssr: false }),
        },
        {
            type: 'product',
            path: `${LANG_PREFIX}/:catalog?/:subcatalog?/:product.htm`,
            exact: true,
            strict: true,
            component: getComponent('Product'),
        },
        {
            type: 'catalog',
            path: `${LANG_PREFIX}/:catalog/:subcatalog?/:filter?`,
            exact: true,
            component: getComponent('Catalog'),
        },
        {
            component: NotFound,
        },
    ];
};
