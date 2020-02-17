import React from 'react';
import loadable from '@loadable/component';
import { useParams } from 'react-router';

import { withQuery } from 'hoc';
import { GET_CONTENT } from 'query';

import Loader from 'components/Loader';

const Component = loadable(() => import('./Content'), {
    fallback: Loader,
});

export default ({ lang }) => {
    const { slug } = useParams();

    return withQuery({ query: GET_CONTENT, variables: { slug, locale: lang } })(Component);
};
