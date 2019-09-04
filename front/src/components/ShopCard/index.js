import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const ShopCard = ({ className, title, subtitle, text }) => {
    const rootClassName = cx(styles.root, className);

    return (
        <div className={rootClassName}>
            <h3 className={styles.title}>{title}</h3>
            <div>
                <h1 className={styles.subtitle}>{subtitle}</h1>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    );
};

ShopCard.defaultProps = {};

ShopCard.propTypes = {};

export default ShopCard;
