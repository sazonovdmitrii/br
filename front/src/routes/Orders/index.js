import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';

import { GET_ORDERS } from 'query';
import { withErrorBoundary } from 'hoc';

import Loader from 'components/Loader';
import ListItem from 'components/ListItem';
import Container from 'components/Container';
import Title from 'components/Title';
import Button from 'components/Button';

import styles from './styles.css';

export default withErrorBoundary(() => {
    const { loading, data: { user } = {} } = useQuery(GET_ORDERS, { ssr: false });

    if (loading) return <Loader />;

    return (
        <Container size="form" className={styles.root}>
            <div className={styles.header}>
                <Title className={styles.title}>
                    <FormattedMessage id="p_orders_title" />
                </Title>
            </div>
            {user.orders.map(({ id, secret_key, payment, delivery, address_id, orderItems }) => (
                <ListItem
                    key={id}
                    title={<FormattedMessage id="p_orders_order_title" values={{ id }} />}
                    description={
                        <>
                            {payment && (
                                <p>
                                    <FormattedMessage id="p_order_payment_method" />: {payment.title}
                                </p>
                            )}
                            {(address_id || delivery) && (
                                <p>
                                    {address_id ? (
                                        <FormattedMessage id="p_addresses_address_text" values={address_id} />
                                    ) : (
                                        <>
                                            <FormattedMessage id="p_order_address_title" />:{' '}
                                            {delivery.address}
                                        </>
                                    )}
                                </p>
                            )}
                        </>
                    }
                    actions={
                        <Button to={`/order/${secret_key}`} kind="primary" size="small" bold>
                            <FormattedMessage id="p_orders_order_action" />
                        </Button>
                    }
                />
            ))}
        </Container>
    );
});
