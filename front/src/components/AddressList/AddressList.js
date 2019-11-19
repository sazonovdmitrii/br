import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Edit as EditIcon, X as RemoveIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { GET_ADDRESSES } from 'query';
import { REMOVE_ADDRESS_MUTATION } from 'mutations';

import ListItem from 'components/ListItem';
import Button from 'components/Button';
import AddressForm from 'components/AddressForm';

import styles from './styles.css';

const TEXT = {
    city: 'г.',
    corp: 'корп.',
    flat: 'кв.',
    house: 'д.',
    street: 'ул.',
    zip: 'индекс:',
};

const AddressList = ({ items = [], value, onChange, onSubmit = () => {} }) => {
    const [showForm, setShowForm] = useState(null);
    const [handleRemoveAddress] = useMutation(REMOVE_ADDRESS_MUTATION, {
        update(
            cache,
            {
                data: { removeAddress },
            }
        ) {
            cache.writeQuery({
                query: GET_ADDRESSES,
                data: {
                    addresses: {
                        data: removeAddress.data,
                        __typename: 'Addresses',
                    },
                },
            });
        },
    });
    const handleSubmitAddress = data => {
        // if edit take new addresses from data.data
        // esle add new address from data to items
        setShowForm(null);
        onSubmit(data.data ? data.data : data);
    };

    return (
        <>
            {items && items.length ? (
                <>
                    {items.map(item => (
                        <ListItem
                            key={item.id}
                            title={item.name}
                            description={
                                <FormattedMessage
                                    id="p_addresses_address_text"
                                    values={{
                                        city: item.city,
                                        zip: item.zip,
                                        street: item.street,
                                        house: item.house,
                                        corp: item.corp,
                                        flat: item.flat,
                                    }}
                                />
                            }
                            actions={
                                <>
                                    <Button
                                        aria-label="Редактировать"
                                        kind="primary"
                                        outlined
                                        onClick={event => {
                                            event.stopPropagation();

                                            setShowForm({
                                                id: item.id,
                                            });
                                        }}
                                    >
                                        <EditIcon size="15" className={styles.icon} />
                                    </Button>
                                    <Button
                                        aria-label="Удалить"
                                        kind="primary"
                                        outlined
                                        onClick={event => {
                                            event.stopPropagation();

                                            handleRemoveAddress({
                                                variables: {
                                                    input: {
                                                        id: item.id,
                                                    },
                                                },
                                            });
                                        }}
                                    >
                                        <RemoveIcon size="15" className={styles.icon} />
                                    </Button>
                                </>
                            }
                            active={value === item.id}
                            onClick={() => onChange(item)}
                            pointer={!!value}
                        />
                    ))}
                    <Button
                        kind="primary"
                        onClick={() => {
                            setShowForm({});
                        }}
                        bold
                    >
                        Добавить адрес
                    </Button>
                </>
            ) : (
                <div ref={formEl}>
                    <AddressForm
                        id={showForm.id}
                        actions={
                            <Button
                                kind="secondary"
                                bold
                                onClick={() => {
                                    setShowForm(null);
                                }}
                            >
                                Назад
                            </Button>
                        }
                        onSubmit={handleSubmitAddress}
                    />
                </div>
            )}
        </>
    );
};

export default AddressList;
