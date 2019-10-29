import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Colors from 'components/Colors';

import styles from './styles.css';
import placeholderImage from './images/placeholder.png';

const ProductCard = ({ id, url, items, name, loading, price, image: imageProps, onClick }) => {
    const colors = items.reduce((array, item) => {
        const [{ image }] = item.node.productItemTagItems;

        return array.concat({ id: item.node.id, image });
    }, []);
    const [color, setColor] = useState(colors.length ? colors[0].id : null);
    const [image, setImage] = useState(
        imageProps ||
            (items.length && items[0].node.productItemImages.length
                ? items[0].node.productItemImages[0].path
                : placeholderImage)
    );
    const handleChangeColor = value => {
        const {
            node: { productItemImages },
        } = items.find(({ node }) => node.id === value);
        const newImage = productItemImages.length ? productItemImages[0].path : placeholderImage;

        setImage(newImage);
        setColor(value);
    };

    if (loading) return null;

    const RootLink = url ? Link : 'div';

    return (
        <div className={styles.root}>
            <RootLink to={url} className={styles.imageWrapper} title={name}>
                <img className={styles.image} src={image} alt={name} />
            </RootLink>
            {name && <h2 className={styles.title}>{name}</h2>}
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
    loading: false,
    name: null,
    onClick: () => {},
    image: null,
};

ProductCard.propTypes = {
    id: PropTypes.number,
    price: PropTypes.number,
    url: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
    image: PropTypes.string,
};

export default ProductCard;
