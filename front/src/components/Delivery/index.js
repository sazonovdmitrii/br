import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const Delivery = ({ title, text }) => (
    <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        <p className={styles.text}>{text}</p>
    </div>
);

Delivery.defaultProps = {};

Delivery.propTypes = {};

export default Delivery;
