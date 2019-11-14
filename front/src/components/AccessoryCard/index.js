import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Title from 'components/Title';
import Link from 'components/Link';

import styles from './styles.css';

const Accessory = ({ name, image, price, url }) => (
    <div className={styles.root}>
        {image && (
            <a href={url}>
                <img src={image} className={styles.image} />
            </a>
        )}
        <div className={styles.body}>
            <div className={styles.price}>
                <FormattedMessage id="currency" values={{ price }} />
            </div>
            <Title element="h2" className={styles.title}>
                {name}
            </Title>
            <h3 className={styles.subTitle}>Multi-color</h3>
            <div className={styles.actions}>
                <Link href={url} className={styles.shopLink}>
                    <FormattedMessage id="shop_now" />
                </Link>
            </div>
        </div>
    </div>
);

Accessory.defaultProps = {
    name: null,
    image: null,
};

Accessory.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default Accessory;
