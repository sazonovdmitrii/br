import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { X as CloseIcon, ArrowLeft } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { createMarkup } from 'utils';

import Title from 'components/Title';
import Link from 'components/Link';
import Button from 'components/Button';
import Loader from 'components/Loader';
import Select from 'components/Select';
import InputGroup from 'components/InputGroup';
import RecipeTable from 'components/RecipeTable';

import styles from './styles.css';

const PUPIL_DISTANCE_ID = 11;
const RECIPE_STEP = 'Recipe';
const FINAL_STEP = 'Review';

const SIDES = ['left', 'right'];
const INITIAL_RECIPE = SIDES.reduce(
    (acc, side) => ({
        ...acc,
        [side]: {
            8: '0',
            9: '0',
        },
    }),
    { extraData: {} }
);

const getRecipeItems = ({ rangeFrom, rangeTo, step }) => {
    const items = [];

    for (let i = rangeFrom; i <= rangeTo; i += step) {
        items.push(i.toString());
    }

    return items;
};

const getLensesByValues = ({ lenses = [], values = [] }) => {
    const allIdsOfValues = values.map(({ id }) => id);
    return lenses.filter(({ lenseitemstags }) => {
        const filteredTags = lenseitemstags.filter(({ id }) => allIdsOfValues.indexOf(id) >= 0);

        return filteredTags.length === values.length;
    });
};

const getOptionsByStep = ({ lenses = [], step, stepPrice }) => {
    const options = lenses.reduce((obj, { lenseitemstags, price }) => {
        const { id, visible, ...rest } = lenseitemstags.find(({ entity }) => entity.name === step) || {};

        if (visible) {
            const currentOption = obj[id];
            const prices = currentOption ? currentOption.prices : [];

            obj[id] = {
                ...rest,
                prices: [...prices, parseInt(price, 10)],
            };
        }

        return obj;
    }, {});
    const optionsWithMinPrice = Object.entries(options)
        .map(([id, { name, prices, description }]) => {
            const minPrice = Math.min(...prices);

            return {
                name,
                description,
                id: parseInt(id, 10),
                price: minPrice - stepPrice,
            };
        })
        .sort((a, b) => a.price - b.price);

    return optionsWithMinPrice;
};

