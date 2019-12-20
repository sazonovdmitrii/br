import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';

import { SeoHead } from 'utils';
import { useLangLinks } from 'hooks';

import Button from 'components/Button';
import Colors from 'components/Colors';
import Container from 'components/Container';
import Delivery from 'components/Delivery';
import ProductTags from 'components/ProductTags';
import ProductCard from 'components/ProductCard';
import ProductCarousel from 'components/ProductCarousel';

import styles from './styles.css';
// import headTurnImage from './headturn.jpg';
import ChooseLenses from './ChooseLenses';

const cx = classnames.bind(styles);

const Product = ({
    name,
    items: { edges: items = [] },
    tags,
    similars: { edges: similars = [] },
    lenses,
}) => {
    const [buyLink] = useLangLinks(['/retail']);
    const [selectedProduct, setSelectedProduct] = useState(items.length ? items[0].node : {});
    const [showChooseLenses, setShowChooseLenses] = useState(false);

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
    const handleCloseChooseLenses = () => {
        setShowChooseLenses(!showChooseLenses);
    };

    const sectionTitleCenterClassName = cx(styles.sectionTitle, styles.center);
    const rootClassName = cx(styles.root, { hide: showChooseLenses });

    return (
        <Container>
            <SeoHead type="product" name={name} items={items} image={images.length ? images[0].path : null} />
            {showChooseLenses && (
                <ChooseLenses
                    product={{ name, item: selectedProduct }}
                    lenses={lenses}
                    onClose={handleCloseChooseLenses}
                />
            )}
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
                    <div className={styles.price}>
                        <FormattedMessage id="p_product_price" />{' '}
                        <FormattedMessage id="currency" values={{ price: selectedProduct.price }} />
                    </div>
                    {selectedProduct.price && (
                        <div className={styles.buttons}>
                            {lenses.length ? (
                                <Button
                                    onClick={() => setShowChooseLenses(true)}
                                    kind="primary"
                                    size="large"
                                    bold
                                >
                                    <FormattedMessage id="p_product_select_lenses" />
                                </Button>
                            ) : null}
                            <Button to={buyLink} kind="primary" size="large" bold>
                                <FormattedMessage id="p_product_buy_at_optics_for" />
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
    lenses: [],
};

Product.propTypes = {
    name: PropTypes.string,
    // id: PropTypes.number.isRequired,
    lenses: PropTypes.arrayOf(PropTypes.object),
    items: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.object),
    }),
    similars: PropTypes.objectOf(PropTypes.array),
    tags: PropTypes.arrayOf(PropTypes.object),
};

export default Product;
