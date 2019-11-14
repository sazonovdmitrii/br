import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import { useFormatMessage } from 'hooks';

import AccessoryCard from 'components/AccessoryCard';

import styles from './styles.css';

import heroImage from './images/hero.jpg';

const _accessories = [
    { name: 'Салфетка из микрофибры', image: 'https://placehold.it/636x478' },
    { name: 'Футляр черный кожаный', image: 'https://placehold.it/636x478' },
    { name: 'Футляр коричневый кожаный', image: 'https://placehold.it/636x478' },
    { name: 'Футляр тканевый черный', image: 'https://placehold.it/636x478' },
];

const Accessories = () => {
    const [metaTitle] = useFormatMessage([{ id: 'p_accessories_meta_title' }]);

    return (
        <div className={styles.root}>
            <Helmet title={metaTitle}>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className={styles.hero}>
                <div className={styles.heroImageContainer}>
                    <picture>
                        <img className={styles.heroImage} src={heroImage} alt="" />
                    </picture>
                </div>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>
                        <FormattedMessage id="p_accessories_title" />
                    </h1>
                    <div className={styles.heroSubtitle}>
                        <FormattedMessage id="p_accessories_subtitle" values={{ br: <br /> }} />
                    </div>
                </div>
            </div>
            <div className={styles.products}>
                {_accessories.map(({ name, image }, index) => (
                    <AccessoryCard key={index} name={name} image={image} />
                ))}
            </div>
        </div>
    );
};

export default Accessories;
