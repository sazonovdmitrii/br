import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const CollectionCard = ({ actions, title, text }) => (
    <div className={styles.root}>
        <picture className={styles.imageWrapper}>
            <img className={styles.image} src="https://placehold.it/600x276" alt="" />
        </picture>
        <div className={styles.body}>
            {title && <div className={styles.title}>{title}</div>}
            {text && <div className={styles.text}>{text}</div>}
            <div className={styles.actions}>{actions}</div>
        </div>
    </div>
);

CollectionCard.defaultProps = {};

CollectionCard.propTypes = {};

export default CollectionCard;
