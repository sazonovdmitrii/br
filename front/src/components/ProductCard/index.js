import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useLangLink } from 'hooks';
import { isProd } from 'utils';

import Colors from 'components/Colors';

// import Loader from './Loader';
import styles from './styles.css';

const ProductCard = ({ id, url: urlProps, items, name, loading, price }) => {
    const url = useLangLink(urlProps);
    const colors = items.edges.reduce((array, item) => {
        const [{ image }] = item.node.productItemTagItems;

        return array.concat({ id: item.node.id, image });
    }, []);
    const [color, setColor] = useState(colors.length ? colors[0].id : null);
    const [image, setImage] = useState(
        items.edges.length && items.edges[0].node.productItemImages.length
            ? items.edges[0].node.productItemImages[0].path
            : 'https://placehold.it/377x167'
    );
    const handleChangeColor = value => {
        const {
            node: { productItemImages },
        } = items.edges.find(({ node }) => node.id === value);

        setImage(productItemImages[0].path);
        setColor(value);
    };

    if (loading) return null;

    return (
        <div className={styles.root}>
            <Link to={url} className={styles.imageWrapper} title={name}>
                <img
                    className={styles.image}
                    src={`${isProd ? '' : 'http://br.morphes.ru'}${image}`}
                    alt={name}
                />
            </Link>
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.colors}>
                <Colors value={color} list={colors} onChange={value => handleChangeColor(value)} />
                {/* <AddToFave className={styles.fave} id={id} faved={false} /> */}
            </div>
        </div>
    );
};

ProductCard.defaultProps = {
    items: {
        edges: [],
    },
};

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    items: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.object),
    }),
};

export default ProductCard;
