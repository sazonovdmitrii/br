import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { X as CloseIcon, ArrowLeft } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/react-hooks';

import { metrics } from 'utils';
import { ADD_TO_BASKET } from 'mutations';
import { GET_SHORT_BASKET, GET_BASKET } from 'query';
import { useApp } from 'hooks';

import Title from 'components/Title';
import Link from 'components/Link';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Select from 'components/Select';
import InputGroup from 'components/InputGroup';

import styles from './styles.css';

const _steps = [
    'Prescription Type',
    'Refractive index',
    'Lens type',
    'Covering',
    'Brand',
    'Recipe',
    'Review',
];
const _stepWidth = 100 / _steps.length;
const _sides = ['left', 'right'];
const _initialRecipe = _sides.reduce(
    (acc, side) => ({
        ...acc,
        [side]: {
            8: '0',
            9: '0',
        },
    }),
    {}
);

const getLensesByValues = ({ lenses = [], values = [] }) => {
    const allIdsOfValues = values.map(({ id }) => id);
    const filteredLenses = lenses.filter(({ lenseitemstags }) => {
        const filteredTags = lenseitemstags.filter(({ id }) => allIdsOfValues.indexOf(id) >= 0);

        return filteredTags.length === values.length;
    });

    return filteredLenses;
};

const getOptionsByStep = ({ lenses = [], step }) => {
    const options = [];

    if (step === 'Recipe') {
        // /
    }

    lenses.forEach(({ lenseitemstags }) => {
        const allIdsOptions = options.map(({ id }) => id);

        lenseitemstags.forEach(({ id, name, price, entity }) => {
            if (entity.name === step) {
                if (allIdsOptions.indexOf(id) >= 0) {
                    return;
                }

                options.push({ id, name, price });
            }
        });
    });

    return options;
};

