import loadable from '@loadable/component';
import { useParams } from 'react-router';

import { withQuery } from 'hoc';
import { GET_PRODUCT } from 'query';

import Loader from 'components/Loader';

const Component = loadable(() => import('./Product'), {
    fallback: Loader,
});

export default ({ lang }) => {
    const params = useParams();
    const slug = `${Object.values(params)
        .filter(Boolean)
        .join('/')}.htm`;

    return withQuery({ query: GET_PRODUCT, variables: { slug, locale: lang } })(Component);
};
