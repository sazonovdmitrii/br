import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Link = ({ children, to, className, href, onClick, target, rel: relProps }) => {
    const Component = onClick ? 'button' : href ? 'a' : RouterLink;
    const linkClassName = cx(styles.root, className);
    const rel = target === '_blank' ? 'noopener noreferrer' : relProps;

    return (
        <Component className={linkClassName} href={href} to={to} onClick={onClick} target={target} rel={rel}>
            {children}
        </Component>
    );
};

Link.defaultProps = {
    rel: null,
    target: null,
    onClick: null,
    href: null,
    to: null,
};

Link.propTypes = {
    rel: PropTypes.string,
    target: PropTypes.string,
    onClick: PropTypes.func,
    href: PropTypes.string,
    to: PropTypes.string,
};

export default Link;
