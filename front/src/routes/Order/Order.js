import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Title from 'components/Title';
import BasketProduct from 'components/BasketProduct';

import styles from './styles.css';

const Order = ({ id, address, products, delivery, payment }) => {
    const totalSum = products.reduce((acc, item) => acc + item.price * item.qty, 0);
    const totalSumWithDelivery = totalSum + parseInt(delivery.price, 10);

    return (
        <div className={styles.container}>
            <Title>Спасибо за заказ №{id}</Title>
            <ul className={styles.info}>
                <li className={styles.infoItem}>Способ доставки: {delivery.direction_title}</li>
                <li className={styles.infoItem}>Способ оплаты: {payment.name}</li>
                <li className={styles.infoItem}>
                    Адрес:
                    <FormattedMessage id="p_addresses_address_text" values={address} />
                </li>
            </ul>
            <div className={styles.products}>
                {products.map(({ item, name, price, url }) => (
                    <BasketProduct
                        key={item.id}
                        images={item.images[0]}
                        name={name}
                        subName={item.name}
                        price={<FormattedMessage id="currency" values={{ price }} />}
                        url={url}
                    />
                ))}
            </div>
            <div className={styles.pricing}>
                <p className={styles.pricingItem}>
                    Доставка
                    <span className={styles.pricingValue}>
                        <FormattedMessage
                            id={delivery.price ? 'currency' : 'free'}
                            values={{ price: delivery.price }}
                        />
                    </span>
                </p>
                <p className={styles.pricingItem}>
                    Итого
                    <span className={styles.pricingValue}>
                        <FormattedMessage id="currency" values={{ price: totalSumWithDelivery }} />
                    </span>
                </p>
            </div>
        </div>
    );
};

Order.defaultProps = {
    products: [],
    delivery: {},
    payment: {},
};

Order.propTypes = {
    products: PropTypes.arrayOf(PropTypes.string),
};

export default Order;
