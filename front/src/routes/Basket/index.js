import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Helmet } from 'react-helmet';

import { GET_BASKET } from 'query';
import { useFormatMessage } from 'hooks';

import Loader from 'components/Loader';
import ErrorBoundary from 'components/ErrorBoundary';

import Basket from './Basket';

export default () => {
    const [title] = useFormatMessage([{ id: 'p_cart_meta_title' }]);
    const {
        loading,
        error,
        data: { basket = { products: [] }, cities, payments_methods, addresses, isLoggedIn } = {},
    } = useQuery(GET_BASKET, {
        ssr: false,
    });

    if (error) return <ErrorBoundary />;

    if (loading) return <Loader fullHeight />;

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Basket
                basket={basket}
                paymentsMethods={payments_methods.data}
                addresses={addresses ? addresses.data : []}
                isLoggedIn={isLoggedIn}
                cities={cities ? cities.data : []}
            />
        </>
    );
};
