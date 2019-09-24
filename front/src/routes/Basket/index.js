import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';

import { GET_BASKET } from 'query';

import Loader from 'components/Loader';
import ErrorMessage from 'components/Error';

import Basket from './Basket';

export default () => {
    const {
        loading,
        error,
        data: { basket, cities, payments_methods, addresses, isLoggedIn } = {},
    } = useQuery(GET_BASKET, {
        ssr: false,
    });

    if (loading) return <Loader />;

    return (
        <>
            <Helmet>
                <title>Cart</title>
            </Helmet>
            <Basket
                basket={basket}
                paymentsMethods={payments_methods.data}
                addresses={addresses.data}
                isLoggedIn={isLoggedIn}
                cities={cities.data}
            />
        </>
    );
};
