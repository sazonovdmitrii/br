import React from 'react';

import styles from './styles.css';

export default ({ image, title, subtitle, actions }) => (
    <div className={styles.root}>
        <div className={styles.background}>
            <picture>
                <source
                    media="(min-width: 1600px)"
                    srcSet="//i.warbycdn.com/v/c/assets/gallery/image/desktop-men-optical/0/6674cf9b46.jpg?quality=70&amp;width=2400, //i.warbycdn.com/v/c/assets/gallery/image/desktop-men-optical/0/6674cf9b46.jpg?quality=70&amp;width=3600 1.5x, //i.warbycdn.com/v/c/assets/gallery/image/desktop-men-optical/0/6674cf9b46.jpg?quality=70&amp;width=4800 2x"
                />
                <source
                    media="(min-width: 768px)"
                    srcSet="//i.warbycdn.com/v/c/assets/gallery/image/desktop-men-optical/0/6674cf9b46.jpg?quality=70&amp;width=1600, //i.warbycdn.com/v/c/assets/gallery/image/desktop-men-optical/0/6674cf9b46.jpg?quality=70&amp;width=2400 1.5x, //i.warbycdn.com/v/c/assets/gallery/image/desktop-men-optical/0/6674cf9b46.jpg?quality=70&amp;width=3200 2x"
                />
                <img
                    className={styles.image}
                    srcSet="//i.warbycdn.com/v/c/assets/gallery/image/mobile-men-optical/0/dd3ee67c1c.jpg?quality=70&amp;width=768, //i.warbycdn.com/v/c/assets/gallery/image/mobile-men-optical/0/dd3ee67c1c.jpg?quality=70&amp;width=1152 1.5x, //i.warbycdn.com/v/c/assets/gallery/image/mobile-men-optical/0/dd3ee67c1c.jpg?quality=70&amp;width=1536 2x"
                    alt="Men’s Optical"
                />
            </picture>
        </div>
        <div className={styles.body}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.subtitle}>{subtitle}</div>
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    </div>
);
