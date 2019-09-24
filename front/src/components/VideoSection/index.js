import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const VideoSection = ({ title, poster, video, actions }) => (
    <div className={styles.root}>
        <video className={styles.video} poster={poster} muted playsInline autoPlay loop>
            <source src={video} />
        </video>
        {title ||
            (actions && (
                <div className={styles.text}>
                    <h1 className={styles.title}>{title}</h1>
                    {actions && <div className={styles.actions}>{actions}</div>}
                </div>
            ))}
    </div>
);

VideoSection.defaultProps = {
    title: null,
    actions: null,
};

VideoSection.propTypes = {
    title: PropTypes.string,
    poster: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    actions: PropTypes.node,
};

export default VideoSection;
