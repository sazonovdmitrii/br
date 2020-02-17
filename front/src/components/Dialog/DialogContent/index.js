import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.css';

const DialogContent = ({ children, className }) => {
    const contentClassName = classnames(styles.content, className);

    return <div className={contentClassName}>{children}</div>;
};

DialogContent.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DialogContent;
