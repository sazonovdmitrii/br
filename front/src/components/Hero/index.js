import React from 'react';

import styles from './styles.css';

const Hero = ({ image, title, subtitle, actions }) => (
    <div className={styles.root}>
        <div className={styles.background}>
            <picture>
                <source
                    media="(min-width: 1600px)"
                    srcSet="https://placehold.it/1400x480, https://placehold.it/2800x960 2x"
                />
                <source
                    media="(min-width: 768px)"
                    srcSet="https://placehold.it/1200x400, https://placehold.it/2400x800 2x"
                />
                <img
                    className={styles.image}
                    src="https://placehold.it/768x376"
                    srcSet="https://placehold.it/1536x752 2x"
                    alt="Men’s Optical"
                />
            </picture>
        </div>
        <div className={styles.text}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    </div>
);

export default Hero;
