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

import { seoHead } from 'utils';
import Button from 'components/Button';
import RichText from 'components/RichText';
import Select from 'components/Select';
import HeadTurn from 'components/HeadTurn';
import Carousel from 'components/Carousel';
import Delivery from 'components/Delivery';
import Colors from 'components/Colors';
import Container from 'components/Container';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Product = ({ name, id, items: { items = [] }, description, tags, history, text }) => {
    console.log();
    const [tabIndex, setTabIndex] = useState(0);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(items.length ? items[0].node : {});
    // const [addToCard, { data: addBasket, loadingMutation }] = useMutation(ADD_TO_BASKET, {
    //     variables: {
    //         input: {
    //             item_id: selectedProduct.id,
    //         },
    //     },
    //     onCompleted({ addBasket: { products } }) {
    //         if (products) {
    //             console.warn('product added to basket', products);
    //             history.push('/basket');
    //         }
    //     },
    //     onError(error) {
    //         setError(error.message);
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
    const handleChangeItem = ({ id, price: itemPrice }) => {
        if (!itemPrice) return;
        const newSelectedProduct = items.find(item => item.node.id === id);

        if (newSelectedProduct && newSelectedProduct.node.id !== selectedProduct.id) {
            setSelectedProduct(newSelectedProduct.node);
        }
    };
    const handleChangeTab = ({ value }) => {
        setTabIndex(value);
    };
    const [showChooseLenses, setShowChooseLenses] = useState(false);

    const handleShowCL = () => {
        setShowChooseLenses(!showChooseLenses);
    };
    const images = items.reduce((acc, { node }) => acc.concat(node.productItemImages), []);

    return (
        <Container>
            {/* showChooseLenses && <ChooseLenses title={product.name} onClose={handleShowCL} /> */}
            <div style={{ display: showChooseLenses ? 'none' : 'block' }}>
                {images.length ? (
                    <div className={styles.carouselWrapper}>
                        <Carousel>
                            {images.map(item => (
                                <div key={item.id} className={styles.slide}>
                                    <img
                                        className={styles.slideImage}
                                        src={`${isProd ? '' : 'http://br.morphes.ru'}${item.path}`}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                ) : null}
                <div className={styles.meta}>
                    <h1 className={styles.title}>{name}</h1>
                    <div className={styles.colorsWrapper}>
                        <Colors
                            value={1}
                            list={[
                                { id: 1, image: 'https://placehold.it/20x20/000', url: '#' },
                                { id: 2, image: 'https://placehold.it/20x20/ccc', url: '#' },
                                { id: 3, image: 'https://placehold.it/20x20/rrr', url: '#' },
                            ]}
                        />
                    </div>
                    <h2 className={styles.description}>Layered Aloe Crystal with Riesling</h2>
                    {selectedProduct.price && (
                        <div className={styles.buttons}>
                            <Button
                                href="/glasses-infos/ckkz-ochki.htm"
                                // onClick={handleShowCL}
                                kind="primary"
                                bold
                            >
                                Купить в оптике за {selectedProduct.price} руб.
                            </Button>
                        </div>
                    )}
                    <div className={styles.info}>
                        <p>
                            Возможны варианты: оправа без линз, оправа с однофокальным линзами,
                            <br />
                            бифокальными, прогрессивными и солнцезащитными
                        </p>
                    </div>
                </div>
            </div>
            <HeadTurn
                images={[
                    'https://i.warbycdn.com/-/f/1-7d338278?quality=70&width=1200',
                    'https://i.warbycdn.com/-/f/2-b6a17adb?quality=70&width=1200',
                    'https://i.warbycdn.com/-/f/3-9b4a1a29?quality=70&width=1200',
                    'https://i.warbycdn.com/-/f/4-e68b48ec?quality=70&width=1200',
                    'https://i.warbycdn.com/-/f/5-4ddd492b?quality=70&width=1200',
                    'https://i.warbycdn.com/-/f/6-60faa9af?quality=70&width=1200',
                    'https://i.warbycdn.com/-/f/7-a09963b0?quality=70&width=1200',
                ]}
            >
                {tags.length ? (
                    <>
                        <h2 className={styles.sectionTitle}>
                            <FormattedMessage id="about_the_frames" />
                        </h2>
                        {tags.map(({ name, value }) => {
                            return (
                                <p key={value}>
                                    {name}: {value}
                                </p>
                            );
                        })}
                    </>
                ) : null}
            </HeadTurn>
            <Delivery
                title="Free shipping and free returns on every order"
                text="We have a 30-day, hassle-free return or exchange policy as well as a one-year, no scratch
            guarantee for our lenses; we'll replace your scratched lenses for free within the first 12 months."
            />
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
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
