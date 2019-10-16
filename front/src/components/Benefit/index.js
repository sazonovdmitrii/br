import React from 'react';

import styles from './styles.css';

const Benefit = ({ image, imageRetina, title, text }) => {
    const srcSet = imageRetina ? `${imageRetina} 2x` : null;

    return (
        <div>
            <img className={styles.image} srcSet={srcSet} src={image} alt="" />
            <p className={styles.title}>{title}</p>
            <p className={styles.text}>{text}</p>
        </div>
    );
};

export default Benefit;
