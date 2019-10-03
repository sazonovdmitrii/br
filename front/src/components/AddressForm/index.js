import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { GET_ADDRESS, GET_ADDRESSES } from 'query';
import { UPDATE_ADDRESS_MUTATION, CREATE_ADDRESS_MUTATION } from 'mutations';

import Loader from 'components/Loader';

import AddressForm from './AddressForm';

const GET_REGIONS = gql`
    {
        regions {
            data {
                id
                title
            }
        }
    }
`;

const Root = ({ id, onSubmit, actions }) => {
    const [save, { error: errorMutation }] = useMutation(
        id ? UPDATE_ADDRESS_MUTATION : CREATE_ADDRESS_MUTATION,
        {
            onCompleted({ createAddress, updateAddress }) {
                const data = createAddress || updateAddress;

                if (onSubmit) {
                    onSubmit(data);
                }
            },
            update(
                cache,
                {
                    data: { updateAddress, createAddress },
                }
            ) {
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
        }
    );
    const { loading, data: { address: { __typename, ...newAddress } = {}, regions } = {} } = useQuery(
        id ? GET_ADDRESS : GET_REGIONS,
        {
            variables: id
                ? {
                      id,
                  }
                : null,
            ssr: false,
        }
    );

    if (loading) return <Loader />;

    return (
        <AddressForm
            id={id}
            actions={actions}
            regions={regions.data}
            values={id ? newAddress : null}
            error={errorMutation}
            onSubmit={save}
        />
    );
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
