import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_ADDRESSES } from 'query';

import Loader from 'components/Loader';

import Addresses from './Addresses';

export default () => {
    const { loading, data: { addresses } = {} } = useQuery(GET_ADDRESSES, { ssr: false });

    if (loading) return <Loader />;

    return <Addresses items={addresses ? addresses.data : null} />;
};
