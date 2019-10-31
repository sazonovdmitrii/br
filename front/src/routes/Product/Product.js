import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
// import { useMutation } from '@apollo/react-hooks';

import { SeoHead } from 'utils';
import {
    useLangLinks,
    // useApp
} from 'hooks';
// import { ADD_TO_BASKET } from 'mutations';
// import { GET_SHORT_BASKET } from 'query';

import Button from 'components/Button';
import Colors from 'components/Colors';
import Container from 'components/Container';
import Delivery from 'components/Delivery';
import ProductTags from 'components/ProductTags';
import ProductCard from 'components/ProductCard';
import ProductCarousel from 'components/ProductCarousel';

import styles from './styles.css';
// import headTurnImage from './headturn.jpg';
// import ChooseLenses from './ChooseLenses';

const cx = classnames.bind(styles);

const Product = ({
    // id,
    name,
    items: { edges: items = [] },
    tags,
    similars: { edges: similars = [] },
}) => {
    const [buyLink] = useLangLinks(['/retail']);
    // const { createNotification } = useApp();
    const [selectedProduct, setSelectedProduct] = useState(items.length ? items[0].node : {});
    const images = selectedProduct.productItemImages;
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
    // const [addToCard, { data: addBasket, loadingMutation }] = useMutation(ADD_TO_BASKET, {
    //     variables: {
    //         input: {
    //             item_id: selectedProduct.id,
    //         },
    //     },
    //     onCompleted({ addBasket: { products } }) {
    //         if (products) {
    //             console.info('product added to basket', products);
    //             history.push('/cart');
    //         }
    //     },
    //     onError(error) {
    //         createNotification({ type: 'error', message: error.message });
    //     },
    //     // TODO
    //     update(
    //         cache,
    //         {
    //             data: { addBasket },
    //         }
    //     ) {
    //         cache.writeQuery({
    //             query: GET_SHORT_BASKET,
    //             data: {
    //                 basket: {
    //                     products: addBasket.products,
    //                     __typename: 'Basket',
    //                 },
    //             },
    //         });
    //     },
    // });
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
                        </div>
                    )}
                </div>
            </div>
            <Delivery
                title={<FormattedMessage id="p_product_delivery_title" />}
                text={<FormattedMessage id="p_product_delivery_text" />}
            />
            <div className={styles.section}>
                <ProductTags items={tags} image={images.length === 2 ? images[1].path : null} />
            </div>
            <Delivery
                title={<FormattedMessage id="p_product_lenses_block_title" />}
                text={<FormattedMessage id="p_product_lenses_block_text" />}
            />
            {images[2] && (
                <div className={styles.sectionImage}>
                    <img src={images[2].path} alt="" />
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
                                <div key={item.id} className={styles.relatedProduct}>
                                    <ProductCard
                                        name={item.name}
                                        url={item.url}
                                        image={
                                            firstItem.productItemImages[0]
                                                ? firstItem.productItemImages[0].path
                                                : null
                                        }
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
    // tags: PropTypes.arrayOf(PropTypes.object),
};

export default Product;
