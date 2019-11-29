import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router';

import { SeoHead } from 'utils';
import { useLangLinks, useApp } from 'hooks';
import { ADD_TO_BASKET } from 'mutations';
import { GET_SHORT_BASKET, GET_BASKET } from 'query';

import Button from 'components/Button';
import Colors from 'components/Colors';
import Container from 'components/Container';
import Delivery from 'components/Delivery';
import ProductTags from 'components/ProductTags';
import ProductCard from 'components/ProductCard';
import ProductCarousel from 'components/ProductCarousel';
import Loader from 'components/Loader';

import styles from './styles.css';
// import headTurnImage from './headturn.jpg';
// import ChooseLenses from './ChooseLenses';

const cx = classnames.bind(styles);

const Product = ({ name, items: { edges: items = [] }, tags, similars: { edges: similars = [] } }) => {
    const history = useHistory();
    const [buyLink] = useLangLinks(['/retail']);
    const { createNotification } = useApp();
    const [selectedProduct, setSelectedProduct] = useState(items.length ? items[0].node : {});
    const { images } = selectedProduct;
    const colors = items.reduce((array, item) => {
        const [{ image }] = item.node.productItemTagItems;

        return array.concat({ id: item.node.id, image });
    }, []);

    const handleChangeColor = id => {
        const newSelectedProduct = items.find(item => item.node.id === id);

        if (newSelectedProduct && newSelectedProduct.node.id !== selectedProduct.id) {
            setSelectedProduct(newSelectedProduct.node);
        }
    };
    const [showChooseLenses, setShowChooseLenses] = useState(false);
    const [addToCard, { loading: loadingAddToCart }] = useMutation(ADD_TO_BASKET, {
        variables: {
            input: {
                item_id: selectedProduct.id,
            },
        },
        onCompleted({ addBasket: { products } }) {
            if (products) {
                console.info('product added to basket', products);
                history.push('/cart');
            }
        },
        onError({ graphQLErrors: [{ message }] }) {
            createNotification({ type: 'error', message });
        },
        update(
            cache,
            {
                data: { addBasket },
            }
        ) {
            /* <3 apollo */
            [GET_SHORT_BASKET, GET_BASKET].forEach(query => {
                cache.writeQuery({
                    query,
                    data: {
                        basket: {
                            products: addBasket.products,
                            __typename: 'Basket',
                        },
                    },
                });
            });
        },
    });
    // const handleShowCL = () => {
    //     setShowChooseLenses(!showChooseLenses);
    // };

    const sectionTitleCenterClassName = cx(styles.sectionTitle, styles.center);
    const rootClassName = cx(styles.root, { hide: showChooseLenses });

    return (
        <Container>
            <SeoHead type="product" name={name} items={items} image={images.length ? images[0].path : null} />
            {/* showChooseLenses && <ChooseLenses title={name} onClose={handleShowCL} /> */}
            <div className={rootClassName}>
                {images.length ? (
                    <div className={styles.carouselWrapper}>
                        <ProductCarousel items={images} />
                    </div>
                ) : null}
                <div className={styles.meta}>
                    <h1 className={styles.title}>{name}</h1>
                    <h2 className={styles.description}>{selectedProduct.name}</h2>
                    <div className={styles.colorsWrapper}>
                        <Colors
                            value={selectedProduct.id}
                            list={colors}
                            onChange={value => handleChangeColor(value)}
                        />
                    </div>
                    <div className={styles.info}>
                        <FormattedMessage id="p_product_text" values={{ br: <br /> }} />
                    </div>
                    {selectedProduct.price && (
                        <div className={styles.buttons}>
                            <Button to={buyLink} kind="primary" size="large" bold>
                                <FormattedMessage
                                    id="p_product_buy_at_optics_for"
                                    values={{ price: selectedProduct.price }}
                                />
                            </Button>
                            <Button onClick={addToCard} kind="primary" size="large" bold>
                                {loadingAddToCart ? (
                                    <Loader kind="secondary" />
                                ) : (
                                    <FormattedMessage id="p_product_add_to_cart" />
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <Delivery
                title={<FormattedMessage id="p_product_delivery_title" />}
                text={<FormattedMessage id="p_product_delivery_text" />}
            />
            <div className={styles.section}>
                <ProductTags items={tags} image={images[1] ? images[1] : null} />
            </div>
            <Delivery
                title={<FormattedMessage id="p_product_lenses_block_title" />}
                text={<FormattedMessage id="p_product_lenses_block_text" />}
            />
            {images[2] && (
                <div className={styles.sectionImage}>
                    <picture>
                        <source
                            srcSet={`${images[2].middle.webp} 1x, ${images[2].big.webp} 2x`}
                            type="image/webp"
                        />
                        <img src={images[2].middle.original} srcSet={`${images[2].big.original} 2x`} alt="" />
                    </picture>
                </div>
            )}
            {similars.length ? (
                <div className={styles.section}>
                    <h2 className={sectionTitleCenterClassName}>
                        <FormattedMessage id="recommended" />
                    </h2>
                    <div className={styles.related}>
                        {similars.map(item => {
                            const [{ node: firstItem }] = item.node.items.edges;

                            return (
                                <div key={item.node.id} className={styles.relatedProduct}>
                                    <ProductCard
                                        name={item.node.name}
                                        url={item.node.url}
                                        image={firstItem.images[0] ? firstItem.images[0] : null}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </Container>
    );
};

Product.defaultProps = {
    items: [],
    name: 'Без названия',
    tags: [],
    similars: [],
};

Product.propTypes = {
    name: PropTypes.string,
    // id: PropTypes.number.isRequired,
    items: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.object),
    }),
    similars: PropTypes.objectOf(PropTypes.array),
    tags: PropTypes.arrayOf(PropTypes.object),
};

export default Product;
