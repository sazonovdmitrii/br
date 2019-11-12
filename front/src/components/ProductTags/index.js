import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const ProductTags = ({ items, image }) => (
    <div className={styles.root}>
        {items.length ? (
            <div className={styles.list}>
                <ul>
                    {items.map((tag, index) => {
                        if (!tag.name || !tag.value) return null;

                        return (
                            <li key={index} className={styles.listItem}>
                                <span className={styles.listLabel}>{tag.name}</span>
                                <span className={styles.listValue}>{tag.value}</span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        ) : null}
        {image && (
            <div className={styles.imageContainer}>
                <picture>
                    <source srcSet={`${image.middle.webp} 1x, ${image.big.webp} 2x`} type="image/webp" />
                    <img
                        className={styles.image}
                        src={image.middle.original}
                        srcSet={`${image.big.original} 2x`}
                        alt=""
                    />
                </picture>
            </div>
        )}
    </div>
);

ProductTags.defaultProps = {
    items: [],
    image: null,
};

ProductTags.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
};

export default ProductTags;
