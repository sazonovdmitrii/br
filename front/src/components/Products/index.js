import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import classnames from 'classnames';

import { GET_PRODUCTS } from 'query';
import { metrics } from 'utils';
import { useLang } from 'hooks';

import ProductCard from 'components/ProductCard';
import Loader from 'components/Loader';
import Filters from 'components/Filters';

import styles from './styles.css';

// avoid trigger gtm at using filters
let firstRender = true;

const Products = ({ slug, limit, offset, className }) => {
    const locale = useLang();
    const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
        variables: { slug, limit, offset, locale },
    });

    useEffect(() => {
        if (firstRender && data) {
            firstRender = !firstRender;

            const { name: catalogName, products } = data.catalog;

            metrics('gtm', {
                event: 'Impression', // Trigger Event
                data: {
                    currencyCode: 'RUB', // Local currency is optional.
                    impressions: products.edges.map(({ node: { id, name, items } }, index) => ({
                        id,
                        name: name || id, // Name or ID is required.
                        price: items.edges[0].node.price,
                        category: catalogName,
                        variant: items.edges[0].node.name,
                        list: 'Catalog',
                        position: index + 1,
                        quantity: 1,
                    })),
                },
            });
        }
    }, [data]);

    if (loading && !data) return <Loader />;
    if (error || !data) {
        console.error(`Error: ${error}`);
        return null;
    }

    const { products, tags } = data.catalog;
    const rowClassName = classnames(styles.row, className);

    return (
        <>
            {tags.length ? (
                <Filters
                    count={products.edges.length}
                    list={tags}
                    onChange={(newTags) => {
                        refetch({ slug, limit, offset, tags: newTags });
                    }}
                />
            ) : null}
            <div className={styles.root}>
                <div className={rowClassName}>
                    {products &&
                        products.edges.map(({ node: { id, name, url, items } }, index) => (
                            <ProductCard
                                key={id}
                                id={id}
                                seo={{ position: index + 1, showPlace: 'Catalog' }} // for SEO
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
