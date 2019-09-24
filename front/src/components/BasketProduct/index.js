import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { X as RemoveIcon, ChevronDown as ChevronDownIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';

import styles from './styles.css';

const cx = classnames.bind(styles);

const BasketProduct = ({ url, name, subName, image, item_id, price, onRemove }) => {
    const [expanded, setExpanded] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const rootClassName = cx(styles.root);
    const expansionContainerClassName = cx(styles.expansionContainer, { expanded });
    const expansionIconClassName = cx(styles.expansionIcon, { expanded });
    const removeConfirmClassName = cx(styles.removeConfirm, { show: showConfirm });

    return (
        <div className={rootClassName}>
            <button type="button" className={styles.removeButton} onClick={() => setShowConfirm(true)}>
                <RemoveIcon size="20" />
            </button>
            <div className={styles.imageContainer}>
                <Link to={url}>
                    <img className={styles.image} src={image} alt="" />
                </Link>
            </div>
            <div className={styles.info}>
                <h4 className={styles.name}>
                    <Link className={styles.link} to={url}>
                        {name}
                    </Link>
                </h4>
                <div className={styles.footer}>
                    <p className={styles.subhead}>{subName}</p>
                    <div className={expansionContainerClassName}>
                        <div className={styles.frameDetails}>
                            <h5 className={styles.frameDetailsLabel}>Prescription type</h5>
                            <p className={styles.frameDetailsValue}>
                                Single-vision <span className={styles.frameDetailsPrice}>$ 95</span>
                            </p>
                            <h5 className={styles.frameDetailsLabel}>Lens type</h5>
                            <p className={styles.frameDetailsValue}>
                                Light-responsive<span className={styles.frameDetailsPrice}>$ 100</span>
                            </p>
                            <h5 className={styles.frameDetailsLabel}>Lens material</h5>
                            <p className={styles.frameDetailsValue}>
                                1.67 high-index<span className={styles.frameDetailsPrice}>$ 30</span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.footerRight}>
                        <button
                            type="button"
                            className={styles.expansionButton}
                            onClick={() => setExpanded(!expanded)}
                        >
                            <span className={expansionIconClassName}>
                                <ChevronDownIcon size="20" />
                            </span>
                            <p className={styles.totalPrice}>{price} руб</p>
                        </button>
                    </div>
                </div>
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
            </div>
        </div>
    );
};

BasketProduct.defaultProps = {
    name: 'Whalen',
    price: '666',
};

export default BasketProduct;
