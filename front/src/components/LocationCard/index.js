import React from 'react';

import { useLangLinks } from 'hooks';

import Link from 'components/Link';

import styles from './styles.css';

const LocationCard = ({ title, image, subtitle, meta, url: urlProps }) => {
    const [url] = useLangLinks([urlProps]);

    return (
        <div className={styles.root}>
            <img src={image} className={styles.image} />
            <div className={styles.body}>
                <h3 className={styles.title}>
                    <Link to={url}>{title}</Link>
                </h3>
                <p className={styles.subtitle}>{subtitle}</p>
                <p className={styles.meta}>{meta}</p>
            </div>
        </div>
    );
};
export default LocationCard;
