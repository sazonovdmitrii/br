import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';

import { useApp } from 'hooks';
import { GET_SHORT_BASKET, GET_DELIVERY, GET_PICKUPS } from 'query';
import {
    // UPDATE_PRODUCT_MUTATION,
    REMOVE_PRODUCT_MUTATION,
    ORDER_MUTATION,
} from 'mutations';
import { isNumber } from 'utils';

import Button from 'components/Button';
import LoginForm from 'components/LoginForm';
import { StepView, StepContainer } from 'components/Steps';
import AddressList from 'components/AddressList/AddressList';
import Select from 'components/Select';
import Loader from 'components/Loader';
import ListItem from 'components/ListItem';
import BasketProduct from 'components/BasketProduct';
import UserForm from 'components/UserForm';
import Title from 'components/Title';
import Link from 'components/Link';
import RemindPasswordForm from 'components/RemindPasswordForm';
import Hr from 'components/Hr';
// TODO REMOVE
import Order from 'routes/Order/Order';
import Snackbar, { SnackbarOverlay } from 'components/Snackbar';

// import Success from 'routes/Success';

import Empty from './Empty';
import Sidebar from './Sidebar';
import styles from './styles.css';

const DELIVERY_TYPES = [
    {
        id: 'courier',
        label: 'Курьером',
    },
    // {
    //     id: 'pickup',
    //     label: 'Самовывоз',
    // },
];
const ERORRS = {
    city: 'Не указан город доставки',
    address: 'Не указан адрес',
    payment: 'Не указан способ оплаты',
    pickup: 'Не указан пункт выдачи',
    delivery: 'Не указан способ доставки',
};

const theme = {
    root: styles.container,
    title: styles.title,
    header: styles.header,
};

