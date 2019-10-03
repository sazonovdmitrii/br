import React, { useState, useEffect, useRef } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';
import { Edit as EditIcon, X as RemoveIcon } from 'react-feather';

import { REMOVE_ADDRESS_MUTATION } from 'mutations';
import { GET_ADDRESSES } from 'query';

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

const Addresses = ({ items = [], onSubmit }) => {
    const formEl = useRef(null);
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

    useEffect(() => {
        if (formEl.current) {
            formEl.current.scrollIntoView();
        }
    }, [showForm]);

    if (showForm) {
        return (
            <div className={styles.root} ref={formEl}>
                <div className={styles.form}>
                    <h1 className={styles.formTitle}>Edit address</h1>
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
                                <FormattedMessage id="back" />
                            </Button>
                        }
                        onSubmit={handleSubmitAddress}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <FormattedMessage id="addresses" />
                </div>
            </div>
            {items && items.length ? (
                items.map(item => (
                    <ListItem
                        key={item.id}
                        title={item.name}
                        description={`${TEXT.city} ${item.city}, ${TEXT.zip} ${item.zip}, ${TEXT.street} ${
                            item.street
                        }, ${TEXT.house} ${item.house}${item.corp ? `, ${TEXT.corp} ${item.corp}` : ''}${
                            item.flat ? `, ${TEXT.flat} ${item.flat}` : ''
                        }`}
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
                    />
                ))
            ) : (
                <p>Вы не указали ни одного адреса</p>
            )}
            <div>
                <Button
                    kind="primary"
                    onClick={() => {
                        setShowForm({});
                    }}
                >
                    Добавить адрес
                </Button>
            </div>
        </div>
    );
};

export default Addresses;
