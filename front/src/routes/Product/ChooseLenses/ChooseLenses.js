import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { X as CloseIcon, ArrowLeft } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Title from 'components/Title';
import Link from 'components/Link';
import Button from 'components/Button';
import Loader from 'components/Loader';
import InputGroup from 'components/InputGroup';
import RecipeTable from 'components/RecipeTable';
import Select from 'components/Select';

import Rail from './Rail';

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
const INITIAL_STATE = {
    currentLens: null,
    currentStep: null,
    imageIndex: 0,
    isEdit: false,
    options: [],
    steps: [],
    recipe: [],
    values: [],
};
let firstRender = true;

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
        const filteredTags = lenseitemstags.filter(({ id }) => allIdsOfValues.includes(id));

        return filteredTags.length === values.length;
    });
};

const getOptionsByStep = ({ lenses = [], step, stepPrice }) => {
    const options = lenses.reduce((obj, { lenseitemstags, price }) => {
        const { id, visible, ...rest } = lenseitemstags.find(({ entity }) => entity.name === step) || {};

        if (visible) {
            const currentOption = obj[id];
            const prices = currentOption?.prices || [];

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

const getProgressBarWidth = ({ steps = [], currentStep }) => {
    const stepWidthStyle = 100 / steps.length;
    const stepIndex = steps.indexOf(currentStep);

    return `${stepWidthStyle * stepIndex}%`;
};

const getSteps = ({ lenseitemstags, is_recipe: isRecipe } = {}) => {
    const steps = lenseitemstags.map(({ entity }) => (entity.visible ? entity.name : null)).filter(Boolean);

    return [...steps, isRecipe ? RECIPE_STEP : null, FINAL_STEP].filter(Boolean);
};

const init = lens => {
    const steps = getSteps(lens);

    return {
        ...INITIAL_STATE,
        steps,
        currentStep: steps[0],
    };
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
    const [state, dispatch] = useReducer(
        (prevState, action) => {
            console.log('🔥 reducer:', action.type, 'payload:', action.payload);
            const stepIndex = prevState.steps.indexOf(prevState.currentStep);

            switch (action.type) {
                case 'GET_STEPS': {
                    const { currentLens } = prevState;
                    const { is_recipe: isRecipe } = currentLens;

                    return {
                        ...prevState,
                        isRecipe,
                        recipe: isRecipe ? INITIAL_RECIPE : [],
                        steps: getSteps(currentLens),
                    };
                }
                case 'GET_OPTIONS': {
                    return {
                        ...prevState,
                        options: getOptionsByStep({
                            stepPrice: prevState.values.reduce((acc, { price }) => acc + price, 0),
                            lenses: getLensesByValues({ lenses, values: prevState.values }),
                            step: prevState.currentStep,
                        }),
                    };
                }
                case 'SET_STEP': {
                    return {
                        ...prevState,
                        currentStep: action.payload.step,
                    };
                }
                case 'SET_RECIPE': {
                    const { side, id, value } = action.payload;

                    return {
                        ...prevState,
                        recipe: {
                            ...prevState.recipe,
                            ...(side
                                ? {
                                      [side]: {
                                          ...prevState.recipe[side],
                                          [id]: value,
                                      },
                                  }
                                : {
                                      extraData: {
                                          ...prevState.recipe.extraData,
                                          [id]: value,
                                      },
                                  }),
                        },
                    };
                }
                case 'NEXT_STEP': {
                    const newCurrentStep = prevState.steps[stepIndex + 1];
                    const newImageIndex = (prevState.imageIndex + 1) % images.length;
                    const nextImage = images[newImageIndex];

                    return {
                        ...prevState,
                        imageIndex: nextImage ? newImageIndex : 0,
                        currentStep: newCurrentStep,
                    };
                }
                case 'PREV_STEP': {
                    const prevStepIndex = stepIndex - 1;
                    const newCurrentStep = prevState.steps[prevStepIndex];
                    const newImageIndex = (prevState.imageIndex - 1 + images.length) % images.length;
                    const nextImage = images[newImageIndex];

                    return {
                        ...prevState,
                        isEdit: true,
                        imageIndex: nextImage ? newImageIndex : 0,
                        currentStep: newCurrentStep,
                        ...(newCurrentStep !== FINAL_STEP || newCurrentStep !== RECIPE_STEP
                            ? { values: prevState.values.slice(0, prevState.values.length - 1) }
                            : {}),
                    };
                }
                case 'SET_VALUE': {
                    return {
                        ...prevState,
                        isEdit: false,
                        values: [...prevState.values, { name: prevState.currentStep, ...action.payload }],
                    };
                }
                case 'SET_LENS': {
                    return {
                        ...prevState,
                        currentLens: action.payload,
                    };
                }
                case 'RESET': {
                    return init(lenses[0]);
                }
                default:
                    return prevState;
            }
        },
        lenses[0],
        init
    );
    console.log('state: ', state);
    console.log('CURRENT STEP: ', state.currentStep);

    const [firstStep] = state.steps;
    const isFirstStep = state.currentStep === firstStep;
    const totalPrice = state.values.reduce(
        (acc, { price }) => (price ? acc + parseInt(price, 10) : acc),
        parseInt(itemPrice, 10)
    );
    const progressWidth = getProgressBarWidth({ steps: state.steps, currentStep: state.currentStep });

    useEffect(() => {
        console.log('INIT STATE');
        dispatch({ type: 'GET_OPTIONS' });
    }, []);

    useEffect(() => {
        if (!firstRender) {
            console.log('EFFECT');

            const [selectedLens] = getLensesByValues({ lenses, values: state.values });

            dispatch({ type: 'SET_LENS', payload: selectedLens });
            dispatch({ type: 'GET_STEPS' });

            if (!state.isEdit) dispatch({ type: 'NEXT_STEP' });

            if (state.currentStep !== RECIPE_STEP || state.currentStep !== FINAL_STEP) {
                dispatch({ type: 'GET_OPTIONS' });
            }
        }

        firstRender = false;
    }, [lenses, state.values]);

    useEffect(() => {
        if (!state.isEdit && state.options.length === 1) {
            const [{ id, name, price }] = state.options;

            dispatch({ type: 'SET_VALUE', payload: { id, price, value: name } });
        }
    }, [state.isEdit, state.options]);

    const handleClose = () => {
        onClose();
    };

    const handleSubmitRecipe = () => {
        dispatch({ type: 'SET_STEP', payload: { step: FINAL_STEP } });
    };

    const handleClick = item => {
        dispatch({ type: 'SET_VALUE', payload: item });
    };

    const handleChangeSelect = ({ id, value, side }) => {
        dispatch({ type: 'SET_RECIPE', payload: { id, value, side } });
    };

    const handleReset = () => {
        firstRender = true;
        dispatch({ type: 'RESET' });
        dispatch({ type: 'INIT_STEPS', payload: { lens: lenses[0] } });
        dispatch({ type: 'GET_OPTIONS' });

        console.log('RESET');
    };

    const handlePrevStep = () => {
        dispatch({ type: 'PREV_STEP' });
    };

    const StepView = () => {
        const { recipes } = state?.currentLens || {};

        switch (state.currentStep) {
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
                                <FormattedMessage id="p_product_select_lenses_recipe_title" />
                            </Title>
                        </div>
                        <div className={styles.stepInner}>
                            <InputGroup>
                                <Select
                                    label={pupilDistance.name}
                                    name={pupilDistance.id}
                                    items={pupilDistance.items}
                                    value={state.recipe.extraData[pupilDistance.id]}
                                    onChange={value => {
                                        handleChangeSelect({
                                            value,
                                            id: pupilDistance.id,
                                        });
                                    }}
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
                                                value={state.recipe[side][id]}
                                                onChange={value => {
                                                    handleChangeSelect({
                                                        value,
                                                        id,
                                                        side,
                                                    });
                                                }}
                                            />
                                        </InputGroup>
                                    ))}
                                </div>
                            ))}
                            <div className={styles.stepFooter}>
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
                const recipeList = Object.entries(state.recipe).reduce((obj, [key, value]) => {
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
                            {state.values.map(({ name, id, value, price }) => (
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
                            {state.isRecipe && <RecipeTable recipe={recipeList} />}
                        </div>
                        <div className={styles.reviewActions}>
                            <Button
                                kind="primary"
                                size="large"
                                onClick={() => {
                                    if (!state.currentLens) return;

                                    onAddToCart({
                                        variables: {
                                            input: {
                                                item_id: itemId,
                                                lense: JSON.stringify({
                                                    recipes: state.isRecipe ? state.recipe : {},
                                                    lense: state.currentLens.id,
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
                return (
                    <>
                        <div className={styles.heading}>
                            <Title className={styles.stepTitle}>
                                <FormattedMessage
                                    id="p_product_select_lenses_title"
                                    values={{ step: state.currentStep?.toLowerCase() }}
                                />
                            </Title>
                        </div>
                        <div className={styles.stepInner}>
                            <div>
                                {state.options.map(({ id, name, price, description }) => (
                                    <Rail
                                        key={id}
                                        name={name}
                                        price={
                                            price > 0 ? (
                                                <>
                                                    +{' '}
                                                    <FormattedMessage
                                                        id="currency"
                                                        values={{
                                                            price,
                                                        }}
                                                    />
                                                </>
                                            ) : null
                                        }
                                        description={description}
                                        onClick={() => handleClick({ id, value: name, price })}
                                    />
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

    return (
        <div className={styles.root}>
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
                                    srcSet={`${images[state.imageIndex].middle.webp} 1x, ${
                                        images[state.imageIndex].big.webp
                                    } 2x`}
                                    type="image/webp"
                                />
                                <img
                                    src={images[state.imageIndex].middle.original}
                                    srcSet={`${images[state.imageIndex].big.original} 2x`}
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

ChooseLenses.whyDidYouRender = true;

export default ChooseLenses;
