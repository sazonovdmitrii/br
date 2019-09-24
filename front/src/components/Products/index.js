import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';

import { GET_PRODUCTS } from 'query';

import ProductCard from 'components/ProductCard';
import Loader from 'components/Loader';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Products = ({ title, slug, limit, offset, className }) => {
    const { loading, error, data } = useQuery(GET_PRODUCTS, {
        variables: { slug, limit, offset },
    });
    const rowClassName = cx(styles.row, className);

    if (loading && !data) return <Loader />;
    if (error || !data) {
        console.error(`Error: ${error}`);
        return null;
    }

    const { products } = data.catalog;

    return (
        <div className={styles.root}>
            {title}
            <div className={rowClassName}>
                {products &&
                    products.edges.map(({ node: { id, name, url, image, items } }) => (
                        <ProductCard
                            key={id}
                            name={name}
                            url={url}
                            image={image}
                            items={items.edges}
                            loading={loading}
                        />
                    ))}
            </div>
        </div>
    );
};

Products.defaultProps = {
    limit: 40,
    offset: 0,
    title: null,
    slug: '',
    className: null,
};

Products.propTypes = {
    limit: PropTypes.number,
    offset: PropTypes.number,
    title: PropTypes.node,
    slug: PropTypes.string,
    className: PropTypes.string,
};

export default Products;
