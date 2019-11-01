import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const Benefit = ({ title, image, text }) => (
    <div class={styles.root}>
        {image && <img class={styles.image} src={image} alt="" />}
        <h3 class={styles.title}>{title}</h3>
        <p class={styles.text}>{text}</p>
    </div>
);

Benefit.defaultProps = {
    image: null,
};

Benefit.propTypes = {
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    text: PropTypes.string.isRequired,
};

export default Benefit;
