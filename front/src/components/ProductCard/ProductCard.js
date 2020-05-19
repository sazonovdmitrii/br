import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { metrics } from 'utils';

import Colors from 'components/Colors';

import styles from './styles.css';
import placeholderImage from './images/placeholder.png';

const ProductCard = ({ id, url, items, name, subname, price, image: imageProps, seo, onClick }) => {
    const colors = items.reduce((array, item) => {
        const [{ image }] = item.node.productItemTagItems;

        return array.concat({ id: item.node.id, image });
    }, []);
    const [color, setColor] = useState(colors.length ? colors[0].id : null);
    const [image, setImage] = useState(
        imageProps ||
            (items.length && items[0].node.images.length ? items[0].node.images[0] : placeholderImage)
    );

    const handleChangeColor = value => {
        const {
            node: { images },
        } = items.find(({ node }) => node.id === value);
        const newImage = images.length ? images[0] : placeholderImage;

        setImage(newImage);
        setColor(value);
    };

    const handleSEOClick = () => {
        onClick();

        if (!seo.showPlace) return;

        metrics('gtm', {
            event: 'productClick',
            data: {
                click: {
                    actionField: {
                        list: seo.showPlace,
                    },
                    products: [
                        {
                            id,
                            name: name || id, // Name or ID is required.
                            price: items[0].node.price,
                            position: seo.position,
                        },
                    ],
                },
            },
        });
    };

    const RootLink = props =>
        url ? (
            <Link {...props} onClick={handleSEOClick} />
        ) : (
            <div className={props.className} onClick={onClick}>
                {props.children}
            </div>
        );

    return (
        <div className={styles.root}>
            <RootLink to={url} className={styles.imageWrapper} title={name}>
                {typeof image === 'object' ? (
                    <picture>
                        <source
                            srcSet={`${image.small.webp} 1x, ${image.premiddle.webp} 2x`}
                            type="image/webp"
                        />
                        <img
                            className={styles.image}
                            src={image.small.original}
                            srcSet={`${image.premiddle.original} 2x`}
                            alt={name}
                        />
                    </picture>
                ) : (
                    <img className={styles.image} src={image} alt={name} />
                )}
            </RootLink>
            {name && <h2 className={styles.name}>{name}</h2>}
            {subname && <p className={styles.subname}>{subname}</p>}
            {colors.length ? (
                <div className={styles.colors}>
                    <Colors value={color} list={colors} onChange={value => handleChangeColor(value)} />
                    {/* <AddToFave className={styles.fave} id={id} faved={false} /> */}
                </div>
            ) : null}
            {price && (
                <button type="button" className={styles.button} onClick={() => onClick({ id, color })}>
                    <FormattedMessage id="add" />: <FormattedMessage id="currency" values={{ price }} />
                </button>
            )}
        </div>
    );
};

ProductCard.defaultProps = {
    id: null,
    price: null,
    items: [],
    name: null,
    subname: null,
    onClick: () => {},
    image: null,
    seo: {},
};

ProductCard.propTypes = {
    id: PropTypes.number,
    price: PropTypes.number,
    url: PropTypes.string.isRequired,
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    subname: PropTypes.string,
    onClick: PropTypes.func,
    image: PropTypes.string,
    seo: PropTypes.shape({
        showPlace: PropTypes.string,
        position: PropTypes.number,
    }),
};

export default ProductCard;
