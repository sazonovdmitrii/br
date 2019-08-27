import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { ShoppingBag as ShoppingBagIcon, User as UserIcon } from 'react-feather';

import { IS_LOGGED_IN, GET_SHORT_BASKET } from 'query';
import { useApp } from 'hooks';

import BasketShort from 'components/BasketShort';
import Button from 'components/Button';
import Badge from 'components/Badge';

import styles from './styles.css';

const UserMenu = () => {
    const { logout, login } = useApp();
    const {
        data: { isLoggedIn },
    } = useQuery(IS_LOGGED_IN);
    const { loading, error, data: { basket } = {} } = useQuery(GET_SHORT_BASKET, { ssr: false });

    const handleLogOut = () => {
        logout();
    };

    return (
        <ul className={styles.root}>
            {isLoggedIn ? (
                <li className={styles.item}>
                    <Link className={styles.link} to="/user/personal/">
                        <div className={styles.icon}>
                            <UserIcon size="20" />
                        </div>
                    </Link>
                    <ul className={styles.submenu}>
                        <li className="usermenu__subitem">
                            <Link className="usermenu__sublink" to="/user/personal">
                                Персональные данные
                            </Link>
                        </li>
                        <li className="usermenu__subitem">
                            <Link className="usermenu__sublink" to="/user/addressbook">
                                Адресная книга
                            </Link>
                        </li>
                        <li className="usermenu__subitem">
                            <Link className="usermenu__sublink" to="/user/orders">
                                Ваши заказы
                            </Link>
                        </li>
                        <li className="usermenu__subitem">
                            <Button
                                className="usermenu__sublink"
                                kind="primary"
                                size="small"
                                onClick={handleLogOut}
                                outlined
                            >
                                Выход
                            </Button>
                        </li>
                    </ul>
                </li>
            ) : (
                <li className={styles.item}>
                    <Link type="button" className={styles.link} to="/account/login">
                        <div className={styles.icon}>
                            <UserIcon size="20" />
                        </div>
                    </Link>
                </li>
            )}
            <li className={styles.item}>
                {loading || error ? null : (
                    <Link className={styles.link} to="/basket">
                        <div className={styles.icon}>
                            <Badge badgeContent={basket.products.length} kind="primary">
                                <ShoppingBagIcon size="20" />
                            </Badge>
                        </div>
                    </Link>
                )}
            </li>
        </ul>
    );
};

UserMenu.propTypes = {};

export default UserMenu;
