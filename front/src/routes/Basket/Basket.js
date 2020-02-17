import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames/bind';

import { useApp, useLang } from 'hooks';
import { GET_SHORT_BASKET } from 'query';
import { REMOVE_PRODUCT_MUTATION, CREATE_ORDER_MUTATION, APPLY_COUPON_MUTATION } from 'mutations';
import { isNumber, metrics, formatDate } from 'utils';

import Button from 'components/Button';
import { StepView, StepContainer } from 'components/Steps';
import AddressList from 'components/AddressList/AddressList';
import Loader from 'components/Loader';
import ListItem from 'components/ListItem';
import BasketProduct from 'components/BasketProduct';
import Title from 'components/Title';
import Autocomplete from 'components/Autocomplete';
import InputGroup from 'components/InputGroup';
import Input from 'components/Input';
import { Dialog, DialogContent } from 'components/Dialog';
// TODO REMOVE
import Order from 'routes/Order/Order';

// import Success from 'routes/Success';

import api from './api';
import Empty from './Empty';
import Sidebar from './Sidebar';
import Login from './Login';
import Pickups from './Pickups';
import Stores from './Stores';
import styles from './styles.css';

const cx = classnames.bind(styles);

let seoProducts = [];

const ERORRS = {
    city: 'Не указан город доставки',
    address: 'Не указан адрес',
    payment: 'Не указан способ оплаты',
    pvz: 'Не указан пункт выдачи',
    deliveryMethod: 'Не указан способ получения',
    stores: 'Не указан магазин',
};

const theme = {
    root: styles.container,
    title: styles.title,
    header: styles.header,
};

const getLocalCity = () => {
    let localCity = {};

    try {
        localCity = JSON.parse(localStorage.getItem('city')) || {};
    } catch (e) {
        console.error(e);
    }

    return localCity;
};

