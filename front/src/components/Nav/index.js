import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Nav = ({ value, onClick, items }) => (
    <div className={styles.root}>
        <div className={styles.inner}>
            {items.map(([id, { name }]) => {
                const linkClassName = cx(styles.link, {
                    active: id === value,
                });

                return (
                    <button key={id} type="button" className={linkClassName} onClick={() => onClick(id)}>
                        {name}
                    </button>
                );
            })}
        </div>
    </div>
);

Nav.defaultProps = {
    items: [],
    value: null,
    onClick: () => {},
};

Nav.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    value: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
    onClick: PropTypes.func,
};

export default Nav;
