import React, { useState } from 'react';
import classnames from 'classnames';

import LoginForm from 'components/LoginForm';
import Button from 'components/Button';
import Title from 'components/Title';
import Link from 'components/Link';

import styles from './styles.css';

export default ({ history }) => {
    const handleCompleted = () => {
        history.push('/');
    };

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Title className={styles.title}>Sign in</Title>
            </div>
            <LoginForm onCompleted={handleCompleted} />
            <Link to="/account/remind-password" className={styles.link}>
                Forgot password?
            </Link>
            <hr className={styles.hr} />
            <Title className={styles.title}>I’m new here</Title>
            <Link to="/account/register" className={styles.link}>
                Create an account
            </Link>
        </div>
    );
};
