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

const Products = ({ title, page, slug, limit, offset, col, className }) => {
    const { loading, error, data, fetchMore } = useQuery(GET_PRODUCTS, {
        variables: { slug, limit, offset },
    });
    const rowClassName = cx(styles.row, className);
    const colClassName = cx(styles.col, {
        [`col${col}`]: col,
    });

    if (loading && !data.catalog) return <Loader />;
    if (error || !data) {
        console.error(`Error: ${error}`);
        return null;
    }

    const { products, count } = data.catalog;

    return (
        <div className={styles.root}>
            {title}
            <div className={rowClassName}>
                {products &&
                    products.edges.map((item, index, array) => (
                        <div key={item.node.id} className={colClassName}>
                            <ProductCard {...item.node} loading={loading} />
                        </div>
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
    col: 3,
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
