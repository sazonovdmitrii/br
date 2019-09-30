import loadable from '@loadable/component';

import { withErrorBoundary } from 'hoc';

import Loader from 'components/Loader';

import NotFound from './NotFound';

const loadableOpts = {
    fallback: Loader,
};

export default ({ lang, defaultLang }) => {
    const LANG_PREFIX = defaultLang.value === lang ? '' : `/${lang}`;
    const routerOptions = ({ path, exact = true }) => ({ path: LANG_PREFIX + path, exact });

    return [
        [
            withErrorBoundary(loadable(() => import('./RemindPassword'), loadableOpts)),
            routerOptions({ path: '/account/remind-password' }),
        ],
        [
            withErrorBoundary(loadable(() => import('./Register'), loadableOpts)),
            routerOptions({ path: '/account/register' }),
        ],
        [
            withErrorBoundary(loadable(() => import('./Login'), loadableOpts)),
            routerOptions({ path: '/account/login' }),
        ],
        [
            withErrorBoundary(loadable(() => import('./Landing/Eyeglasses'), loadableOpts)),
            routerOptions({ path: '/eyeglasses' }),
        ],
        [
            withErrorBoundary(loadable(() => import('./Landing/Sunglasses'), loadableOpts)),
            routerOptions({ path: '/sunglasses' }),
        ],
        [
            withErrorBoundary(loadable(() => import('./Content'), loadableOpts)),
            routerOptions({ path: '/info/:slug' }),
        ],
        [
            withErrorBoundary(loadable(() => import('./RetailPage'), loadableOpts)),
            routerOptions({ path: '/retail/:city/:name' }),
        ],
        [
            withErrorBoundary(loadable(() => import('./Retail'), loadableOpts)),
            routerOptions({ path: '/retail' }),
        ],
        [
            withErrorBoundary(loadable(() => import('./Product'), loadableOpts)),
            routerOptions({ path: '/:catalog?/:subcatalog?/:product.htm' }),
        ],
        [
            withErrorBoundary(loadable(() => import('./Catalog'), loadableOpts)),
            routerOptions({ path: '/:catalog/:subcatalog?/:filter?' }),
        ],
        [withErrorBoundary(loadable(() => import('./Home'), loadableOpts)), routerOptions({ path: '/' })],
        [NotFound],
    ];
};
