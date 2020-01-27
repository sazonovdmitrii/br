import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import { useLangLinks, useFormatMessage } from 'hooks';
import { withErrorBoundary } from 'hoc';

import Loader from 'components/Loader';
import LoginForm from 'components/LoginForm';
import Title from 'components/Title';
import Link from 'components/Link';

import styles from './styles.css';

export default withErrorBoundary(() => {
    const [metaTitle] = useFormatMessage([{ id: 'p_login_meta_title' }]);
    const history = useHistory();
    const [registerLink, restorePasswordLink] = useLangLinks([
        '/account/register',
        '/account/forgot-password',
    ]);

    const handleCompleted = () => {
        history.push('/');
    };

    return (
        <>
            <Helmet title={metaTitle} />
            <div className={styles.root}>
                <div className={styles.header}>
                    <Title className={styles.title}>
                        <FormattedMessage id="sign_in" />
                    </Title>
                </div>
                <LoginForm onCompleted={handleCompleted} />
                <Link to={restorePasswordLink} className={styles.link}>
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
        </>
    );
});
