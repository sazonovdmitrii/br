import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Link = ({ children, to, className }) => {
    const linkClassName = cx(styles.root, className);

    return (
        <RouterLink className={linkClassName} to={to}>
            {children}
        </RouterLink>
    );
};

Link.defaultProps = {};

Link.propTypes = {};

export default Link;
