import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { IS_LOGGED_IN } from 'query';

import NotFound from 'routes/NotFound';

import Title from 'components/Title';
import Button from 'components/Button';

import CardContent from './CardContent';
import styles from './styles.css';

import FavoritesIcon from './icons/favorites.svg';
import ProfileIcon from './icons/profile.svg';
import PrescriptionsIcon from './icons/prescriptions.svg';
import AddressesIcon from './icons/addresses.svg';

const User = () => {
    let {
        data: { isLoggedIn },
    } = useQuery(IS_LOGGED_IN);

    const handleLogoOut = () => {
        //
    };
    isLoggedIn = true;

    if (!isLoggedIn) return <NotFound />;

    return (
        <div className={styles.root}>
            <Helmet title="Account" />
            <div className={styles.container}>
                <div className={styles.header}>
                    <Title className={styles.title}>
                        <FormattedMessage id="account" />
                    </Title>
                </div>
                <section className={styles.cards}>
                    <Link to="/account/favorites" className={styles.card}>
                        <CardContent
                            title={<FormattedMessage id="favorites" />}
                            icon={<FavoritesIcon />}
                            text={<FormattedMessage id="favorites_text" />}
                        />
                    </Link>
                    <Link to="/account/prescriptions" className={styles.card}>
                        <CardContent
                            title={<FormattedMessage id="prescriptions" />}
                            icon={<PrescriptionsIcon />}
                            text="Manage prescriptions"
                        />
                    </Link>
                    <Link to="/account/addresses" className={styles.card}>
                        <CardContent
                            title={<FormattedMessage id="addresses" />}
                            icon={<AddressesIcon />}
                            text={<FormattedMessage id="addresses_text" />}
                        />
                    </Link>
                    <Link to="/account/profile" className={styles.card}>
                        <CardContent
                            title={<FormattedMessage id="profile" />}
                            icon={<ProfileIcon />}
                            text={<FormattedMessage id="profile_text" />}
                        />
                    </Link>
                </section>
                <p className={styles.footer}>
                    <Button onClick={handleLogoOut} kind="simple" bold>
                        <FormattedMessage id="log_out" />
                    </Button>
                </p>
            </div>
        </div>
    );
};

export default User;
