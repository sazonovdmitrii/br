import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import classnames from 'classnames/bind';

import { useOnClickOutside } from 'hooks';

import styles from './mobile.css';

const cx = classnames.bind(styles);

const Item = ({ image, children, active, text, url, onLink, onClick }) => {
    const overlayNode = useRef(null);

    useOnClickOutside(overlayNode, () => {
        setActiveItem(null);
    });
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
        <li className={styles.item} ref={children.length ? overlayNode : null}>
            {children.length ? (
                <>
                    <button type="button" className={buttonClassName} onClick={onClick}>
                        <div className={buttonLabelClassName}>{text}</div>
                        <div
                            className={styles.buttonImage}
                            style={{
                                backgroundImage: `url("${image}")`,
                            }}
                        />
                    </button>
                    <div className={submenuClassName}>
                        <div className={styles.submenuText}>
                            Starting at $95, including prescription lenses
                        </div>
                        {children.map(child => (
                            <div key={child.url} className={styles.childCol}>
                                <Link className={styles.childLink} to={child.url} onClick={onLink}>
                                    <span className={styles.childText}>{child.text}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <a className={styles.button} href={url}>
                    <div className={styles.buttonLabel}>{text}</div>
                    <div
                        className={styles.buttonImage}
                        style={{
                            backgroundImage: `url("${image}")`,
                        }}
                    />
                </a>
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
                                active={active}
                                text={text}
                                url={url}
                                children={children}
                                image={image}
                                onClick={active ? null : () => setActiveItem(index)}
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