const ChooseLenses = ({
    product: {
        name: productName,
        item: { images, id: itemId, name: itemName, price: itemPrice },
    },
    lenses,
    loadingAddToCart,
    onAddToCart,
    onClose,
}) => {
    const overlayNode = useRef(null);
    const [values, setValues] = useState([]);
    const [recipe, setRecipe] = useState(INITIAL_RECIPE);
    const [imageIndex, setImageIndex] = useState(0);
    // const [prevStep, setPrevStep] = useState(false);

    const selectedLenses = getLensesByValues({ lenses, values });
    const [selectedLens = {}] = selectedLenses;
    const _steps = lenses[0].lenseitemstags
        .map(({ entity }) => (entity.visible ? entity.name : null))
        .filter(Boolean);
    const steps = useMemo(
        () => [..._steps, selectedLens.recipes.length ? RECIPE_STEP : null, FINAL_STEP].filter(Boolean),
        [_steps, selectedLens.recipes.length]
    );
    const [firstStep] = steps;
    const [currentStep, setCurrentStep] = useState(firstStep);
    const isFirstStep = currentStep === firstStep;

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

    const stepIndex = steps.indexOf(currentStep);
    const stepPrice = values.reduce((acc, { price }) => acc + price, 0);

    const handleClose = () => {
        onClose();
    };

    const handleClick = item => {
        const nextStep = steps[stepIndex + 1];
        const newImageIndex = (imageIndex + 1) % images.length;
        const nextImage = images[newImageIndex];

        // setPrevStep(false);
        setImageIndex(nextImage ? newImageIndex : 0);
        setValues(prevState => [...prevState, { name: currentStep, ...item }]);

        setCurrentStep(nextStep);
    };

    const handleSubmitRecipe = () => {
        const nextStep = steps[stepIndex + 1];

        setImageIndex(0);
        setCurrentStep(nextStep);
    };

    const handleChangeSelect = ({ id, value, side }) => {
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            ...(side
                ? {
                      [side]: {
                          ...prevRecipe[side],
                          [id]: value,
                      },
                  }
                : {
                      extraData: {
                          ...prevRecipe.extraData,
                          [id]: value,
                      },
                  }),
        }));
    };

    const handleReset = () => {
        setValues([]);
        setCurrentStep(firstStep);
        setRecipe(INITIAL_RECIPE);
        setImageIndex(0);
        console.log('RESET');
    };

    const handlePrevStep = () => {
        const prevStepIndex = stepIndex - 1;

        if (prevStepIndex >= 0) {
            if (currentStep !== FINAL_STEP) {
                setValues(prevValues => prevValues.slice(0, prevValues.length - 1));
            }

            const newImageIndex = (imageIndex - 1 + images.length) % images.length;
            const nextImage = images[newImageIndex];

            setImageIndex(nextImage ? newImageIndex : 0);
            setCurrentStep(steps[prevStepIndex]);
        }
    };

    const totalPrice = values.reduce(
        (acc, { price }) => (price ? acc + parseInt(price, 10) : acc),
        parseInt(itemPrice, 10)
    );
    const stepWidthStyle = 100 / steps.length;
    const progressWidth = `${stepWidthStyle * stepIndex}%`;

    const StepView = () => {
        const { recipes } = selectedLens;

        switch (currentStep) {
            case RECIPE_STEP: {
                const recipeItems = recipes
                    .map(({ id, name, range_from: rangeFrom, range_to: rangeTo, step }) => {
                        if (id === PUPIL_DISTANCE_ID) return null;

                        const items = getRecipeItems({ rangeFrom, rangeTo, step });

                        return { id, name, items };
                    })
                    .filter(Boolean);
                const getRecipeById = searchId => {
                    const { id, name, range_from: rangeFrom, range_to: rangeTo, step } =
                        recipes.find(item => item.id === searchId) || {};
                    const items = getRecipeItems({ rangeFrom, rangeTo, step });

                    return { id, name, items };
                };
                const pupilDistance = getRecipeById(PUPIL_DISTANCE_ID);

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
                            <InputGroup>
                                <Select
                                    label={pupilDistance.name}
                                    name={pupilDistance.id}
                                    items={pupilDistance.items}
                                    value={recipe.extraData[pupilDistance.id]}
                                    onChange={value =>
                                        handleChangeSelect({
                                            value,
                                            id: pupilDistance.id,
                                        })
                                    }
                                />
                            </InputGroup>
                            {SIDES.map(side => (
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
                                    onClick={handleSubmitRecipe}
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
            case FINAL_STEP: {
                const recipeList = Object.entries(recipe).reduce((obj, [key, value]) => {
                    const newValue = Object.entries(value).map(([id, value]) => {
                        const { name } = recipes.find(item => item.id === parseInt(id, 10)) || {};

                        return { name, id: parseInt(id, 10), value };
                    });

                    if (/left|right/.test(key)) {
                        return {
                            ...obj,
                            sides: {
                                ...obj.sides,
                                [key]: newValue,
                            },
                        };
                    }

                    return {
                        ...obj,
                        [key]: newValue,
                    };
                }, {});

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
                            {values.map(({ name, id, value, price }) => (
                                <div key={id} className={styles.review}>
                                    <div>
                                        <div className={styles.reviewTitle}>{name}</div>
                                        <div className={styles.reviewItem}>{value}</div>
                                    </div>
                                    {price > 0 ? (
                                        <div className={styles.reviewItem}>
                                            +{' '}
                                            <FormattedMessage
                                                id="currency"
                                                values={{
                                                    price,
                                                }}
                                            />
                                        </div>
                                    ) : (
                                        <div className={styles.reviewItem}>
                                            <FormattedMessage id="free" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {recipes.length ? <RecipeTable recipe={recipeList} /> : null}
                        </div>
                        <div className={styles.reviewActions}>
                            <Button
                                kind="primary"
                                size="large"
                                onClick={() => {
                                    if (!selectedLens) return;

                                    onAddToCart({
                                        variables: {
                                            input: {
                                                item_id: itemId,
                                                lense: JSON.stringify({
                                                    recipes: recipes.length ? recipe : {},
                                                    lense: selectedLens.id,
                                                }),
                                            },
                                        },
                                    });
                                }}
                                bold
                                fullWidth
                            >
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
                const currentOptions = getOptionsByStep({
                    stepPrice,
                    lenses: getLensesByValues({ lenses, values }),
                    step: currentStep,
                });

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
                                        onClick={() => handleClick({ id, value: name, price })}
                                    >
                                        <div className={styles.railHead}>
                                            <div className={styles.pill}>{name}</div>
                                            {price > 0 ? (
                                                <p className={styles.railPrice}>
                                                    +{' '}
                                                    <FormattedMessage
                                                        id="currency"
                                                        values={{
                                                            price,
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
                                            <div
                                                className={styles.railDescription}
                                                dangerouslySetInnerHTML={createMarkup(description)}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                            <div className={styles.stepFooter}>
                                {isFirstStep && (
                                    <Button
                                        className={styles.buyWoLenses}
                                        onClick={() => {
                                            onAddToCart({
                                                variables: {
                                                    input: {
                                                        item_id: itemId,
                                                    },
                                                },
                                            });
                                        }}
                                        kind="primary"
                                        bold
                                        fullWidth
                                    >
                                        {loadingAddToCart ? (
                                            <Loader kind="secondary" />
                                        ) : (
                                            <FormattedMessage id="p_product_select_lenses_buy_wo_lenses" />
                                        )}
                                    </Button>
                                )}
                                <div className={styles.subtotal}>
                                    <span>
                                        <FormattedMessage id="p_product_select_lenses_subtotal" />
                                    </span>
                                    <span>
                                        <FormattedMessage
                                            id="currency"
                                            values={{
                                                price: totalPrice,
                                            }}
                                        />
                                    </span>
                                </div>
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
                            <h1 className={styles.title}>{productName}</h1>
                            {!isFirstStep && (
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
                                    srcSet={`${images[imageIndex].middle.webp} 1x, ${images[imageIndex].big.webp} 2x`}
                                    type="image/webp"
                                />
                                <img
                                    src={images[imageIndex].middle.original}
                                    srcSet={`${images[imageIndex].big.original} 2x`}
                                    alt=""
                                />
                            </picture>
                            <div className={styles.frameText}>
                                <Title className={styles.frameTitle}>{productName}</Title>
                                <Title className={styles.colorway}>{itemName}</Title>
                            </div>
                        </div>
                        <div className={styles.panel}>
                            <div className={styles.topNavigation}>
                                <div className={styles.progressBar}>
                                    <div className={styles.progress} style={{ width: progressWidth }} />
                                </div>
                                <div className={styles.navigationContainer}>
                                    {!isFirstStep && (
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
                            <div className={styles.panelOptions}>
                                <StepView />
                            </div>
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
    onAddToCart: () => {},
    loadingAddToCart: false,
};

ChooseLenses.propTypes = {
    product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        item: PropTypes.shape({
            id: PropTypes.number.isRequired,
            images: PropTypes.arrayOf(PropTypes.object),
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        }),
    }).isRequired,
    loadingAddToCart: PropTypes.bool,
    onAddToCart: PropTypes.func,
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
