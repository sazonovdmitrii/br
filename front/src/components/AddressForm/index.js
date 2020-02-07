import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_ADDRESS, GET_ADDRESSES } from 'query';
import { UPDATE_ADDRESS_MUTATION, CREATE_ADDRESS_MUTATION } from 'mutations';
import { useApp } from 'hooks';

import Loader from 'components/Loader';

import AddressForm from './AddressForm';

const Root = ({ id, onSubmit, actions }) => {
    const { createNotification } = useApp();
    const [save] = useMutation(id ? UPDATE_ADDRESS_MUTATION : CREATE_ADDRESS_MUTATION, {
        onCompleted({ createAddress, updateAddress }) {
            const data = createAddress || updateAddress;

            if (onSubmit) {
                onSubmit(data);
            }
        },
        onError({ graphQLErrors: [{ message }] }) {
            createNotification({ type: 'error', message });
        },
        update(cache, { data: { updateAddress, createAddress } = {} }) {
            const {
                addresses: { data: items },
            } = cache.readQuery({ query: GET_ADDRESSES });

            cache.writeQuery({
                query: GET_ADDRESSES,
                data: {
                    addresses: {
                        data: createAddress ? [...items, createAddress] : updateAddress.data,
                        __typename: 'Addresses',
                    },
                },
            });
        },
    });

    if (id) {
        const { loading, data: { address: { __typename, ...newAddress } = {} } = {} } = useQuery(
            GET_ADDRESS,
            {
                variables: {
                    id,
                },
                ssr: false,
            }
        );

        if (loading) return <Loader />;

        return <AddressForm id={id} actions={actions} values={newAddress} onSubmit={save} />;
    }

    return <AddressForm actions={actions} onSubmit={save} />;
};

Root.defaultProps = {
    id: null,
    actions: null,
};

Root.propTypes = {
    id: PropTypes.number,
    actions: PropTypes.node,
    onSubmit: PropTypes.func.isRequired,
};

export default Root;
