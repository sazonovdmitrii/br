import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Title = ({ children, className }) => {
    const rootClassName = cx(styles.root, className);

    return <div className={rootClassName}>{children}</div>;
};

Title.defaultProps = {};

Title.propTypes = {};

export default Title;
