import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { GET_ADDRESSES } from 'query';

import ErrorMessage from 'components/Error';
import Loader from 'components/Loader';

import AddressList from './AddressList';

export default ({ value, onChange, onSubmit }) => {
    const { loading, error, data: { addresses } = {} } = useQuery(GET_ADDRESSES, { ssr: false });

    if (error) return <ErrorMessage error={error} />;
    if (loading) return <Loader />;

    return (
        <AddressList
            items={addresses ? addresses.data : null}
            onChange={onChange}
            onSubmit={onSubmit}
            value={value}
        />
    );
};
