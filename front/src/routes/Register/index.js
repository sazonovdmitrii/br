import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useApp } from 'hooks';

import Link from 'components/Link';
import Title from 'components/Title';
import UserForm from 'components/UserForm';

import styles from './styles.css';

export default ({ history }) => {
    const { login } = useApp();
    const handleCompleted = ({ register: { hash } }) => {
        login(hash);
        history.push('/');
    };

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Title>
                    <FormattedMessage id="nice_to_meet_you" />
                </Title>
            </div>
            <UserForm type="registration" onCompleted={handleCompleted} />
            <hr className={styles.hr} />
            <Title className={styles.title}>
                <FormattedMessage id="i_have_an_account" />
            </Title>
            <Link to="/account/login" className={styles.link}>
                <FormattedMessage id="sign_in" />
            </Link>
        </div>
    );
};
