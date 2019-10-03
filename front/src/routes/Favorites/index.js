import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useLangLinks } from 'hooks';

import ProductCard from 'components/ProductCard';

import styles from './styles.css';

const Favorites = ({ products = [] }) => {
    const [eyeglassesManLink, eyeglassesWomenLink, sunglassesMenLink, sunglassesWomenLink] = useLangLinks([
        '/eyeglasses/men',
        '/eyeglasses/women',
        '/sunglasses/men',
        '/sunglasses/women',
    ]);

    if (!products.lenght) {
        return (
            <div className={styles.root}>
                <div className={styles.header}>
                    <div className={styles.title}>
                        <FormattedMessage id="favorites_page_empty_title" />
                    </div>
                </div>
                <div className={styles.text}>
                    <FormattedMessage id="favorites_page_empty_text" />
                </div>
                <div className={styles.categories}>
                    <div className={styles.categoryContainer}>
                        <h2 className={styles.categoryTitle}>
                            <FormattedMessage id="browse_optical" />
                        </h2>
                        <div className={styles.linkContainer}>
                            <Link className={styles.genderLink} to={eyeglassesManLink}>
                                <FormattedMessage id="men" />
                            </Link>
                            <Link className={styles.genderLink} to={eyeglassesWomenLink}>
                                <FormattedMessage id="women" />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.categoryContainer}>
                        <h2 className={styles.categoryTitle}>
                            <FormattedMessage id="browse_sunwear" />
                        </h2>
                        <div className={styles.linkContainer}>
                            <Link className={styles.genderLink} to={sunglassesMenLink}>
                                <FormattedMessage id="men" />
                            </Link>
                            <Link className={styles.genderLink} to={sunglassesWomenLink}>
                                <FormattedMessage id="women" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <FormattedMessage id="favorites_page_title" />
                </div>
            </div>
            <div className={styles.products}>
                {products.map(item => (
                    <ProductCard />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
