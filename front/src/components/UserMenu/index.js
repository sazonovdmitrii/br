import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { User as UserIcon, Search as SearchIcon, MapPin as MapPinIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { useLangLink, useApp } from 'hooks';
import { IS_LOGGED_IN } from 'query';

import Button from 'components/Button';
import SearchForm from 'components/SearchForm';

import styles from './styles.css';

const UserMenu = () => {
    const { logout, login } = useApp();
    const {
        data: { isLoggedIn },
    } = useQuery(IS_LOGGED_IN);
    const handleLogOut = () => {
        logout();
    };
    const reailsLink = useLangLink('/retail');
    const accountLink = useLangLink('/account');
    const signInLink = useLangLink('/account/login');
    const [showSearch, setShowSearch] = useState(false);

    return (
        <>
            <SearchForm show={showSearch} onClose={() => setShowSearch(false)} />
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
                            <Link to={accountLink}>
                                <FormattedMessage id="account" />
                            </Link>
                        </div>
                        <ul className={styles.submenu}>
                            <li className={styles.sbmenuItem}>
                                <Link to="/account/profile">Profile</Link>
                            </li>
                            <li className={styles.sbmenuItem}>
                                <Button kind="primary" size="small" onClick={handleLogOut} outlined>
                                    Sign out
                                </Button>
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
            </ul>
        </>
    );
};

UserMenu.propTypes = {};

export default UserMenu;
