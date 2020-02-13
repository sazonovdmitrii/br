import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Link from 'components/Link';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Shops = ({ items, kind }) => {
    const rootClassName = cx({ columns: kind === 'columns', row: kind === 'row' });

    return (
        <section className={rootClassName}>
            {items.map(({ id, region, city, name, full_name, storeUrls: [{ url }] }) => (
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
