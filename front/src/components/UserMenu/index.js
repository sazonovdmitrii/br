import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import {
    Search as SearchIcon,
    MapPin as MapPinIcon,
    User as UserIcon,
    ShoppingCart as ShoppingCartIcon,
} from 'react-feather';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames/bind';

import { useLangLinks, useApp, useFormatMessage, useOnClickOutside } from 'hooks';
import { IS_LOGGED_IN, GET_SHORT_BASKET } from 'query';

import Badge from 'components/Badge';
import SearchForm from 'components/SearchForm';

import styles from './styles.css';

const cx = classnames.bind(styles);

const UserMenu = () => {
    const [placeholder] = useFormatMessage([{ id: 'c_search_placeholder' }]);
    const { logout, login } = useApp();
    const { loading: loadingShortBasket, data: { basket } = {} } = useQuery(GET_SHORT_BASKET, { ssr: false });
    const { data: { isLoggedIn } = {} } = useQuery(IS_LOGGED_IN);
    const [reailsLink, accountLink, signInLink, profileLink, favoritesLink, ordersLink] = useLangLinks([
        '/retail',
        '/account',
        '/account/login',
        '/account/personal',
        '/account/favorites',
        '/account/orders',
    ]);
    const [showSearch, setShowSearch] = useState(false);
    const [openSubMenu, setOpenSubMenu] = useState(false);
    const submenuNode = useRef(null);

    useOnClickOutside(submenuNode, () => {
        handleCloseSubMenu();
    });

    const handleLogOut = () => {
        logout();
        setOpenSubMenu(false);
    };

    const handleOpenSubMenu = () => {
        setOpenSubMenu(!openSubMenu);
    };

    const handleCloseSubMenu = () => {
        setOpenSubMenu(false);
    };

    const submenuClassName = cx(styles.submenu, { open: openSubMenu });

    return (
        <>
            <SearchForm
                title={`${placeholder} Brillenhof`}
                placeholder={placeholder}
                show={showSearch}
                onClose={() => setShowSearch(false)}
            />
            <ul className={styles.root}>
                <li className={styles.item}>
                    <div className={styles.icon}>
                        <button
                            type="button"
                            className={styles.link}
                            onClick={() => setShowSearch(!showSearch)}
                        >
                            <SearchIcon size="20" />
                        </button>
                    </div>
                </li>
                <li className={styles.line} />
                <li className={styles.itemWithText}>
                    <div className={styles.icon}>
                        <Link to={reailsLink} className={styles.link}>
                            <MapPinIcon size="20" />
                        </Link>
                    </div>
                    <div className={styles.text}>
                        <Link to={reailsLink}>
                            <FormattedMessage id="locations" />
                        </Link>
                    </div>
                </li>
                {isLoggedIn ? (
                    <li className={styles.itemWithText}>
                        <div className={styles.icon}>
                            <Link to={accountLink} className={styles.link}>
                                <UserIcon size="20" />
                            </Link>
                        </div>
                        <div className={styles.text}>
                            <button type="button" onClick={handleOpenSubMenu}>
                                <FormattedMessage id="account" />
                            </button>
                        </div>
                        <ul ref={submenuNode} className={submenuClassName}>
                            <li className={styles.submenuItem}>
                                <Link
                                    className={styles.submenuLink}
                                    to={accountLink}
                                    onClick={handleCloseSubMenu}
                                >
                                    <FormattedMessage id="home" />
                                </Link>
                            </li>
                            <li className={styles.submenuItem}>
                                {/* <Link
                                    className={styles.submenuLink}
                                    to={profileLink}
                                    onClick={handleCloseSubMenu}
                                >
                                    <FormattedMessage id="profile" />
                                </Link> */}
                            </li>
                            <li className={styles.submenuItem}>
                                {/* <Link
                                    className={styles.submenuLink}
                                    to={favoritesLink}
                                    onClick={handleCloseSubMenu}
                                >
                                    <FormattedMessage id="favorites" />
                                </Link> */}
                            </li>
                            {/* <li className={styles.submenuItem}>
                                <Link
                                    className={styles.submenuLink}
                                    to={ordersLink}
                                    onClick={handleCloseSubMenu}
                                >
                                    <FormattedMessage id="orders" />
                                </Link>
                            </li> */}
                            <li className={styles.submenuItem}>
                                <Link className={styles.submenuLink} onClick={handleLogOut}>
                                    <FormattedMessage id="sign_out" />
                                </Link>
                            </li>
                        </ul>
                    </li>
                ) : (
                    <li className={styles.itemWithText}>
                        <div className={styles.icon}>
                            <Link to={signInLink} className={styles.link}>
                                <UserIcon size="20" />
                            </Link>
                        </div>
                        <div className={styles.text}>
                            <Link to={signInLink}>
                                <FormattedMessage id="sign_in" />
                            </Link>
                        </div>
                    </li>
                )}
                <li className={styles.item}>
                    <div className={styles.icon}>
                        <Link to="/cart">
                            {!loadingShortBasket && basket && basket.products.length ? (
                                <Badge badgeContent={basket.products.length} kind="primary">
                                    <ShoppingCartIcon size="20" />
                                </Badge>
                            ) : (
                                <ShoppingCartIcon size="20" />
                            )}
                        </Link>
                    </div>
                </li>
            </ul>
        </>
    );
};

export default UserMenu;
