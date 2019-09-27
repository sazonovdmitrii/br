import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { Search as SearchIcon, MapPin as MapPinIcon } from 'react-feather';
import { FormattedMessage } from 'react-intl';

import { useLangLinks, useApp } from 'hooks';
import { IS_LOGGED_IN } from 'query';

import Button from 'components/Button';
import SearchForm from 'components/SearchForm';

import styles from './styles.css';

const UserMenu = () => {
    const [reailsLink, accountLink, signInLink] = useLangLinks(['/retail', '/account', '/account/login']);
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
            </ul>
        </>
    );
};

UserMenu.propTypes = {};

export default UserMenu;
