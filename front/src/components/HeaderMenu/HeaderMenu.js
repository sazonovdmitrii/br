import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './desktop.css';

const cx = classnames.bind(styles);

const HeaderMenu = ({ items }) => {
    const [state, setState] = useState({ active: null });

    const rootClassName = cx(styles.root, { active: state.active });
    const handleMouseEnter = index => {
        setState({ active: index });
    };
    const handleMouseLeave = () => {
        setState({ active: null });
    };

    if (!items.length) return null;

    return (
        <ul className={rootClassName}>
            {items.map(({ text, url, children }, index) => {
                const submenuClassName = cx(styles.submenu, {
                    active: state.active === index,
                });
                const linkClassName = cx(styles.link, {
                    active: state.active === index,
                });

                return (
                    <li key={url} className={styles.item}>
                        <button
                            type="button"
                            className={linkClassName}
                            onClick={() => handleMouseEnter(state.active === index ? null : index)}
                        >
                            {text}
                        </button>
                        {children.length ? (
                            <ul className={submenuClassName}>
                                {children.map(child => (
                                    <li key={child.url} className={styles.childCol}>
                                        <Link className={styles.childLink} to={child.url}>
                                            <span className={styles.childText}>{child.text}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : null}
                    </li>
                );
            })}
        </ul>
    );
};

HeaderMenu.defaultProps = {
    className: null,
    items: [],
};

HeaderMenu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
};

export default HeaderMenu;
