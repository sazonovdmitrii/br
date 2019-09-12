import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';

// import { ADD_TO_BASKET } from 'mutations';
// import { GET_SHORT_BASKET } from 'query';

import { isProd } from 'utils';

import { SeoHead } from 'utils';
import Button from 'components/Button';
import RichText from 'components/RichText';
import Select from 'components/Select';
import HeadTurn from 'components/HeadTurn';
import Carousel from 'components/Carousel';
import Delivery from 'components/Delivery';
import Colors from 'components/Colors';
import Container from 'components/Container';
import ProductCarousel from 'components/ProductCarousel';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Product = ({ name, id, items: { edges: items = [] }, description, tags, history, text }) => {
    const [selectedProduct, setSelectedProduct] = useState(items.length ? items[0].node : {});
    const images = selectedProduct.productItemImages;
    const colors = items.reduce((array, item) => {
        const [{ image }] = item.node.productItemTagItems;

        return array.concat({ id: item.node.id, image });
    }, []);
    const [color, setColor] = useState(colors.length ? colors[0].id : null);

    const handleChangeColor = id => {
        const newSelectedProduct = items.find(item => item.node.id === id);

        if (newSelectedProduct && newSelectedProduct.node.id !== selectedProduct.id) {
            setSelectedProduct(newSelectedProduct.node);
        }
    };
    const [showChooseLenses, setShowChooseLenses] = useState(false);

    const handleShowCL = () => {
        setShowChooseLenses(!showChooseLenses);
    };

    const sectionTitleCenterClassName = cx(styles.sectionTitle, styles.center);
    const rootClassName = cx(styles.root, { hide: showChooseLenses });

    console.log(images);
    return (
        <Container>
            <SeoHead type="product" name={name} items={items} image={images ? images[0].path : null} />
            {/* showChooseLenses && <ChooseLenses title={product.name} onClose={handleShowCL} /> */}
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
                        <FormattedMessage id="product_text" values={{ br: <br /> }} />
                    </div>
                    {selectedProduct.price && (
                        <div className={styles.buttons}>
                            <Button
                                href="/glasses-infos/ckkz-ochki.htm"
                                // onClick={handleShowCL}
                                kind="primary"
                                size="large"
                                bold
                            >
                                <FormattedMessage id="buy_at_optics_for" /> {selectedProduct.price} руб.
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.section}>
                <HeadTurn
                    images={['https://i.warbycdn.com/-/f/4-e68b48ec?quality=70&width=1200']}
                    title={<FormattedMessage id="about_the_frames" />}
                    text={
                        tags.length ? (
                            <>
                                <ul>
                                    {tags.map(({ name, value }, index) => {
                                        return (
                                            <li key={index}>
                                                {name}: {value}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        ) : null
                    }
                />
            </div>
            <Delivery
                title="Free shipping and free returns on every order"
                text="We have a 30-day, hassle-free return or exchange policy as well as a one-year, no scratch
            guarantee for our lenses; we'll replace your scratched lenses for free within the first 12 months."
            />
            <div className={styles.section}>
                <h2 className={sectionTitleCenterClassName}>
                    <FormattedMessage id="recommended" />
                </h2>
            </div>
        </Container>
    );
};

Product.defaultProps = {
    items: [],
    name: 'Без названия',
    tags: [],
    text: null,
};

Product.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    items: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.object),
    }),
    images: PropTypes.arrayOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.object),
};

export default Product;
