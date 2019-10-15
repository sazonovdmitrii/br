import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';

import styles from './desktop.css';
import homeTryImage from './images/hometry.jpg';

const cx = classnames.bind(styles);

const HeaderMenu = ({ items }) => {
    const [state, setState] = useState({ open: false, active: null });
    const rootClassName = cx(styles.root, { active: state.open });
    const overlayClassName = cx(styles.overlay, { show: state.open });

    if (!items.length) return null;

    const handleClose = () => {
        setState({ active: null, open: false });
    };

    const homeTryId = 'homeTry';
    const homeTryActive = state.active === homeTryId;
    const homeTryLinkClassName = cx(styles.link, {
        active: homeTryActive,
    });
    const homeTrySubmenuClassName = cx(styles.submenu, styles.homeTrySubmenu, {
        active: homeTryActive,
    });

    return (
        <ul className={rootClassName}>
            <li className={overlayClassName} onClick={handleClose} />
            {items.map(({ text, url, children }, index) => {
                const activeItem = state.active === index;
                const submenuClassName = cx(styles.submenu, {
                    active: activeItem,
                });
                const linkClassName = cx(styles.link, {
                    active: activeItem,
                });

                return (
                    <li key={index} className={styles.item}>
                        {children.length ? (
                            <>
                                <button
                                    type="button"
                                    className={linkClassName}
                                    onClick={() =>
                                        setState({
                                            open: !activeItem,
                                            active: activeItem ? null : index,
                                        })
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
                                                onClick={handleClose}
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
            <li className={styles.item}>
                <button
                    type="button"
                    className={homeTryLinkClassName}
                    onClick={() =>
                        setState({
                            open: !homeTryActive,
                            active: homeTryActive ? null : homeTryId,
                        })
                    }
                >
                    <FormattedMessage id="home_try_on" />
                </button>
                <div className={homeTrySubmenuClassName}>
                    <div
                        className={styles.homeTryImage}
                        style={{
                            backgroundImage: `url(${homeTryImage})`,
                        }}
                     />
                    <div className={styles.homeTryText}>
                        <h2 className={styles.homeTryTitle}>
                            <FormattedMessage id="header_home_try_title" />
                        </h2>
                        <ul className={styles.homeTryActions}>
                            <Button
                                kind="simple"
                                size="large"
                                onClick={() => setState({ open: true, active: 0 })}
                                bold
                            >
                                <FormattedMessage id="shop_eyeglasses" />
                            </Button>
                            <Button
                                kind="simple"
                                size="large"
                                onClick={() => setState({ open: true, active: 1 })}
                                bold
                            >
                                <FormattedMessage id="shop_sunglasses" />
                            </Button>
                        </ul>
                    </div>
                </div>
            </li>
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
