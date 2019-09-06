import React from 'react';
import loadable from '@loadable/component';

import { GET_PRODUCT } from 'query';
import { withQuery } from 'utils';

import Loader from 'components/Loader';

const Component = loadable(() => import('./Product'), {
    fallback: Loader,
});

export default props => {
    const {
        match: { params },
    } = props;
    const slug =
        Object.values(params)
            .filter(Boolean)
            .join('/') + '.htm';

    return withQuery({ query: GET_PRODUCT, variables: { slug } })(data => <Component {...props} {...data} />);
};
