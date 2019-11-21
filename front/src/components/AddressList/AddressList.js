import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Edit as EditIcon, X as RemoveIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { GET_ADDRESSES } from 'query';
import { REMOVE_ADDRESS_MUTATION } from 'mutations';

import ListItem from 'components/ListItem';
import Button from 'components/Button';
import AddressForm from 'components/AddressForm';
import Title from 'components/Title';

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
    useEffect(() => {
        if (items.length === 0) {
            setShowForm({});
        }
    }, [items]);

    const handleSubmitAddress = data => {
        // if edit take new addresses from data.data
        // esle add new address from data to items
        setShowForm(null);
        onSubmit(data.data ? data.data : data);
    };

    if (showForm) {
        return (
            <>
                <Title className={styles.title}>
                    <FormattedMessage id="p_cart_order_new_address_title" />
                </Title>
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
            </>
        );
    }

    return (
        <>
            <Title className={styles.title}>
                <FormattedMessage id="p_cart_order_address_title" />
            </Title>
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
    );
};

export default AddressList;
