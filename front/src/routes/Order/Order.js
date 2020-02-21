import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import { useFormatMessage } from 'hooks';

import Container from 'components/Container';
import Title from 'components/Title';
import BasketProduct from 'components/BasketProduct';

import Sidebar from '../Basket/Sidebar';

import styles from './styles.css';

const getTotalSum = (array, callback) =>
    array.reduce((acc, item) => {
        const foo = callback(item);

        return acc + foo;
    }, 0);

const Order = ({ id, address_id, orderItems = [], delivery, payment }) => {
    const [title] = useFormatMessage([{ id: 'p_order_title', values: { id } }]);
    const isCouponApplied = orderItems.some(({ coupon_price: couponPrice }) => parseInt(couponPrice, 10));
    const totalSum = getTotalSum(
        orderItems,
        ({ price, lense }) => parseInt(price, 10) + (lense.price ? parseInt(lense.price, 10) : 0)
    );
    const totalSumWithCoupon = getTotalSum(
        orderItems,
        ({ coupon_price: couponPrice, lense }) =>
            parseInt(couponPrice, 10) + (lense.price ? parseInt(lense.price, 10) : 0)
    );
    const totalSumWithDelivery =
        (isCouponApplied ? totalSumWithCoupon : totalSum) +
        (delivery.price ? parseInt(delivery.price, 10) : 0);

    return (
        <Container className={styles.container}>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Title className={styles.title}>
                <FormattedMessage id="p_order_title" values={{ id }} />
            </Title>
            <div className={styles.products}>
                {orderItems.map(({ item, lense, price, coupon_price: couponPrice, url }) => (
                    <BasketProduct
                        key={item.id}
                        name={item.product.name}
                        subName={item.name}
                        url={item.product.url}
                        options={lense.options ? lense.options : []}
                        recipes={lense.recipes}
                        images={item.images ? item.images[0] : null}
                        oldPrice={
                            isCouponApplied && (
                                <FormattedMessage
                                    id="currency"
                                    values={{
                                        price:
                                            parseInt(price, 10) +
                                            (lense.price ? parseInt(lense.price, 10) : 0),
                                    }}
                                />
                            )
                        }
                        price={
                            <FormattedMessage
                                id="currency"
                                values={{
                                    price:
                                        parseInt(isCouponApplied ? couponPrice : price, 10) +
                                        (lense.price ? parseInt(lense.price, 10) : 0),
                                }}
                            />
                        }
                    />
                ))}
            </div>
            <Sidebar
                className={styles.sidebar}
                messages={[
                    // {
                    //     name: <FormattedMessage id="p_order_delivery_method" />,
                    //     value: delivery && delivery.direction_title,
                    // },
                    {
                        name: <FormattedMessage id="p_order_payment_method" />,
                        value: payment.title,
                    },
                    {
                        name: <FormattedMessage id="p_order_address_title" />,
                        value: address_id ? (
                            <FormattedMessage id="p_addresses_address_text" values={address_id} />
                        ) : (
                            delivery.address
                        ),
                    },
                ]}
                pricing={[
                    {
                        name: 'p_cart_sidebar_shipping',
                        value: delivery && delivery.price,
                    },
                    isCouponApplied && {
                        name: 'p_cart_sidebar_total_with_coupon',
                        value: totalSumWithCoupon,
                    },
                    { name: 'p_cart_sidebar_total', value: totalSumWithDelivery },
                ].filter(Boolean)}
            />
        </Container>
    );
};

Order.defaultProps = {};

Order.propTypes = {
    products: PropTypes.arrayOf(PropTypes.string),
};

export default Order;
