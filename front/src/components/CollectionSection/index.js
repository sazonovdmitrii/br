import React from 'react';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';

import firstImage from './images/1.jpg';
import secondImage from './images/2.jpg';

import styles from './styles.css';

const CollectionSection = props => {
    return (
        <section className={styles.root}>
            <div className={styles.items}>
                <div className={styles.item}>
                    <img src={firstImage} alt="" />
                </div>
                <div className={styles.item}>
                    <img src={secondImage} alt="" />
                    <div className={styles.text}>
                        <div className={styles.title}>Fall 2019</div>
                        <div className={styles.subTitle}>
                            Scholarly shapes in autumnal acetates and crisp crystals
                        </div>
                        <Button kind="simple" rounded bold>
                            <FormattedMessage id="shop_the_collection" />
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CollectionSection;