const ChooseLenses = ({ product, lenses, onClose }) => {
    const { createNotification } = useApp();
    const history = useHistory();
    const overlayNode = useRef(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [currentStep, setCurrentStep] = useState(_steps[0]);
    const [values, setValues] = useState([]);
    const [recipe, setRecipe] = useState(_initialRecipe);
    const [addToCart, { loading: loadingAddToCart }] = useMutation(ADD_TO_BASKET, {
        onCompleted({ addBasket: { products } }) {
            if (products) {
                console.log('product added to basket', products);
                metrics('gtm', {
                    event: 'addToCart',
                    data: {
                        currencyCode: 'RUB',
                        add: {
                            products: [
                                {
                                    name: product.name,
                                    id: product.item.id,
                                    price: product.item.price,
                                    variant: product.item.name,
                                    quantity: 1,
                                },
                            ],
                        },
                    },
                });

                history.push('/cart');
            }
        },
        onError({ graphQLErrors: [{ message }] }) {
            createNotification({ type: 'error', message });
        },
        update(
            cache,
            {
                data: { addBasket },
            }
        ) {
            /* <3 apollo */
            [GET_SHORT_BASKET, GET_BASKET].forEach(query => {
                cache.writeQuery({
                    query,
                    data: {
                        basket: {
                            products: addBasket.products,
                            __typename: 'Basket',
                        },
                    },
                });
            });
        },
    });

    if (typeof document === 'undefined') return null;

    const domNode = document.body;

    useEffect(() => {
        if (window.innerWidth !== overlayNode.current.clientWidth) {
            domNode.style.paddingRight = '15px';
        }
        domNode.style.overflow = 'hidden';

        return () => {
            domNode.style = null;
        };
    }, [domNode.style]);

    const currentOptions = getOptionsByStep({
        lenses: getLensesByValues({ lenses, values }),
        step: currentStep,
    });

    const handleClose = () => {
        onClose();
    };

    const handleClick = item => {
        const nextStepIndex = _steps.indexOf(currentStep) + 1;
        const nextStep = _steps[nextStepIndex];

        if (nextStep === 'review') {
            // todo final step
            setImageIndex(0);
        } else {
            const nextImage = product.item.images[imageIndex + 1];

            setImageIndex(nextImage ? imageIndex + 1 : 0);
        }

        setValues(prevState => [...prevState, { step: currentStep, ...item }]);
        setCurrentStep(nextStep);
    };

    const handleChangeSelect = ({ id, value, side }) => {
        setRecipe(prevRecipe => ({ ...prevRecipe, [side]: { ...prevRecipe[side], [id]: value } }));
    };

    const handlePrevStep = () => {
        const prevStepIndex = _steps.indexOf(currentStep) - 1;

        if (prevStepIndex >= 0) {
            setValues(prevState => prevState.slice(0, prevState.length - 1));
            setCurrentStep(_steps[prevStepIndex]);
        }
    };

    const handleReset = () => {
        setValues([]);
        setCurrentStep(_steps[0]);
        setRecipe({ left: {}, right: {} });
        setImageIndex(0);
    };

    const [choosenLenses = {}] = getLensesByValues({ lenses, values });

    const handleAddToCart = () => {
        if (choosenLenses.id) {
            addToCart({
                variables: {
                    input: {
                        item_id: product.item.id,
                        lenses: JSON.stringify({
                            recipes: recipe,
                            lenses: choosenLenses.id,
                        }),
                    },
                },
            });
        }
    };

    const totalPrice = values.reduce(
        (acc, { price }) => (price ? acc + parseInt(price, 10) : acc),
        parseInt(product.item.price, 10) + parseInt(choosenLenses.price, 10)
    );
    const firstStep = currentStep === _steps[0];
    const stepIndex = _steps.indexOf(currentStep);
    const progressWidth = `${_stepWidth * stepIndex}%`;

    const stepView = () => {
        switch (currentStep) {
            case 'Recipe': {
                const { recipes } = choosenLenses;
                const recipeItems = recipes.map(
                    ({ id, name, range_from: rangeFrom, range_to: rangeTo, step }) => {
                        const items = [];

                        for (let i = rangeFrom; i <= rangeTo; i += step) {
                            items.push(i.toString());
                        }

                        return { id, name, items };
                    }
                );

                return (
                    <>
                        <div className={styles.heading}>
                            <Title className={styles.stepTitle}>
                                <FormattedMessage
                                    id="p_product_select_lenses_title"
                                    values={{ step: currentStep.toLowerCase() }}
                                />
                            </Title>
                        </div>
                        <div className={styles.stepInner}>
                            {_sides.map(side => (
                                <div key={side}>
                                    <Title className={styles.recipeTitle}>
                                        <FormattedMessage id={`p_product_select_lenses_${side}`} />
                                    </Title>
                                    {recipeItems.map(({ id, name, items }) => (
                                        <InputGroup key={id}>
                                            <Select
                                                label={name}
                                                name={id}
                                                items={items}
                                                value={recipe[side][id]}
                                                defaultValue={id === 8 || id === 9 ? '0' : null}
                                                onChange={value => handleChangeSelect({ id, value, side })}
                                            />
                                        </InputGroup>
                                    ))}
                                </div>
                            ))}
                            <div className={styles.reviewActions}>
                                <Button
                                    kind="primary"
                                    size="large"
                                    onClick={() => {
                                        const nextStepIndex = _steps.indexOf(currentStep) + 1;
                                        const nextStep = _steps[nextStepIndex];

                                        setCurrentStep(nextStep);
                                    }}
                                    bold
                                    fullWidth
                                >
                                    <FormattedMessage id="p_product_select_lenses_next_button" />
                                </Button>
                            </div>
                        </div>
                    </>
                );
            }
            case 'Review': {
                return (
                    <>
                        <div className={styles.heading}>
                            <Title className={styles.stepTitle}>
                                <FormattedMessage id="p_product_select_lenses_review_title" />
                            </Title>
                        </div>
                        <div className={styles.stepSubtitle}>
                            <FormattedMessage id="p_product_select_lenses_review_text" />
                        </div>
                        <div className={styles.reviewsWrapper}>
                            {values.map(({ step, id, name, price }) => (
                                <div key={id} className={styles.review}>
                                    <div>
                                        <div className={styles.reviewTitle}>{step}</div>
                                        <div className={styles.reviewItem}>{name}</div>
                                    </div>
                                    {price && (
                                        <div className={styles.reviewItem}>
                                            <FormattedMessage
                                                id="currency"
                                                values={{ price: parseInt(price, 10) }}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className={styles.reviewActions}>
                            <Button kind="primary" size="large" onClick={handleAddToCart} bold fullWidth>
                                {loadingAddToCart ? (
                                    <Loader kind="secondary" />
                                ) : (
                                    <>
                                        <FormattedMessage id="p_product_add_to_cart" />:{' '}
                                        <FormattedMessage id="currency" values={{ price: totalPrice }} />
                                    </>
                                )}
                            </Button>
                            <Link className={styles.resetButton} onClick={handleReset}>
                                <FormattedMessage id="p_product_select_lenses_edit_button" />
                            </Link>
                        </div>
                    </>
                );
            }
            default: {
                return (
                    <>
                        <div className={styles.heading}>
                            <Title className={styles.stepTitle}>
                                <FormattedMessage
                                    id="p_product_select_lenses_title"
                                    values={{ step: currentStep.toLowerCase() }}
                                />
                            </Title>
                        </div>
                        <div className={styles.stepInner}>
                            <div>
                                {currentOptions.map(({ id, name, price, description }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        className={styles.rail}
                                        onClick={() => handleClick({ id, name, price })}
                                    >
                                        <div className={styles.railHead}>
                                            <div className={styles.pill}>{name}</div>
                                            {parseInt(price, 10) > 0 ? (
                                                <p className={styles.railPrice}>
                                                    <FormattedMessage
                                                        id="currency"
                                                        values={{
                                                            price: parseInt(price, 10),
                                                        }}
                                                    />
                                                </p>
                                            ) : (
                                                <p className={styles.railPrice}>
                                                    <FormattedMessage id="free" />
                                                </p>
                                            )}
                                        </div>
                                        {description && (
                                            <div className={styles.railDescription}>{description}</div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className={styles.subtotal}>
                                <span>
                                    <FormattedMessage id="p_product_select_lenses_subtotal" />
                                </span>
                                <span>
                                    <FormattedMessage
                                        id="currency"
                                        values={{
                                            price: parseInt(totalPrice, 10),
                                        }}
                                    />
                                </span>
                            </div>
                        </div>
                    </>
                );
            }
        }
    };

    const view = (
        <div className={styles.root} ref={overlayNode}>
            <div className={styles.inner}>
                <div className={styles.content}>
                    <div className={styles.navigationMobile}>
                        <div className={styles.progressBar}>
                            <div className={styles.progress} style={{ width: progressWidth }} />
                        </div>
                        <div className={styles.navigationContainer}>
                            <h1 className={styles.title}>{product.name}</h1>
                            {!firstStep && (
                                <button type="button" className={styles.backButton} onClick={handlePrevStep}>
                                    <ArrowLeft className={styles.backIcon} />
                                </button>
                            )}
                            <button type="button" className={styles.closeButton} onClick={handleClose}>
                                <CloseIcon className={styles.closeIcon} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.stepsContainer}>
                        <div className={styles.frameDisplay}>
                            <picture>
                                <source
                                    srcSet={`${product.item.images[imageIndex].middle.webp} 1x, ${product.item.images[imageIndex].big.webp} 2x`}
                                    type="image/webp"
                                />
                                <img
                                    src={product.item.images[imageIndex].middle.original}
                                    srcSet={`${product.item.images[imageIndex].big.original} 2x`}
                                    alt=""
                                />
                            </picture>
                            <div className={styles.frameText}>
                                <Title className={styles.frameTitle}>{product.name}</Title>
                                <Title className={styles.colorway}>{product.item.name}</Title>
                            </div>
                        </div>
                        <div className={styles.panel}>
                            <div className={styles.topNavigation}>
                                <div className={styles.progressBar}>
                                    <div className={styles.progress} style={{ width: progressWidth }} />
                                </div>
                                <div className={styles.navigationContainer}>
                                    {!firstStep && (
                                        <button
                                            type="button"
                                            className={styles.backButton}
                                            onClick={handlePrevStep}
                                        >
                                            <ArrowLeft className={styles.backIcon} />
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className={styles.closeButton}
                                        onClick={handleClose}
                                    >
                                        <CloseIcon className={styles.closeIcon} />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.panelOptions}>{stepView()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    if (domNode) return createPortal(view, domNode);

    return null;
};

ChooseLenses.defaultProps = {
    onClose: () => {},
};

ChooseLenses.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        images: PropTypes.arrayOf(PropTypes.object),
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    onClose: PropTypes.func,
    lenses: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            lenseitemstags: PropTypes.arrayOf(PropTypes.object).isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default ChooseLenses;
