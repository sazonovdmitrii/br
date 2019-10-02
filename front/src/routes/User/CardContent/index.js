import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

const CardContent = ({ icon, title, text }) => (
    <div className={styles.root}>
        {icon && <div className={styles.icon}>{icon}</div>}
        <div className={styles.body}>
            <h2 className={styles.title}>{title}</h2>
            {text && <div>{text}</div>}
        </div>
    </div>
);

CardContent.defaultProps = {
    icon: null,
    text: null,
};

CardContent.propTypes = {
    icon: PropTypes.node,
    title: PropTypes.string.isRequired,
    text: PropTypes.string,
};

export default CardContent;
