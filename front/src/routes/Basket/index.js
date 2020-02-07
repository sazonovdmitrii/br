import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';
import loadable from '@loadable/component';

import { GET_BASKET } from 'query';
import { useFormatMessage } from 'hooks';

import Loader from 'components/Loader';
import ErrorBoundary from 'components/ErrorBoundary';

const Component = loadable(() => import('./Basket'), {
    fallback: <Loader fullHeight />,
});

export default () => {
    const [title] = useFormatMessage([{ id: 'p_cart_meta_title' }]);
    const { loading, error, data: { basket = { products: [] }, addresses, isLoggedIn } = {} } = useQuery(
        GET_BASKET,
        {
            ssr: false,
        }
    );

    if (error) return <ErrorBoundary />;

    if (loading) return <Loader fullHeight />;

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Component basket={basket} addresses={addresses ? addresses.data : []} isLoggedIn={isLoggedIn} />
        </>
    );
};
