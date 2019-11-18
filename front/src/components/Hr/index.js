import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import styles from './styles.css';

const Hr = ({ className }) => {
    const rootClassName = classnames(styles.root, className);

    return <hr className={rootClassName} />;
};

Hr.defaultProps = {
    className: null,
};

Hr.propTypes = {
    className: PropTypes.string,
};

export default Hr;
