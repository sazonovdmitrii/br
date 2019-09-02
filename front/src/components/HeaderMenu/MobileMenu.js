import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
                        const activeItem = activeItem === index;
                        const submenuClassName = cx(styles.submenu, {
                            active: activeItem,
                        });
                        const buttonClassName = cx(styles.button, {
                            active: activeItem,
                        });
                        const buttonLabelClassName = cx(styles.buttonLabel, {
                            active: activeItem,
                        });

                        return (
                            <li key={url} className={styles.item} ref={children.length ? overlayNode : null}>
                                {children.length ? (
                                    <>
                                        <button
                                            type="button"
                                            className={buttonClassName}
                                            onClick={setActiveItem(active ? null : index)}
                                        >
                                            <div className={buttonLabelClassName}>{text}</div>
                                            <div
                                                className={styles.buttonImage}
                                                style={{
                                                    backgroundImage: `url("https://i.warbycdn.com/v/c/assets/mobile-side-menu/image/hto/0/c49199cb26.jpg")`,
                                                }}
                                            />
                                        </button>
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
                                    </>
                                ) : (
                                    <Link className={styles.button} to={url}>
                                        <div className={styles.buttonLabel}>{text}</div>
                                        <div
                                            className={styles.buttonImage}
                                            style={{
                                                backgroundImage: `url("https://i.warbycdn.com/v/c/assets/mobile-side-menu/image/hto/0/c49199cb26.jpg")`,
                                            }}
                                        />
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

MobileMenu.defaultProps = {
    items: [],
};

MobileMenu.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
};

export default MobileMenu;
