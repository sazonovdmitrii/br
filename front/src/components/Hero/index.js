import React from 'react';
import PropTypes from 'prop-types';

import { createMarkup } from 'utils';

import styles from './styles.css';

const Hero = ({ image, title, subtitle, actions }) => (
    <div className={styles.root}>
        <div className={styles.background}>
            <picture>
                <img className={styles.image} src={image} alt="" />
            </picture>
        </div>
        {(title || subtitle) && (
            <div className={styles.text}>
                {title && <h1 className={styles.title}>{title}</h1>}
                {subtitle && (
                    <div className={styles.subtitle} dangerouslySetInnerHTML={createMarkup(subtitle)} />
                )}
                {actions && <div className={styles.actions}>{actions}</div>}
            </div>
        )}
    </div>
);

Hero.defaultProps = {
    title: null,
    subtitle: null,
};

Hero.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    subtitle: PropTypes.string,
};

export default Hero;
