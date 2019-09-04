import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Colors from 'components/Colors';

import Loader from './Loader';
import styles from './styles.css';

const ProductCard = ({
    id,
    url,
    items = [],
    sale,
    secondary_image,
    primary_image,
    brand_name,
    texts = {},
    cantbuy,
    min_price,
    name,
    loading,
    price,
}) => {
    const [color, setColor] = useState(1);
    const image = items.edges[0].node.productItemImages[0].length
        ? `${isProd ? '' : 'http://br.morphes.ru'}${items.edges[0].node.productItemImages[0].path}`
        : 'https://placehold.it/377x167';

    if (loading) return <Loader />;

    return (
        <div className={styles.root}>
            <Link to={url} className={styles.imageWrapper} title={`Очки ${name}`}>
                <img className={styles.image} src={image} alt={`Очки ${name}`} />
            </Link>
            <h2 className={styles.title}>{name}</h2>
            <div className={styles.colors}>
                <Colors
                    value={color}
                    list={[
                        { id: 1, image: 'https://placehold.it/20x20/000' },
                        { id: 2, image: 'https://placehold.it/20x20/ccc' },
                        { id: 3, image: 'https://placehold.it/20x20/rrr' },
                    ]}
                    onChange={value => setColor(value)}
                />
                {/*<AddToFave className={styles.fave} id={id} faved={false} />*/}
            </div>
        </div>
    );
};

ProductCard.defaultProps = {
    url: '',
    items: {
        edges: [],
    },
    sale: null,
    secondary_image: null,
    primary_image: null,
    brand_name: '',
    name: '',
    texts: {},
    cantbuy: 0,
    min_price: 0,
};

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    url: PropTypes.string.isRequired,
    items: PropTypes.shape({
        edges: PropTypes.arrayOf(PropTypes.object),
    }),
    sale: PropTypes.objectOf(PropTypes.string),
};

export default ProductCard;
