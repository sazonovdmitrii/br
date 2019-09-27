import React from 'react';
import loadable from '@loadable/component';
import { useParams } from 'react-router';

import { withQuery } from 'hoc';
import { GET_CATALOG } from 'query';

import Loader from 'components/Loader';

const Component = loadable(() => import('./Catalog'), {
    fallback: Loader,
});

export default () => {
    const params = useParams();
    const slug = Object.values(params)
        .reduce((array, item = '') => {
            if (item.match(/page-\d{1,}/)) {
                return array;
            }

            return [...array, item];
        }, [])
        .filter(Boolean)
        .join('/');

    return withQuery({ query: GET_CATALOG, variables: { slug } })(props => (
        <Component {...props} slug={slug} />
    ));
};
