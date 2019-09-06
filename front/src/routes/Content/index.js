import React from 'react';
import loadable from '@loadable/component';

import { GET_CONTENT } from 'query';
import { withQuery } from 'utils';

import Loader from 'components/Loader';

const Component = loadable(() => import('./Content'), {
    fallback: Loader,
});

export default ({
    match: {
        params: { slug },
    },
}) => {
    return withQuery({ query: GET_CONTENT, variables: { slug } })(props => <Component {...props} />);
};
