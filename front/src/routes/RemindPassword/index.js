import React from 'react';

import Title from 'components/Title';
import Link from 'components/Link';
import RemindPasswordForm from 'components/RemindPasswordForm';
import styles from './styles.css';

export default () => (
    <div className={styles.root}>
        <div className={styles.header}>
            <Title>How do I reset my password?</Title>
            <div class={styles.subTitle}>
                Enter your email and we’ll send you a link with instructions to reset your password :-)
            </div>
        </div>
        <RemindPasswordForm />
        <Link to="/account/login">Go back to sign in</Link>
    </div>
);
