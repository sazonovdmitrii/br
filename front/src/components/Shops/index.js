import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Link from 'components/Link';

import styles from './styles.css';

const Shops = ({ items }) => {
    return (
        <section className={styles.columns}>
            {items.map((item, index) => (
                <div key={index} className={styles.column}>
                    <h3 className={styles.region}>{item.region}</h3>
                    {item.shops.map((shop, shopIndex) => (
                        <Fragment key={shopIndex}>
                            <h1 className={styles.title}>
                                {shop.city}
                                {', '}
                                {shop.link ? (
                                    <Fragment>
                                        <Link to={shop.link}>{shop.name}</Link>
                                    </Fragment>
                                ) : (
                                    shop.name
                                )}
                            </h1>
                            <p className={styles.text}>{shop.address}</p>
                        </Fragment>
                    ))}
                </div>
            ))}
        </section>
    );
};

Shops.defaultProps = {
    items: [],
};

Shops.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
};

export default Shops;
