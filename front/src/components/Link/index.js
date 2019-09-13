import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Link = ({ children, to, className, href }) => {
    const Component = href ? 'a' : RouterLink;
    const linkClassName = cx(styles.root, className);

    return (
        <Component className={linkClassName} href={href} to={to}>
            {children}
        </Component>
    );
};

Link.defaultProps = {};

Link.propTypes = {};

export default Link;
