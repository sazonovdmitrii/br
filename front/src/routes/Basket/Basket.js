import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from '@apollo/react-hoc';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';

import { useApp } from 'hooks';
import { GET_SHORT_BASKET, GET_DELIVERY, GET_PICKUPS } from 'query';
import { UPDATE_PRODUCT_MUTATION, REMOVE_PRODUCT_MUTATION, ORDER_MUTATION } from 'mutations';

import Title from 'components/Title';
import Button from 'components/Button';
import Benefits from 'components/Benefits';
import BasketProduct from 'components/BasketProduct';

import styles from './styles.css';

const Basket = ({
    basket: { products: productsProps },
    gifts = [],
    cities: citiesProps,
    paymentsMethods: paymentsMethodsProps,
    addresses,
    isLoggedIn,
}) => {
    const { login, createNotification } = useApp();
    const [products, setProducts] = useState(productsProps);
    const [step, setStep] = useState(0);
    const [values, setValues] = useState({
        deliveryType: 'courier',
        city: {},
        payment: {},
        delivery: null,
        pickup: null,
        comment: '',
        address: addresses.length ? addresses[0] : null,
    });

    //* MUTATIONS
    const [handleChangeQty] = useMutation(UPDATE_PRODUCT_MUTATION, {
        onCompleted: handleChangeProducts,
        update(
            cache,
            {
                data: { updateBasket },
            }
        ) {
            cache.writeQuery({
                query: GET_SHORT_BASKET,
                data: {
                    basket: {
                        products: updateBasket.products,
                        __typename: 'Basket',
                    },
                },
            });
        },
    });
    const [handleRemoveProduct] = useMutation(REMOVE_PRODUCT_MUTATION, {
        onCompleted: handleChangeProducts,
        update(
            cache,
            {
                data: { removeBasket },
            }
        ) {
            cache.writeQuery({
                query: GET_SHORT_BASKET,
                data: {
                    basket: {
                        products: removeBasket.products,
                        __typename: 'Basket',
                    },
                },
            });
        },
    });

    const [createOrder] = useMutation(ORDER_MUTATION, {
        onCompleted({ order: { id } }) {
            if (id) setSuccess(id);
        },
        onError(data) {
            createNotification({
                type: 'error',
                message: data.graphQLErrors[0].message,
            });
        },
    });
    //* MUTATIONS

    //* QUERY delivery
    const [
        loadDeliveries,
        { called: calledDeliveries, loading: loadingDeliveries, data: { couriers, pickups } = {} },
    ] = useLazyQuery(isCourier ? GET_DELIVERY : GET_PICKUPS);
    const deliveries = couriers || pickups;
    const { payments_methods: newPaymentsMethods = [] } = currentDelivery || {};
    const allIdsPaymentMethods = newPaymentsMethods.map(({ id }) => id);
    const paymentsMethods = paymentsMethodsProps.filter(({ id }) => allIdsPaymentMethods.indexOf(id) !== -1);
    //* QUERY delivery

    if (!products.length) {
        return (
            <div>
                <Title>Your cart is empty</Title>
                <p class={styles.subtitle}>(You’re missing out is all we’re saying.)</p>
                <div className={styles.actions}>
                    <Button to="/eyeglasses" kind="primary" bold>
                        Shop eyeglasses
                    </Button>
                    <Button to="/sunglasses" kind="primary" bold>
                        Shop sunglasses
                    </Button>
                </div>
                <section className={styles.benefits}>
                    <Title>Just some things to consider</Title>
                    <Benefits />
                </section>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 class={styles.title}>Your cart: $600</h2>
                </div>
                {products.map(({ name, item_id, url, image }) => (
                    <BasketProduct key={item.item_id} name={name} id={id} url={url} image={image} />
                ))}
            </div>
        </div>
    );
};

export default Basket;
