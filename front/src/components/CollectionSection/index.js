import React from 'react';
import { FormattedMessage } from 'react-intl';

// import Button from 'components/Button';

import firstImage from './images/1.jpg';
import secondImage from './images/2.jpg';

import styles from './styles.css';

const CollectionSection = () => (
    <section className={styles.root}>
        <div className={styles.items}>
            <div className={styles.item}>
                <img src={firstImage} alt="" />
            </div>
            <div className={styles.item}>
                <img src={secondImage} alt="" />
                <div className={styles.text}>
                    <div className={styles.title}>
                        <FormattedMessage id="с_collection_title" />
                    </div>
                    <div className={styles.subTitle}>
                        <FormattedMessage id="с_collection_text" values={{ br: <br /> }} />
                    </div>
                    {/* <Button kind="simple" rounded bold>
                        <FormattedMessage id="shop_the_collection" />
                    </Button> */}
                </div>
            </div>
        </div>
    </section>
);

export default CollectionSection;
