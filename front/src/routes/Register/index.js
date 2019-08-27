import React from 'react';

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
                <Title>Nice to meet you!</Title>
            </div>
            <UserForm type="registration" onCompleted={handleCompleted} />
            <hr className={styles.hr} />
            <Title className={styles.title}>I have an account</Title>
            <Link to="/account/login" className={styles.link}>
                Sign in
            </Link>
        </div>
    );
};
