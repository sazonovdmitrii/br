import React from 'react';
import PropTypes from 'prop-types';

import { createMarkup } from 'utils';

import styles from './styles.css';

const Rail = ({ name, price, description, onClick }) => (
    <button type="button" className={styles.root} onClick={onClick}>
        <div className={styles.head}>
            <div className={styles.pill}>{name}</div>
            {price && <p className={styles.price}>{price}</p>}
        </div>
        {description && (
            <div className={styles.description} dangerouslySetInnerHTML={createMarkup(description)} />
        )}
    </button>
);

Rail.defaultProps = {
    name: null,
    price: null,
    description: null,
    onClick: () => {},
};

Rail.propTypes = {
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
    description: PropTypes.string,
    onClick: PropTypes.func,
};

export default Rail;
