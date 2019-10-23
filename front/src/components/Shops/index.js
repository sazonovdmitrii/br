import React from 'react';
import PropTypes from 'prop-types';

import Link from 'components/Link';

import styles from './styles.css';

const Shops = ({ items }) => {
    return (
        <section className={styles.columns}>
            {items.map(({ id, region, city, name, full_name, url }) => (
                <div key={id} className={styles.column}>
                    {region && <h3 className={styles.region}>{region}</h3>}
                    <h1 className={styles.title}>
                        {city}
                        {', '}
                        {url ? <Link to={url}>{name}</Link> : name}
                    </h1>
                    <p className={styles.text}>{full_name}</p>
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
