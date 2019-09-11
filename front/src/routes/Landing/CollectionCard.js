import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

import styles from './collectioncard.css';

const CollectionCard = ({ actions, title, text }) => (
    <div className={styles.root}>
        <picture className={styles.imageWrapper}>
            <img className={styles.image} src="https://placehold.it/600x276" alt="" />
        </picture>
        <div className={styles.body}>
            {title && (
                <span className={styles.title} style={{ borderColor: '#C6E2F7' }}>
                    {title}
                </span>
            )}
            {text && <p className={styles.text}>{text}</p>}
            <div className={styles.actions}>{actions}</div>
        </div>
    </div>
);

CollectionCard.defaultProps = {};

CollectionCard.propTypes = {};

export default CollectionCard;
