import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

import { useLangLinks } from 'hooks';

import LoginForm from 'components/LoginForm';
import Title from 'components/Title';
import Link from 'components/Link';

import styles from './styles.css';

export default () => {
    const history = useHistory();
    const [registerLink, remindPasswordLink] = useLangLinks([
        '/account/register',
        '/account/remind-password',
    ]);

    const handleCompleted = () => {
        history.push('/');
    };

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Title className={styles.title}>
                    <FormattedMessage id="sign_in" />
                </Title>
            </div>
            <LoginForm onCompleted={handleCompleted} />
            <Link to={remindPasswordLink} className={styles.link}>
                <FormattedMessage id="forgot_password" />?
            </Link>
            <hr className={styles.hr} />
            <Title className={styles.title}>
                <FormattedMessage id="im_new_here" />
            </Title>
            <Link to={registerLink} className={styles.link}>
                <FormattedMessage id="create_account" />
            </Link>
        </div>
    );
};
