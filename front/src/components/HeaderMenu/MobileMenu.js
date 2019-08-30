import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import classnames from 'classnames/bind';

import { useOnClickOutside } from 'hooks';

import styles from './mobile.css';

const cx = classnames.bind(styles);

const MobileMenu = ({ items, active }) => {
    const [activeItem, setActiveItem] = useState(null);
    const rootClassName = cx(styles.root, { active });
    const overlayNode = useRef(null);

    useOnClickOutside(overlayNode, () => {
        setActiveItem(null);
    });

    if (!items.length) return null;

    return (
        <div className={rootClassName}>
            <div className={styles.inner}>
                <ul className={styles.menu}>
                    {items.map(({ text, url, children }, index) => {
                        const submenuClassName = cx(styles.submenu, {
                            active: activeItem === index,
                        });
                        const buttonClassName = cx(styles.button, {
                            active: activeItem === index,
                        });
                        const buttonLabelClassName = cx(styles.buttonLabel, {
                            active: activeItem === index,
                        });

                        return (
                            <li key={url} className={styles.item} ref={children.length ? overlayNode : null}>
                                <button
                                    type="button"
                                    className={buttonClassName}
                                    onClick={children.length ? () => setActiveItem(index) : null}
                                >
                                    <div className={buttonLabelClassName}>{text}</div>
                                    <div
                                        className={styles.buttonImage}
                                        style={{
                                            backgroundImage: `url("https://i.warbycdn.com/v/c/assets/mobile-side-menu/image/hto/0/c49199cb26.jpg")`,
                                        }}
                                    />
                                </button>
                                {children.length ? (
                                    <div className={submenuClassName}>
                                        <div className={styles.submenuText}>
                                            Starting at $95, including prescription lenses
                                        </div>
                                        {children.map(child => (
                                            <div key={child.url} className={styles.childCol}>
                                                <Link className={styles.childLink} to={child.url}>
                                                    <span className={styles.childText}>{child.text}</span>
                                                </Link>
                                            </div>
                                        ))}
                                    </div>
                                ) : null}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

MobileMenu.defaultProps = {
    className: null,
    items: [],
};

MobileMenu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
};

export default MobileMenu;
