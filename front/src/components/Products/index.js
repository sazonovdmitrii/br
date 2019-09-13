import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';

import { GET_PRODUCTS } from 'query';

import ProductCard from 'components/ProductCard';
import BrandSale from 'components/BrandSale';
import Button from 'components/Button';
import Loader from 'components/Loader';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Products = ({ title, page, slug, limit, offset, className }) => {
    const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: { slug, limit, offset },
    });
    const rowClassName = cx(styles.row, className);

    if (loading && !data.catalog) return <Loader />;
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
                    products.edges.map((item, index, array) => (
                        <ProductCard key={item.node.id} {...item.node} loading={loading} />
                    ))}
            </div>
        </div>
    );
};

Products.defaultProps = {
    limit: 40,
    offset: 0,
    title: null,
    page: '',
    slug: '',
    className: null,
};

Products.propTypes = {
    limit: PropTypes.number,
    offset: PropTypes.number,
    title: PropTypes.node,
    page: PropTypes.string,
    slug: PropTypes.string,
    col: PropTypes.number,
    className: PropTypes.string,
};

export default Products;
