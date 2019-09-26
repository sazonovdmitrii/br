import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useLangLink } from 'hooks';
import { isProd } from 'utils';

import Colors from 'components/Colors';

// import Loader from './Loader';
import styles from './styles.css';

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
                : 'https://placehold.it/377x167')
    );
    const handleChangeColor = value => {
        const {
            node: { productItemImages },
        } = items.find(({ node }) => node.id === value);

        setImage(productItemImages[0].path);
        setColor(value);
    };

    if (loading) return null;

    const $Link = url ? Link : 'div';

    return (
        <div className={styles.root}>
            <$Link to={url} className={styles.imageWrapper} title={name}>
                <img className={styles.image} src={image} alt={name} />
            </$Link>
            <h2 className={styles.title}>{name}</h2>
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
    items: [],
    onClick: () => {},
};

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object),
    onClick: PropTypes.func,
};

export default ProductCard;
