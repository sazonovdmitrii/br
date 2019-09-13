import React from 'react';

import styles from './styles.css';

const Hero = ({ image, title, subtitle, actions }) => (
    <div className={styles.root}>
        <div className={styles.background}>
            <picture>
                <img className={styles.image} src={image} alt="" />
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
