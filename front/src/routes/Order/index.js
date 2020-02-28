import React from 'react';
import loadable from '@loadable/component';
import { useParams } from 'react-router';

import { withQuery, withErrorBoundary } from 'hoc';
import { GET_ORDER } from 'query';

import Loader from 'components/Loader';

const Component = loadable(() => import('./Order'), {
    fallback: Loader,
});

export default withErrorBoundary(({ lang }) => {
    const { hash } = useParams();

    return withQuery({ query: GET_ORDER, variables: { hash, locale: lang } })(Component);
});
