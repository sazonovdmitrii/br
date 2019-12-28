import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Title from 'components/Title';
import BasketProduct from 'components/BasketProduct';

import styles from './styles.css';

const Order = ({ id, address, products, delivery, payment }) => {
    const totalSum = orderItems.reduce(
        (acc, { price, lenses }) =>
            acc + parseInt(price, 10) + (lenses ? parseInt(lenses.lenses.price, 10) : 0),
        0
    );
    const totalSumWithDelivery = totalSum + (delivery ? parseInt(delivery.price, 10) : 0);

    return (
        <div className={styles.container}>
            <Title className={styles.title}>
                <FormattedMessage id="p_order_title" values={{ id }} />
            </Title>
            <ul className={styles.info}>
                <li className={styles.infoItem}>Способ доставки: {delivery.direction_title}</li>
                <li className={styles.infoItem}>Способ оплаты: {payment.name}</li>
                <li className={styles.infoItem}>
                    Адрес:
                    <FormattedMessage id="p_addresses_address_text" values={address} />
                </li>
            </ul>
            <div className={styles.products}>
                {products.map(({ name, item, lenses, price, url }) => (
                    <BasketProduct
                        key={item.id}
                        name={name}
                        subName={item.name}
                        url={url}
                        options={lenses ? lenses.lenses.options : []}
                        images={item.images ? item.images[0] : null}
                        price={
                            <FormattedMessage
                                id="currency"
                                values={{
                                    price:
                                        parseInt(price, 10) +
                                        (lenses ? parseInt(lenses.lenses.price, 10) : 0),
                                }}
                            />
                        }
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
