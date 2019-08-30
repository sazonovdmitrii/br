import React from 'react';

import styles from './styles.css';

const Hero = ({ image, title, subtitle, actions }) => (
    <div className={styles.root}>
        <div className={styles.background}>
            <picture>
                <source
                    media="(min-width: 1600px)"
                    srcSet="https://placehold.it/2400x520, https://placehold.it/3600x520 1.5x, https://placehold.it/4800x520 2x"
                />
                <source
                    media="(min-width: 768px)"
                    srcSet="https://placehold.it/1600x520, https://placehold.it/2400x520 1.5x, https://placehold.it/3200x520 2x"
                />
                <img
                    className={styles.image}
                    src="https://placehold.it/1152x520"
                    srcSet="https://placehold.it/1536x520 2x"
                    alt="Men’s Optical"
                />
            </picture>
        </div>
        <div className={styles.body}>
            {title && <h1 className={styles.title}>{title}</h1>}
            {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    </div>
);

export default Hero;
