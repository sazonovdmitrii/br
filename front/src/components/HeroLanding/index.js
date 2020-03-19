import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const HeroLanding = ({ image, actions, title, text }) => (
    <div className={styles.root}>
        <div className={styles.imageWrapper}>
            <picture className={styles.image}>
                <img src={image.source} srcSet={image.retina ? `${image.retina} 2x` : null} alt="" />
            </picture>
        </div>
        <div className={styles.body}>
            <h1 className={styles.title}>{title}</h1>
            {text && <p className={styles.text}>{text}</p>}
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    </div>
);

HeroLanding.defaultProps = {
    image: {},
    actions: null,
    text: null,
    title: null,
};

HeroLanding.propTypes = {
    text: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    image: PropTypes.objectOf(PropTypes.string),
    actions: PropTypes.node,
};

export default HeroLanding;
