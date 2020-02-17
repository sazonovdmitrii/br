import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { X as RemoveIcon, ChevronDown as ChevronDownIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import RecipeTable from 'components/RecipeTable';

import styles from './styles.css';

const cx = classnames.bind(styles);

const BasketProduct = ({ url, name, subName, images, oldPrice, price, options, recipes, onRemove }) => {
    const [expanded, setExpanded] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const rootClassName = cx(styles.root);
    const expansionContainerClassName = cx(styles.expansionContainer, { expanded });
    const expansionIconClassName = cx(styles.expansionIcon, { expanded });
    const removeConfirmClassName = cx(styles.removeConfirm, { show: showConfirm });

    return (
        <div className={rootClassName}>
            {onRemove && (
                <button type="button" className={styles.removeButton} onClick={() => setShowConfirm(true)}>
                    <RemoveIcon size="10" />
                </button>
            )}
            <div className={styles.imageContainer}>
                <Link to={url}>
                    <picture>
                        <source
                            srcSet={`${images.basket.webp} 1x, ${images.middle.webp} 2x`}
                            type="image/webp"
                        />
                        <img
                            className={styles.image}
                            src={images.basket.original}
                            srcSet={`${images.middle.original} 2x`}
                            alt=""
                        />
                    </picture>
                </Link>
                {recipes && (
                    <div className={styles.recipe}>
                        <RecipeTable recipe={recipes} />
                    </div>
                )}
            </div>
            <div className={styles.info}>
                <h4 className={styles.name}>
                    <Link className={styles.link} to={url}>
                        {name}
                    </Link>
                </h4>
                <div className={styles.footer}>
                    <p className={styles.subhead}>{subName}</p>
                    {options.length ? (
                        <div className={expansionContainerClassName}>
                            <div className={styles.frameDetails}>
                                {options.map(({ name, value, price }) => (
                                    <Fragment key={name}>
                                        <h5 className={styles.frameDetailsLabel}>{name}</h5>
                                        <p className={styles.frameDetailsValue}>
                                            {value} <span className={styles.frameDetailsPrice}>{price}</span>
                                        </p>
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    ) : null}
                    <div className={styles.footerRight}>
                        {options.length ? (
                            <button
                                type="button"
                                className={styles.expansionButton}
                                onClick={() => setExpanded(!expanded)}
                            >
                                <span className={expansionIconClassName}>
                                    <ChevronDownIcon size="20" />
                                </span>
                                <p className={styles.prices}>
                                    <p className={styles.oldPrice}>{oldPrice}</p>
                                    <p className={styles.totalPrice}>{price}</p>
                                </p>
                            </button>
                        ) : (
                            <p className={styles.prices}>
                                <p className={styles.oldPrice}>{oldPrice}</p>
                                <p className={styles.totalPrice}>{price}</p>
                            </p>
                        )}
                    </div>
                </div>
                {onRemove && (
                    <div className={removeConfirmClassName}>
                        <div className={styles.removeConfirmInner}>
                            <p className={styles.removeConfimTitle}>
                                <FormattedMessage id="remove_from_cart" />?
                            </p>
                            <div className={styles.removeConfirmActions}>
                                <Button kind="primary" size="small" onClick={onRemove} bold rounded>
                                    <FormattedMessage id="yes" />
                                </Button>
                                <Button
                                    kind="secondary"
                                    size="small"
                                    onClick={() => setShowConfirm(false)}
                                    bold
                                    rounded
                                >
                                    <FormattedMessage id="no" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

BasketProduct.defaultProps = {
    name: 'Без названия',
    price: null,
    subName: null,
    options: [],
    onRemove: null,
    url: null,
    images: {},
    recipes: null,
};

BasketProduct.propTypes = {
    recipes: PropTypes.objectOf(PropTypes.array),
    images: PropTypes.objectOf(PropTypes.string),
    url: PropTypes.string,
    subName: PropTypes.string,
    onRemove: PropTypes.func,
    name: PropTypes.string,
    price: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
};

export default BasketProduct;
