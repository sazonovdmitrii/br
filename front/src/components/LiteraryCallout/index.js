import React from 'react';
import PropTypes from 'prop-types';

import Title from 'components/Title';

import styles from './styles.css';

const LiteraryCallout = ({ title, text, image }) => (
    <div className={styles.root}>
        <div className={styles.imageWrapper}>
            <picture>
                {image.webp && (
                    <source type="image/webp" srcSet={`${image.webp.original} 1x, ${image.webp.retina} 2x`} />
                )}
                <img
                    className={styles.fooImage}
                    src={image.root.original}
                    srcSet={`${image.root.retina} 2x`}
                    alt=""
                />
            </picture>
        </div>
        {(title || text) && (
            <div className={styles.content}>
                {title && <Title className={styles.title}>{title}</Title>}
                {text && <div className={styles.text}>{text}</div>}
            </div>
        )}
    </div>
);

LiteraryCallout.defaultProps = {};

LiteraryCallout.propTypes = {};

export default LiteraryCallout;