const Basket = ({
    basket: { products: productsProps },
    cities: citiesProps,
    paymentsMethods: paymentsMethodsProps,
    addresses,
    isLoggedIn,
}) => {
    const { login } = useApp();
    const [orderId, setOrderId] = useState(false);
    const [products, setProducts] = useState(productsProps);
    const [step, setStep] = useState(0);
    const [values, setValues] = useState({
        deliveryType: 'courier',
        city: {},
        payment: {},
        delivery: null,
        pickup: null,
        comment: '',
        address: addresses && addresses.length ? addresses[0] : null,
    });
    const [collapse, setCollapse] = useState({
        pickup: false,
        delivery: false,
    });
    const [loginType, setLoginType] = useState('login');
    const [notification, setNotification] = useState(null);
    const [disabledOrderButton, setDisabledOrderButton] = useState(true);

    const isCourier = values.deliveryType === 'courier';
    const currentDelivery = isCourier ? values.delivery : values.pickup;
    const totalSum = products.reduce((acc, item) => acc + item.price * item.qty, 0);
    const citiesForSelect = citiesProps
        .map(({ id, title, visible, ...any }) => {
            if (visible) return { id, value: title, ...any };
            return null;
        })
        .filter(Boolean);

    const handleChangeProducts = ({ removeBasket, updateBasket }, data = removeBasket || updateBasket) => {
        if (!data) return;

        const { products: newProducts } = data;

        setProducts(newProducts);
    };

    //* MUTATIONS
    // const [handleChangeQty] = useMutation(UPDATE_PRODUCT_MUTATION, {
    //     onCompleted: handleChangeProducts,
    //     update(
    //         cache,
    //         {
    //             data: { updateBasket },
    //         }
    //     ) {
    //         cache.writeQuery({
    //             query: GET_SHORT_BASKET,
    //             data: {
    //                 basket: {
    //                     products: updateBasket.products,
    //                     __typename: 'Basket',
    //                 },
    //             },
    //         });
    //     },
    // });
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
            if (id) {
                setOrderId(id);
            }
        },
        update(cache) {
            cache.writeQuery({
                query: GET_SHORT_BASKET,
                data: {
                    basket: {
                        products: [],
                        __typename: 'Basket',
                    },
                },
            });
        },
        onError({ graphQLErrors: [{ message }] }) {
            setNotification({
                type: 'error',
                message,
            });
        },
    });
    //* MUTATIONS

    //* QUERY delivery
    const [
        loadDeliveries,
        { called: calledDeliveries, loading: loadingDeliveries, data: { couriers, pickups } = {} },
    ] = useLazyQuery(isCourier ? GET_DELIVERY : GET_PICKUPS);
    const deliveries = !calledDeliveries
        ? []
        : loadingDeliveries
        ? []
        : couriers
        ? couriers.data.slice(-1)
        : pickups.data;
    const { payments_methods: newPaymentsMethods = [] } = currentDelivery || {};
    const allIdsPaymentMethods = newPaymentsMethods.map(({ id }) => id);
    const paymentsMethods = paymentsMethodsProps.filter(({ id }) => allIdsPaymentMethods.indexOf(id) !== -1);
    //* QUERY delivery

    /* EFFECTS */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    useEffect(() => {
        setCollapse({
            pickup: false,
            delivery: false,
        });
    }, [values.city.id]);

    useEffect(() => {
        if (!values.delivery && deliveries && deliveries.length === 1) {
            setValues(prevState => ({
                ...prevState,
                delivery: deliveries[0],
            }));
        }
    }, [values.delivery, deliveries]);

    useEffect(() => {
        // todo refactor
        const fields = isCourier ? ['delivery', 'address'] : ['pickup'];
        const requiredFields = ['city', ...fields, 'payment'];

        const valid = requiredFields
            .map(field => {
                const value = values[field];

                if (!value) return field;

                if (isNumber(value) || (typeof value === 'object' && value.id)) {
                    return null;
                }

                return field;
            })
            .filter(Boolean);

        setDisabledOrderButton(!!valid.length);
    }, [values]);
    /* EFFECTS  */

    const handleChangeStep = index => {
        // if (notification && notification.errorType === 'lowPrice') return;

        setStep(index);
    };
    const handleChangeSelect = data => {
        loadDeliveries({
            variables: {
                city_id: data.id,
            },
        });

        setValues(prevState => ({
            ...prevState,
            city: data,
        }));
    };
    const handleSubmitAddress = data => {
        if (data.id) {
            setValues(prevState => ({
                ...prevState,
                address: data,
            }));
        }
    };
    const isValid = () => {
        const fields = isCourier ? ['delivery', 'address'] : ['pickup'];
        const requiredFields = ['city', ...fields, 'payment'];

        const valid = requiredFields
            .map(field => {
                const value = values[field];

                if (!value) return field;

                if (isNumber(value) || (typeof value === 'object' && value.id)) {
                    return null;
                }

                return field;
            })
            .filter(Boolean);

        if (valid.length) {
            const name = [...valid].shift();

            setNotification({
                type: 'error',
                message: ERORRS[name],
            });
        }

        return !valid.length;
    };
    const handleLogInCompleted = ({ auth: { hash } }) => {
        login(hash);
    };
    const handleRegisterCompleted = ({ register: { hash } }) => {
        login(hash);
    };
    const handleChangeAddress = data => {
        setValues(prevState => ({ ...prevState, address: data }));
    };
    const handleClickListItem = ({ data, type }) => {
        setValues(prevState => ({
            ...prevState,
            [type]: data,
        }));
    };

    if (orderId) {
        return (
            <Order
                id={orderId}
                products={products}
                address={values.address}
                delivery={values.delivery}
                payment={values.payment}
            />
        );
    }

    if (!products.length) {
        return <Empty />;
    }

    return (
        <div className={styles.root}>
            <SnackbarOverlay>
                {notification && (
                    <Snackbar
                        text={notification.message}
                        active={!!notification.message}
                        theme={notification.type}
                        onClose={() => setNotification(null)}
                        overlay={false}
                    />
                )}
            </SnackbarOverlay>
            <StepView active={step} onChange={handleChangeStep}>
                <StepContainer
                    title={
                        <>
                            <FormattedMessage id="p_cart_step_title_your_cart" />:{' '}
                            <FormattedMessage id="currency" values={{ price: totalSum }} />
                        </>
                    }
                    theme={{ ...theme, body: styles.firstStepBody }}
                >
                    <div className={styles.products}>
                        {products.map(({ item, price, url }) => (
                            <BasketProduct
                                key={item.id}
                                images={item.images[0]}
                                name={item.name}
                                price={<FormattedMessage id="currency" values={{ price }} />}
                                url={url}
                                onRemove={() => {
                                    handleRemoveProduct({
                                        variables: { input: { item_id: item.id } },
                                    });
                                }}
                            />
                        ))}
                    </div>
                    <Sidebar
                        className={styles.sidebar}
                        messages={['p_cart_sidebar_message']}
                        pricing={[
                            {
                                name: 'p_cart_sidebar_shipping',
                                value: currentDelivery && currentDelivery.price,
                            },
                            { name: 'p_cart_sidebar_subtotal', value: totalSum },
                        ]}
                        actions={
                            <Button
                                kind="primary"
                                size="large"
                                onClick={() => step === 0 && handleChangeStep(step + 1)}
                                bold
                                fullWidth
                            >
                                Перейти к оформлению
                            </Button>
                        }
                    />
                </StepContainer>
                {isLoggedIn ? (
                    <StepContainer title="Оформление заказа" theme={theme}>
                        <div className={styles.block}>
                            <Select
                                label="Город*"
                                items={citiesForSelect}
                                value={values.city.id}
                                onChange={handleChangeSelect}
                            />
                        </div>
                        {DELIVERY_TYPES.length >= 2 ? (
                            <div className={styles.block}>
                                <Title className={styles.blockTitle}>
                                    <FormattedMessage id="p_cart_order_receiving_title" />
                                </Title>
                                {DELIVERY_TYPES.map(({ id, label }) => (
                                    <ListItem
                                        key={id}
                                        title={label}
                                        active={values.deliveryType === id}
                                        onClick={() =>
                                            handleClickListItem({
                                                type: 'deliveryType',
                                                data: id,
                                            })
                                        }
                                        pointer
                                    />
                                ))}
                            </div>
                        ) : null}
                        {!calledDeliveries ? null : loadingDeliveries ? (
                            <Loader />
                        ) : (
                            <>
                                {/* !isCourier && (
                                    <Map
                                        value={values.pickup}
                                        center={{
                                            lat: parseFloat(values.city.latitude),
                                            lng: parseFloat(values.city.longitude),
                                        }}
                                        source={deliveries.data.map(
                                            ({ id, latitude, longitude, ...any }) => ({
                                                ...any,
                                                id,
                                                lat: parseFloat(latitude),
                                                lng: parseFloat(longitude),
                                            })
                                        )}
                                        onChange={pickup => {
                                            setValues(prevState => ({ ...prevState, pickup }));
                                            setCollapse(prevState => ({ ...prevState, pickup: true }));
                                        }}
                                    />
                                ) */}
                                <div className={styles.block}>
                                    <Title className={styles.blockTitle}>
                                        <FormattedMessage
                                            id={
                                                isCourier
                                                    ? 'p_cart_order_delivery_title'
                                                    : 'p_cart_order_pickup_title'
                                            }
                                        />
                                    </Title>
                                    <div>
                                        {collapse[values.deliveryType] &&
                                        deliveries.length > 1 &&
                                        currentDelivery ? (
                                            <div>
                                                <ListItem
                                                    title={currentDelivery.direction_title}
                                                    description={
                                                        isCourier ? (
                                                            <>
                                                                <p>
                                                                    {currentDelivery.delivery_days_source}:{' '}
                                                                    {currentDelivery.delivery_days}
                                                                </p>
                                                                {currentDelivery.comment && (
                                                                    <p>{currentDelivery.comment}</p>
                                                                )}
                                                            </>
                                                        ) : (
                                                            <>
                                                                <p>
                                                                    {currentDelivery.delivery_days_source}:{' '}
                                                                    {currentDelivery.delivery_days}
                                                                </p>
                                                                <p>Адрес: {currentDelivery.address}</p>
                                                                <p>
                                                                    Время работы: {currentDelivery.schedule}
                                                                </p>
                                                                {currentDelivery.comment && (
                                                                    <p>{currentDelivery.comment}</p>
                                                                )}
                                                            </>
                                                        )
                                                    }
                                                    actions={
                                                        <b>
                                                            <FormattedMessage
                                                                id={
                                                                    currentDelivery.price === '0'
                                                                        ? 'free'
                                                                        : 'currency'
                                                                }
                                                                values={{ price: currentDelivery.price }}
                                                            />
                                                        </b>
                                                    }
                                                    active
                                                />
                                                <Button
                                                    kind="primary"
                                                    onClick={() =>
                                                        setCollapse(prevState => ({
                                                            ...prevState,
                                                            [values.deliveryType]: false,
                                                        }))
                                                    }
                                                    bold
                                                >
                                                    Показать еще ({deliveries.length - 1})
                                                </Button>
                                            </div>
                                        ) : (
                                            deliveries.map(item => {
                                                const {
                                                    direction_title: title,
                                                    delivery_days: deliveryDays,
                                                    delivery_days_source: deliveryDaysSource,
                                                    id,
                                                    address,
                                                    schedule,
                                                    price,
                                                    visible,
                                                    comment,
                                                } = item;
                                                if (!visible) return null;

                                                return (
                                                    <ListItem
                                                        key={id}
                                                        title={title}
                                                        description={
                                                            isCourier ? (
                                                                <>
                                                                    <p>
                                                                        {deliveryDaysSource}: {deliveryDays}
                                                                    </p>
                                                                    {comment && <p>{comment}</p>}
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p>
                                                                        {deliveryDaysSource}: {deliveryDays}
                                                                    </p>
                                                                    <p>Адрес: {address}</p>
                                                                    <p>Время работы: {schedule}</p>

                                                                    {comment && <p>{comment}</p>}
                                                                </>
                                                            )
                                                        }
                                                        actions={
                                                            <b>
                                                                <FormattedMessage
                                                                    id={price === '0' ? 'free' : 'currency'}
                                                                    values={{ price }}
                                                                />
                                                            </b>
                                                        }
                                                        active={currentDelivery && currentDelivery.id === id}
                                                        onClick={() => {
                                                            handleClickListItem({
                                                                type: isCourier ? 'delivery' : 'pickup',
                                                                data: item,
                                                            });
                                                            setCollapse(prevState => ({
                                                                ...prevState,
                                                                [values.deliveryType]: true,
                                                            }));
                                                            // set default first payment
                                                            setValues(prevState => ({
                                                                ...prevState,
                                                                payment: paymentsMethodsProps.find(
                                                                    payment =>
                                                                        payment.id ===
                                                                        item.payments_methods[0].id
                                                                ),
                                                            }));
                                                        }}
                                                        pointer
                                                    />
                                                );
                                            })
                                        )}
                                    </div>
                                </div>
                                {isCourier && (
                                    <div className={styles.block}>
                                        <AddressList
                                            items={addresses}
                                            onChange={handleChangeAddress}
                                            onSubmit={handleSubmitAddress}
                                            value={values.address ? values.address.id : null}
                                        />
                                    </div>
                                )}
                                {currentDelivery &&
                                    currentDelivery.id &&
                                    paymentsMethods &&
                                    paymentsMethods.length && (
                                        <div className={styles.block}>
                                            <Title className={styles.blockTitle}>
                                                <FormattedMessage id="p_cart_order_payment_title" />
                                            </Title>
                                            {paymentsMethods.map(item => {
                                                const { id, name } = item;

                                                return (
                                                    <ListItem
                                                        key={id}
                                                        title={name}
                                                        active={values.payment.id === id}
                                                        onClick={() => {
                                                            handleClickListItem({
                                                                type: 'payment',
                                                                data: item,
                                                            });
                                                        }}
                                                        pointer
                                                    />
                                                );
                                            })}
                                        </div>
                                    )}
                            </>
                        )}
                        <div className={styles.orderBlock}>
                            <div className={styles.orderBlockInfo}>
                                <ul className={styles.orderBlockList}>
                                    <li className={styles.orderBlockListItem}>
                                        <span className={styles.orderBlockListKey}>
                                            <FormattedMessage
                                                id="p_cart_order_block_subtotal"
                                                values={{ amount: products.length }}
                                            />
                                        </span>
                                        <span className={styles.orderBlockListValue}>
                                            <FormattedMessage id="currency" values={{ price: totalSum }} />
                                        </span>
                                    </li>
                                    <li className={styles.orderBlockListItem}>
                                        <span className={styles.orderBlockListKey}>
                                            <FormattedMessage id="p_cart_order_block_shipping" />
                                        </span>
                                        <span className={styles.orderBlockListValue}>
                                            {currentDelivery ? (
                                                <FormattedMessage
                                                    id="currency"
                                                    values={{ price: currentDelivery.price }}
                                                />
                                            ) : (
                                                <FormattedMessage id="free" />
                                            )}
                                        </span>
                                    </li>
                                </ul>
                                <div className={styles.orderBlockFooter}>
                                    <div>
                                        <FormattedMessage id="p_cart_order_block_total" />
                                    </div>
                                    <div>
                                        <FormattedMessage id="currency" values={{ price: totalSum }} />
                                    </div>
                                </div>
                            </div>
                            <Button
                                kind="primary"
                                size="large"
                                onClick={() => {
                                    if (isValid()) {
                                        const input = isCourier
                                            ? {
                                                  courier_id: values.delivery.id,
                                                  address_id: values.address.id,
                                              }
                                            : {
                                                  pvz_id: values.pickup.id,
                                              };
                                        createOrder({
                                            variables: {
                                                input: {
                                                    ...input,
                                                    payment_method_id: values.payment.id,
                                                    comment: values.comment,
                                                },
                                            },
                                        });
                                    }
                                }}
                                disabled={disabledOrderButton}
                                bold
                                fullWidth
                            >
                                <FormattedMessage id="p_cart_order_block_action" />
                            </Button>
                        </div>
                    </StepContainer>
                ) : (
                    <StepContainer theme={theme}>
                        <div className={styles.containerSmall}>
                            {loginType === 'login' && (
                                <>
                                    <Title>
                                        <FormattedMessage id="c_login_title" />
                                    </Title>
                                    <LoginForm onCompleted={handleLogInCompleted} />
                                    {/* <Link onClick={() => setLoginType('remind')}>
                                        <FormattedMessage id="forgot_password" />?
                                    </Link> */}
                                    <Hr />
                                    <Link onClick={() => setLoginType('register')}>
                                        <FormattedMessage id="create_account" />
                                    </Link>
                                </>
                            )}
                            {loginType === 'register' && (
                                <>
                                    <Title>
                                        <FormattedMessage id="c_register_title" />!
                                    </Title>
                                    <UserForm type="registration" onCompleted={handleRegisterCompleted} />
                                    <Hr />
                                    <Link onClick={() => setLoginType('login')}>
                                        <FormattedMessage id="i_have_an_account" />
                                    </Link>
                                </>
                            )}
                            {loginType === 'remind' && (
                                <>
                                    <Title>
                                        <FormattedMessage id="remind_password_title" />
                                    </Title>
                                    <div className={styles.subTitle}>
                                        <FormattedMessage id="remind_password_subtitle" />
                                    </div>
                                    <RemindPasswordForm />
                                    <Link onClick={() => setLoginType('login')}>
                                        <FormattedMessage id="remind_password_login_link" />
                                    </Link>
                                </>
                            )}
                        </div>
                    </StepContainer>
                )}
            </StepView>
        </div>
    );
};

Basket.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    basket: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array]))
        .isRequired,
    cities: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.array, PropTypes.string])).isRequired,
};

export default Basket;
