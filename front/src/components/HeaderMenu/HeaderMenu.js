import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';

import styles from './desktop.css';

const cx = classnames.bind(styles);

const HeaderMenu = ({ items }) => {
    const [state, setState] = useState({ active: null });
    const rootClassName = cx(styles.root, { active: state.active });

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
                    <li key={index} className={styles.item}>
                        {children.length ? (
                            <>
                                <button
                                    type="button"
                                    className={linkClassName}
                                    onClick={() =>
                                        setState({ active: state.active === index ? null : index })
                                    }
                                >
                                    {text}
                                </button>
                                <ul className={submenuClassName}>
                                    {children.map(child => (
                                        <li key={child.url} className={styles.childCol}>
                                            <Link
                                                className={styles.childLink}
                                                to={child.url}
                                                style={{
                                                    backgroundImage: `url(${child.image})`,
                                                }}
                                                onClick={() => setState({ active: false })}
                                            >
                                                <span className={styles.childText}>{child.text}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <Link className={styles.link} to={url}>
                                {text}
                            </Link>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

HeaderMenu.defaultProps = {
    items: [],
};

HeaderMenu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
};

export default HeaderMenu;
