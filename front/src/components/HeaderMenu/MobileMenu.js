import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';

import styles from './mobile.css';

const cx = classnames.bind(styles);

const Item = ({ image, items, active, text, url, onLink, onClick, value }) => {
    const submenuClassName = cx(styles.submenu, {
        active,
    });
    const buttonClassName = cx(styles.button, {
        active,
    });
    const buttonLabelClassName = cx(styles.buttonLabel, {
        active,
    });

    return (
        <li className={styles.item}>
            {items.length ? (
                <>
                    <button type="button" className={buttonClassName} onClick={() => onClick(value)}>
                        <div className={buttonLabelClassName}>{text}</div>
                        <div
                            className={styles.buttonImage}
                            style={{
                                backgroundImage: `url("${image}")`,
                            }}
                        />
                    </button>
                    <div className={submenuClassName} onClick={() => onClick(null)}>
                        <div className={styles.submenuText}>
                            Starting at $95, including prescription lenses
                        </div>
                        <div className={styles.childrens}>
                            {items.map(child => (
                                <div key={child.url} className={styles.childCol}>
                                    <Link className={styles.childLink} to={child.url} onClick={onLink}>
                                        <span className={styles.childText}>{child.text}</span>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            ) : (
                <Link className={styles.button} to={url}>
                    <div className={styles.buttonLabel}>{text}</div>
                    <div
                        className={styles.buttonImage}
                        style={{
                            backgroundImage: `url("${image}")`,
                        }}
                    />
                </Link>
            )}
        </li>
    );
};

const MobileMenu = ({ items, active: activeProps, onClick }) => {
    const [activeItem, setActiveItem] = useState(null);
    const rootClassName = cx(styles.root, { active: activeProps });
    const rootNode = useRef(null);

    if (!items.length || typeof document === 'undefined') return null;

    const domNode = document.body;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (activeProps) {
            if (window.innerWidth !== rootNode.current.clientWidth) {
                domNode.style.paddingRight = '15px';
            }
            domNode.style.overflow = 'hidden';
        }

        return () => {
            domNode.style = null;
        };
    }, [activeProps, domNode.style]);

    return (
        <div ref={rootNode} className={rootClassName}>
            <div className={styles.inner}>
                <ul className={styles.menu}>
                    {items.map(({ text, url, children, image }, index) => {
                        const active = activeItem === index;

                        return (
                            <Item
                                key={index}
                                value={index}
                                active={active}
                                text={text}
                                url={url}
                                items={children}
                                image={image}
                                onClick={value => {
                                    setActiveItem(value);
                                }}
                                onLink={onClick}
                            />
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
    items: PropTypes.arrayOf(PropTypes.object),
};

export default MobileMenu;
