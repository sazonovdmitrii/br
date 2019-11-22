import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';

import { GET_ADDRESSES } from 'query';
import { useFormatMessage } from 'hooks';

import Loader from 'components/Loader';

import Addresses from './Addresses';

export default () => {
    const [metaTitle] = useFormatMessage([{ id: 'p_addresses_title' }]);
    const { loading, data: { addresses } = {} } = useQuery(GET_ADDRESSES, { ssr: false });

    if (loading) return <Loader />;

    return (
        <>
            <Helmet title={metaTitle} />
            <Addresses items={addresses ? addresses.data : null} />
        </>
    );
};
