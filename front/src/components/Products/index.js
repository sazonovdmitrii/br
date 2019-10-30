import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';

import { GET_PRODUCTS } from 'query';

import ProductCard from 'components/ProductCard';
import Loader from 'components/Loader';
import Filters from 'components/Filters';

import styles from './styles.css';

const Products = ({ slug, limit, offset, className }) => {
    const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
        variables: { slug, limit, offset },
    });

    if (loading && !data) return <Loader />;
    if (error || !data) {
        console.error(`Error: ${error}`);
        return null;
    }

    const { products, tags, count } = data.catalog;
    const rowClassName = classnames(styles.row, className);

    return (
        <>
            {tags.length ? (
                <Filters
                    count={count}
                    list={tags}
                    onChange={newTags => {
                        refetch({ slug, limit, offset, tags: newTags });
                    }}
                />
            ) : null}
            <div className={styles.root}>
                <div className={rowClassName}>
                    {products &&
                        products.edges.map(({ node: { id, name, url, items } }) => (
                            <ProductCard
                                key={id}
                                name={name}
                                url={url}
                                items={items.edges}
                                loading={loading}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

Products.defaultProps = {
    limit: 40,
    offset: 0,
    slug: '',
    className: null,
};

Products.propTypes = {
    limit: PropTypes.number,
    offset: PropTypes.number,
    slug: PropTypes.string,
    className: PropTypes.string,
};

export default Products;
