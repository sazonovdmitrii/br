import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const ListItem = ({ classNames = {}, active, actions, description, meta, title, onClick, pointer }) => {
    const rootClassName = cx(styles.root, classNames.root, {
        active,
        pointer,
    });

    return (
        <div className={rootClassName} onClick={onClick}>
            <div className={styles.body}>
                <div className={styles.title}>{title}</div>
                {description && <div className={styles.description}>{description}</div>}
                {meta && <div className={styles.meta}>{meta}</div>}
            </div>
            {actions && <div className={styles.actions}>{actions}</div>}
        </div>
    );
};

ListItem.defaultProps = {
    active: false,
    pointer: false,
    actions: null,
    description: null,
    meta: null,
    onClick: null,
};

ListItem.propTypes = {
    onClick: PropTypes.func,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    active: PropTypes.bool,
    pointer: PropTypes.bool,
    actions: PropTypes.node,
};

export default ListItem;
