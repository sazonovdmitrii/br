import React from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Color = ({ onClick, id, active, to, type, image }) => {
    const itemClassName = cx(styles.item, { active });
    const Root = onClick ? 'button' : Link;

    return (
        <Root
            type={type}
            to={to}
            className={itemClassName}
            style={{ backgroundImage: `url("${image}")` }}
            onClick={onClick}
        />
    );
};

export default Color;
