import React from 'react';
import loadable from '@loadable/component';
import { useParams } from 'react-router';

import { withQuery } from 'hoc';
import { GET_STORE } from 'query';

import Loader from 'components/Loader';

const Component = loadable(() => import('./RetailPage'), {
    fallback: Loader,
});

export default () => {
    const params = useParams();
    const slug = Object.values(params)
        .filter(Boolean)
        .join('/');

    return withQuery({ query: GET_STORE, variables: { slug } })(Component);
};
