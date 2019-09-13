import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';

import styles from './styles.css';

const Lenses = ({ title, text, image, items, action }) => (
    <div className={styles.root}>
        {image && <div className={styles.image}>{image}</div>}
        <div className={styles.body}>
            <div className={styles.copyBlock}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.text}>{text}</p>
                {action && <div className={styles.buttonDesktop}>{action}</div>}
            </div>
            <div className={styles.rightBlock}>
                {items.map(({ label, value }) => (
                    <>
                        <div className={styles.label}>{label}</div>
                        <div className={styles.value}>{value}</div>
                    </>
                ))}
            </div>
        </div>
        {action && <div className={styles.buttonMobile}>{action}</div>}
    </div>
);

Lenses.defaultProps = {};

Lenses.propTypes = {};

export default Lenses;