const Basket = ({ basket: { products: productsProps, coupon: couponProp }, addresses, isLoggedIn }) => {
    const locale = useLang();
    const { createNotification } = useApp();
    const [products, setProducts] = useState(productsProps);
    const [orderId, setOrderId] = useState(false);
    const [coupon, setCoupon] = useState({ value: couponProp, active: !!couponProp });

    const initialDeliveryMethods = { loading: true, called: false, data: [] };
    const [
        { loading: loadingDeliveryMethods, called: calledDeliveryMethods, data: deliveryMethods },
        setDeliveryMethods,
    ] = useState(initialDeliveryMethods);

    const initialPickups = { loading: true, called: false, data: [] };
    const [{ loading: loadingPickups, called: calledPickups, data: pickups }, setPickups] = useState(
        initialPickups
    );
    const [allPaymentsMethods, setAllPaymentsMethods] = useState({});
    const [paymentsMethods, setPaymentsMethods] = useState([]);
    const [step, setStep] = useState(0);

    const initialValues = {
        deliveryMethod: {},
        city: {
            name: '',
        },
        payment: {},
        pvz: null,
        stores: null,
        comment: '',
        address: addresses && addresses.length ? addresses[0] : null,
    };
    const [values, setValues] = useState({
        ...initialValues,
        city: getLocalCity(),
    });

    const isPickup = values.deliveryMethod.id === 'pvz';
    const isStore = values.deliveryMethod.id === 'stores';
    const isCourier = values.deliveryMethod.payment_methods;
    const currentDelivery = isCourier ? values.deliveryMethod : values[values.deliveryMethod.type];
    const isCouponApplied = coupon.active;

    const totalSum = products.reduce(
        (acc, { price, coupon_price: couponPrice, lenses }) =>
            acc + parseInt(price, 10) + (lenses.lenses ? parseInt(lenses.lenses.price, 10) : 0),
        0
    );
    const totalSumWithCoupon = products.reduce(
        (acc, { price, coupon_price: couponPrice, lenses }) =>
            acc + parseInt(couponPrice, 10) + (lenses.lenses ? parseInt(lenses.lenses.price, 10) : 0),
        0
    );
    const totalSumWithDelivery =
        parseInt(isCouponApplied ? totalSumWithCoupon : totalSum, 10) +
        (currentDelivery ? parseInt(currentDelivery.price, 10) : 0);

    const isValid = () => {
        const fields = isCourier ? ['address'] : [values.deliveryMethod.type];
        const requiredFields = ['city', 'deliveryMethod', ...fields, 'payment'];

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

            createNotification({
                type: 'error',
                message: ERORRS[name],
            });
        }

        return !valid.length;
    };

    //* MUTATIONS
    const [handleRemoveProduct] = useMutation(REMOVE_PRODUCT_MUTATION, {
        onCompleted: ({ removeBasket }) => {
            const ids = removeBasket.products.map(({ item: { id } }) => id);

            metrics('gtm', {
                event: 'removeFromCart',
                data: {
                    remove: {
                        products: seoProducts
                            .filter(({ item: { id } }) => ids.indexOf(id) === -1)
                            .map(({ name, item, price, qty }) => ({
                                price,
                                name, // Name or ID is required.
                                id: item.id,
                                variant: item.name,
                                quantity: qty,
                            })),
                    },
                },
            });
            setProducts(removeBasket.products);
        },
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

    const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
        onCompleted({ order: { id } }) {
            if (id) {
                metrics('gtm', {
                    event: 'transaction',
                    data: {
                        purchase: {
                            actionField: {
                                id, // Transaction ID. Required
                                affiliation: 'Online Store',
                                revenue: totalSumWithDelivery, // Total transaction value (incl. tax and shipping)
                                shipping: currentDelivery.price,
                            },
                            products: products.map(
                                ({ name, item, price, coupon_price: couponPrice, qty }) => ({
                                    price: isCouponApplied ? couponPrice : price,
                                    name, // Name or ID is required.
                                    id: item.id,
                                    variant: item.name,
                                    quantity: qty,
                                })
                            ),
                        },
                    },
                });

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
            createNotification({
                type: 'error',
                message,
            });
        },
    });
    const [applyCoupon] = useMutation(APPLY_COUPON_MUTATION, {
        variables: {
            input: { coupon: coupon.value },
        },
        onCompleted: ({ applyCoupon: data }) => {
            setCoupon(prevCoupon => ({ ...prevCoupon, active: true }));
            setProducts(data.products);
        },
        onError({ graphQLErrors: [{ message }] }) {
            createNotification({
                type: 'error',
                message,
            });
        },
    });
    //* MUTATIONS

    /* EFFECTS */
    useEffect(() => {
        api.getPaymentsMethods({ locale }).then(({ list }) => {
            setAllPaymentsMethods(list);
        });
    }, [locale]);

    useEffect(() => {
        if (!currentDelivery) {
            setPaymentsMethods([]);
            return;
        }

        const { payment_methods } = currentDelivery;

        console.log('find payment_methods', allPaymentsMethods, payment_methods);

        if (payment_methods) {
            const newPaymentsMethods = payment_methods.map(id => ({ id, title: allPaymentsMethods[id] }));

            console.log('new payments', newPaymentsMethods);
            setPaymentsMethods(newPaymentsMethods);
        }
    }, [values.deliveryMethod, currentDelivery, allPaymentsMethods]);
    useEffect(() => {
        seoProducts = products;
    }, [products]);

    useEffect(() => {
        window.scrollTo(0, 0);
        const footerNode = document.querySelector('#footer');

        if (step === 1) {
            footerNode.style.display = 'none';
        }

        return () => {
            footerNode.style.display = 'block';
        };
    }, [step]);

    useEffect(() => {
        const { regionFias, cityFias } = values.city;

        if (!regionFias && !cityFias) return;

        setDeliveryMethods(prevDeliveryMethods => ({
            ...prevDeliveryMethods,
            called: true,
            loading: true,
        }));

        api.getDeliveryMethods({ regionFias, cityFias, locale }).then(({ list }) => {
            setDeliveryMethods(prevDeliveryMethods => ({
                ...prevDeliveryMethods,
                loading: false,
                data: Object.entries(list).reduce(
                    (array, [type, value]) => [
                        ...array,
                        ...value.map(item => ({
                            ...item,
                            type,
                            id: item.id || type,
                        })),
                    ],
                    []
                ),
            }));
        });
    }, [locale, values.city]);

    useEffect(() => {
        const { regionFias, cityFias } = values.city;

        if (!regionFias && !cityFias) return;

        if (isPickup || isStore) {
            const request = isPickup ? api.getPickups : api.getStores;
            setPickups(prevPickups => ({ ...prevPickups, called: true, loading: true }));

            request({ regionFias, cityFias, locale }).then(
                ({ list: { points, stores } }, data = points || stores) => {
                    setPickups(prevPickups => ({ ...prevPickups, loading: false, data }));
                }
            );
        }
    }, [isPickup, isStore, locale, values.city, values.city.id]);

    useEffect(() => {
        if (
            !currentDelivery &&
            (values.deliveryMethod.type === 'pvz' || values.deliveryMethod.type === 'stores')
        ) {
            setOpenDialog(true);
        }
    }, [currentDelivery, values.deliveryMethod.type]);

    /* EFFECTS  */

    const handleChangeStep = index => {
        // if (notification && notification.errorType === 'lowPrice') return;

        setStep(index);
        metrics('gtm', {
            event: 'checkout',
            data: {
                checkout: {
                    actionField: {
                        step: 1,
                    },
                    products: products.map(({ name, item, price, qty }) => ({
                        price,
                        name,
                        id: item.id,
                        variant: item.name,
                        quantity: qty,
                    })),
                },
            },
        });
    };
    const handleSubmitAddress = data => {
        if (data.id) {
            setValues(prevState => ({
                ...prevState,
                address: data,
            }));
        }
    };
    const handleChangeAddress = data => {
        setValues(prevState => ({ ...prevState, address: data }));
    };

    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleClickListItem = ({ data, type }) => {
        setValues(prevState => ({
            ...prevState,
            [type]: data,
        }));
    };
    const handeChangeAutocomplite = (event, value) => {
        setValues(prevValues => ({ ...prevValues, city: { name: value } }));
    };
    const handleSelectAutocomplite = ({ value, id, region_fias_id: regionFias, city_fias_id: cityFias }) => {
        const newCity = { id, name: value, regionFias, cityFias };

        localStorage.setItem('city', JSON.stringify(newCity));
        setValues(prevValues => ({ ...prevValues, city: newCity }));
    };
    const handleResetAutocomplite = () => {
        setValues(initialValues);
        setDeliveryMethods(initialDeliveryMethods);
        setPickups(initialPickups);
        setPaymentsMethods([]);
    };

    if (orderId) {
        return (
            <Order
                id={orderId}
                products={products}
                address={values.address}
                delivery={values.deliveryMethod}
                pickup={currentDelivery}
                payment={values.payment}
            />
        );
    }

    if (!products.length) {
        return <Empty />;
    }

    const rootClassName = cx(styles.root, {
        grey: step === 0,
    });

    return (
        <div className={rootClassName}>
            {!calledPickups || loadingPickups
                ? null
                : openDialog && (
                      <Dialog
                          open={openDialog}
                          onClose={handleCloseDialog}
                          classNames={{ inner: styles.dialogInner }}
                          title={
                              <FormattedMessage
                                  id={isPickup ? 'p_cart_pickups_title' : 'p_cart_stores_title'}
                              />
                          }
                          maxWidth="lg"
                          closeOnClickOutside={false}
                          fullWidth
                      >
                          <DialogContent className={styles.dialogContent}>
                              {isPickup ? (
                                  <Pickups
                                      items={pickups}
                                      value={currentDelivery}
                                      onChange={value => {
                                          handleClickListItem({
                                              type: 'pvz',
                                              data: value,
                                          });
                                          handleCloseDialog();
                                      }}
                                  />
                              ) : (
                                  <Stores
                                      items={pickups}
                                      value={currentDelivery}
                                      onChange={value => {
                                          handleClickListItem({
                                              type: 'stores',
                                              data: value,
                                          });
                                          handleCloseDialog();
                                      }}
                                  />
                              )}
                          </DialogContent>
                      </Dialog>
                  )}
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
                        {products.map(
                            ({
                                name,
                                item,
                                lenses: { lenses, recipes } = {},
                                price,
                                coupon_price: couponPrice,
                                url,
                            }) => (
                                <BasketProduct
                                    key={item.id}
                                    images={item.images[0]}
                                    name={name}
                                    recipes={recipes}
                                    options={lenses ? lenses.options : []}
                                    subName={item.name}
                                    oldPrice={
                                        isCouponApplied && (
                                            <FormattedMessage
                                                id="currency"
                                                values={{
                                                    price:
                                                        parseInt(price, 10) +
                                                        (lenses ? parseInt(lenses.price, 10) : 0),
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
                                                    (lenses ? parseInt(lenses.price, 10) : 0),
                                            }}
                                        />
                                    }
                                    url={url}
                                    onRemove={() => {
                                        handleRemoveProduct({
                                            variables: { input: { item_id: item.id } },
                                        });
                                    }}
                                />
                            )
                        )}
                    </div>
                    <Sidebar
                        className={styles.sidebar}
                        messages={['p_cart_sidebar_message']}
                        pricing={[
                            { name: 'p_cart_sidebar_total', value: totalSum },
                            isCouponApplied && {
                                name: 'p_cart_sidebar_total_with_coupon',
                                value: totalSumWithCoupon,
                            },
                        ].filter(Boolean)}
                        coupon={
                            <>
                                <Input
                                    name="coupon"
                                    label={<FormattedMessage id="p_cart_coupon_label" />}
                                    value={coupon.value}
                                    onChange={({ target: { value } }) => {
                                        setCoupon(prevCoupon => ({ ...prevCoupon, value }));
                                    }}
                                    disabled={coupon.active}
                                />
                                {!coupon.active && (
                                    <Button kind="primary" size="large" onClick={applyCoupon} bold>
                                        <FormattedMessage id="p_cart_coupon_submit" />
                                    </Button>
                                )}
                            </>
                        }
                        actions={
                            <Button
                                kind="primary"
                                size="large"
                                onClick={() => step === 0 && handleChangeStep(step + 1)}
                                bold
                                fullWidth
                            >
                                <FormattedMessage id="p_cart_sidebar_goto_checkout" />
                            </Button>
                        }
                    />
                </StepContainer>
                {isLoggedIn ? (
                    <StepContainer title="Оформление заказа" theme={theme}>
                        <div className={styles.block}>
                            <Autocomplete
                                label="Город*"
                                value={values.city.name}
                                onInputChange={handeChangeAutocomplite}
                                onSelectValue={handleSelectAutocomplite}
                                onResetValue={handleResetAutocomplite}
                            />
                        </div>
                        {!calledDeliveryMethods ? null : loadingDeliveryMethods ? (
                            <Loader />
                        ) : (
                            <div className={styles.block}>
                                <Title className={styles.blockTitle}>
                                    <FormattedMessage id="p_cart_receiving_title" />
                                </Title>
                                {deliveryMethods.map(item => {
                                    return (
                                        <ListItem
                                            key={item.id}
                                            title={item.service}
                                            active={values.deliveryMethod.id === item.id}
                                            onClick={() => {
                                                handleClickListItem({
                                                    type: 'deliveryMethod',
                                                    data: item,
                                                });
                                            }}
                                            actions={
                                                item.prices ? (
                                                    <b>
                                                        <FormattedMessage
                                                            id={
                                                                item.prices.min_price && item.prices.min_price
                                                                    ? 'currency'
                                                                    : 'free'
                                                            }
                                                            values={{
                                                                price: `${item.prices.min_price}${item.prices
                                                                    .max_price &&
                                                                    `-${item.prices.max_price}`}`,
                                                            }}
                                                        />
                                                    </b>
                                                ) : (
                                                    <b>
                                                        <FormattedMessage
                                                            id={
                                                                parseInt(item.price, 10) === 0
                                                                    ? 'free'
                                                                    : 'currency'
                                                            }
                                                            values={{ price: parseInt(item.price, 10) }}
                                                        />
                                                    </b>
                                                )
                                            }
                                            pointer
                                        />
                                    );
                                })}
                            </div>
                        )}
                        {isCourier ? (
                            <div className={styles.block}>
                                <AddressList
                                    items={addresses}
                                    onChange={handleChangeAddress}
                                    onSubmit={handleSubmitAddress}
                                    value={values.address ? values.address.id : null}
                                />
                            </div>
                        ) : (
                            currentDelivery && (
                                <div className={styles.block}>
                                    <Title className={styles.blockTitle}>
                                        <FormattedMessage id="p_cart_current_delivery_title" />
                                    </Title>
                                    <ListItem
                                        title={currentDelivery.service}
                                        description={currentDelivery.address}
                                        meta={
                                            <>
                                                <FormattedMessage id="p_cart_pickup_delivery_days" />:{' '}
                                                {formatDate({
                                                    locale,
                                                    day: currentDelivery.days,
                                                    format: 'D MMMM YYYY',
                                                })}
                                            </>
                                        }
                                        actions={
                                            <Button
                                                kind="primary"
                                                onClick={() => {
                                                    setOpenDialog(true);
                                                    // setValues(prevValues => ({
                                                    //     ...prevValues,
                                                    //     [prevValues.deliveryMethod.type]: null,
                                                    // }));
                                                    // setPaymentsMethods([]);
                                                }}
                                                bold
                                            >
                                                <FormattedMessage id="p_cart_current_delivery_edit" />
                                            </Button>
                                        }
                                    />
                                </div>
                            )
                        )}
                        {paymentsMethods && paymentsMethods.length ? (
                            <>
                                <div className={styles.block}>
                                    <Title className={styles.blockTitle}>
                                        <FormattedMessage id="p_cart_payment_title" />
                                    </Title>
                                    {paymentsMethods.map(item => {
                                        const { id, title } = item;

                                        return (
                                            <ListItem
                                                key={id}
                                                title={title}
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
                                <div className={styles.block}>
                                    <Title className={styles.blockTitle}>
                                        <FormattedMessage id="p_cart_comment_title" />
                                    </Title>
                                    <InputGroup>
                                        <Input
                                            name="comment"
                                            value={values.comment}
                                            onChange={({ target: { value } }) =>
                                                setValues(prevValues => ({ ...prevValues, comment: value }))
                                            }
                                            multiline
                                        />
                                    </InputGroup>
                                </div>
                            </>
                        ) : null}
                        <div className={styles.orderBlock}>
                            <div className={styles.orderBlockInfo}>
                                <ul className={styles.orderBlockList}>
                                    <li className={styles.orderBlockListItem}>
                                        <span className={styles.orderBlockListKey}>
                                            <FormattedMessage
                                                id="p_cart_block_subtotal"
                                                values={{ amount: products.length }}
                                            />
                                        </span>
                                        <span className={styles.orderBlockListValue}>
                                            <FormattedMessage id="currency" values={{ price: totalSum }} />
                                        </span>
                                    </li>
                                    {isCouponApplied && (
                                        <li className={styles.orderBlockListItem}>
                                            <span className={styles.orderBlockListKey}>
                                                <FormattedMessage id="p_cart_block_subtotal_with_coupon" />
                                            </span>
                                            <span className={styles.orderBlockListValue}>
                                                <FormattedMessage
                                                    id={totalSumWithCoupon ? 'currency' : 'free'}
                                                    values={{ price: totalSumWithCoupon }}
                                                />
                                            </span>
                                        </li>
                                    )}
                                    <li className={styles.orderBlockListItem}>
                                        <span className={styles.orderBlockListKey}>
                                            <FormattedMessage id="p_cart_block_shipping" />
                                        </span>
                                        <span className={styles.orderBlockListValue}>
                                            {currentDelivery && currentDelivery.price ? (
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
                                        <FormattedMessage id="p_cart_block_total" />
                                    </div>
                                    <div>
                                        <FormattedMessage
                                            id={totalSumWithDelivery ? 'currency' : 'free'}
                                            values={{ price: totalSumWithDelivery }}
                                        />
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
                                                  courier_id: values.deliveryMethod.id,
                                                  address_id: values.address.id,
                                              }
                                            : {
                                                  pickup_code: currentDelivery.id,
                                              };
                                        createOrder({
                                            variables: {
                                                input: {
                                                    ...input,
                                                    payment_method_code: values.payment.id,
                                                    comment: values.comment,
                                                },
                                            },
                                        });
                                    }
                                }}
                                bold
                                fullWidth
                            >
                                <FormattedMessage id="p_cart_checkout_button" />
                            </Button>
                        </div>
                    </StepContainer>
                ) : (
                    <StepContainer theme={theme}>
                        <Login />
                    </StepContainer>
                )}
            </StepView>
        </div>
    );
};

Basket.defaultProps = {
    basket: {
        products: [],
    },
    addresses: [],
};

Basket.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    basket: PropTypes.shape({
        products: PropTypes.arrayOf(
            PropTypes.shape({
                item: PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    images: PropTypes.arrayOf(PropTypes.object),
                    name: PropTypes.string,
                }),
                price: PropTypes.string,
            })
        ),
    }),
    addresses: PropTypes.arrayOf(PropTypes.string),
};

export default Basket;
