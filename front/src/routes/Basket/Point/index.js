import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Point = ({ address, price, deliveryDays, meta, actions, className, style, onClick }) => {
    const rootClassName = cx(styles.root, className);
    const Root = onClick ? 'button' : 'div';

    return (
        <Root type={onClick ? 'button' : null} className={rootClassName} style={style} onClick={onClick}>
            <div className={styles.address}>{address}</div>
            {(price || deliveryDays) && (
                <div className={styles.info}>
                    {price && <span className={styles.price}>{price}</span>}
                    {deliveryDays && <span>{deliveryDays}</span>}
                </div>
            )}
            {meta.length ? (
                <div className={styles.meta}>
                    {meta.map(value => (
                        <span className={styles.metaItem}>{value}</span>
                    ))}
                </div>
            ) : null}
            {actions && <div className={styles.actions}>{actions}</div>}
        </Root>
    );
};

Point.defaultProps = {
    address: null,
    price: null,
    deliveryDays: null,
    meta: [],
    actions: null,
    className: null,
    style: null,
    onClick: null,
};

Point.propTypes = {
    address: PropTypes.string,
    price: PropTypes.string,
    deliveryDays: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.string),
    actions: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.objectOf(PropTypes.string),
    onClick: PropTypes.func,
};

export default Point;
