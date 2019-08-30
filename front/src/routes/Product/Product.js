import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import classnames from 'classnames/bind';

// import { ADD_TO_BASKET } from 'mutations';
// import { GET_SHORT_BASKET } from 'query';

import { seoHead } from 'utils';
import Button from 'components/Button';
import RichText from 'components/RichText';
import Select from 'components/Select';
import HeadTurn from 'components/HeadTurn';
import Carousel from 'components/Carousel';
import Delivery from 'components/Delivery';
import Colors from 'components/Colors';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Product = ({ name, id, items, images, description, tags, history, text }) => {
    const [tabIndex, setTabIndex] = useState(0);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(items.edges[0].node);
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
        const newSelectedProduct = items.edges.find(item => item.node.id === id);

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

    return (
        <>
            {/*showChooseLenses && <ChooseLenses title={product.name} onClose={handleShowCL} />*/}
            <div style={{ display: showChooseLenses ? 'none' : 'block' }}>
                {images.length && (
                    <div className={styles.carouselWrapper}>
                        <Carousel>
                            {images.map(item => (
                                <div key={item} className={styles.slide}>
                                    <img className={styles.slideImage} src={item} alt="" />
                                </div>
                            ))}
                        </Carousel>
                    </div>
                )}
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
                    <div className={styles.buttons}>
                        <Button
                            href="/glasses-infos/ckkz-ochki.htm"
                            // onClick={handleShowCL}
                            kind="primary"
                            bold
                        >
                            Купить в оптике за {Math.abs(selectedProduct.price)} руб.
                        </Button>
                    </div>
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
                {tags.length && (
                    <>
                        <h2 className={styles.sectionTitle}>О оправе</h2>
                        {tags.map(({ name, value }) => {
                            return (
                                <p key={value}>
                                    {name}: {value}
                                </p>
                            );
                        })}
                    </>
                )}
            </HeadTurn>
            {text && (
                <div className={styles.section}>
                    <h2 styles={styles.sectionTitle}>Описание бренда {tags[142].values_str[0]}</h2>
                    <RichText expanded={false}>{text}</RichText>
                </div>
            )}
            <div className={styles.section}>
                <Delivery
                    title="Free shipping and free returns on every order"
                    text="We have a 30-day, hassle-free return or exchange policy as well as a one-year, no scratch
            guarantee for our lenses; we'll replace your scratched lenses for free within the first 12 months."
                />
            </div>
            <div className={styles.section}>
                <h2 styles={styles.sectionTitle}>Другие товары</h2>
            </div>
        </>
    );
};

Product.defaultProps = {
    items: [],
    name: 'Без названия',
    images: [
        'https://laparfumerie.ru/product/2016/07/18/4271_80597_658713_ru.jpg.normal.jpg',
        'https://laparfumerie.ru/product/2016/07/01/4478_78658_656163_ru.jpg.normal.jpg',
    ],
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
