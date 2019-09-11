import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const VideSection = ({ title, poster, video, actions }) => (
    <div className={styles.root}>
        <video className={styles.video} poster={poster} src={video} playsInline autoPlay loop />
        <div className={styles.text}>
            <h1 className={styles.title}>{title}</h1>
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    </div>
);

VideSection.defaultProps = {};

VideSection.propTypes = {};

export default VideSection;
