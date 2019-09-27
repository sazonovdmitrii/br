import loadable from '@loadable/component';

import { withErrorBoundary } from 'hoc';

import Catalog from 'routes/Catalog';
import Product from 'routes/Product';

import Loader from 'components/Loader';

import NotFound from './NotFound';

const getComponent = component => {
    return withErrorBoundary(
        loadable(component, {
            fallback: Loader,
        })
    );
};

export default ({ lang, defaultLang }) => {
    const LANG_PREFIX = defaultLang.value === lang ? '' : `/${lang}`;
    const routerOptions = ({ path, exact = true }) => ({ path: LANG_PREFIX + path, exact });

    return [
        [getComponent(() => import(`./Landing/Eyeglasses`)), routerOptions({ path: `/eyeglasses` })],
        [getComponent(() => import(`./Landing/Sunglasses`)), routerOptions({ path: `/sunglasses` })],
        [getComponent(() => import(`./Content`)), routerOptions({ path: `/info/:slug` })],
        [getComponent(() => import(`./RetailPage`)), routerOptions({ path: `/retail/:city/:name` })],
        [getComponent(() => import(`./Retail`)), routerOptions({ path: `/retail` })],
        [withErrorBoundary(Product), routerOptions({ path: `/:catalog?/:subcatalog?/:product.htm` })],
        [withErrorBoundary(Catalog), routerOptions({ path: `/:catalog/:subcatalog?/:filter?` })],
        [getComponent(() => import(`./Home`)), routerOptions({ path: `/` })],
        [NotFound],
    ];
};
