import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { useMutation } from '@apollo/react-hooks';

import { withErrorBoundary } from 'hoc';
import { useLangLinks, useFormatMessage, useApp } from 'hooks';
import { CHECK_TOKEN_MUTATION } from 'mutations';

import ForgotPasswordForm from 'components/ForgotPasswordForm';
import Link from 'components/Link';

import RestorePasswordForm from './RestorePasswordForm';

import styles from './styles.css';

export default withErrorBoundary(() => {
    const { token } = useParams();
    const { createNotification } = useApp();
    const [validToken, setValidToken] = useState(false);
    const [metaTitle] = useFormatMessage([{ id: 'p_remind_password_meta_title' }]);
    const [loginLink] = useLangLinks(['/account/login']);

    if (token) {
        const [checkToken] = useMutation(CHECK_TOKEN_MUTATION, {
            variables: {
                input: {
                    token,
                },
            },
            onCompleted() {
                setValidToken(true);
            },
            onError({ graphQLErrors: [{ message }] }) {
                createNotification({ type: 'error', message });
            },
        });

        useEffect(() => {
            checkToken(token);
        }, []);
    }

    return (
        <>
            <Helmet title={metaTitle} />
            <div className={styles.root}>
                {validToken ? (
                    <RestorePasswordForm token={token} />
                ) : (
                    <>
                        <ForgotPasswordForm />
                        <Link to={loginLink}>
                            <FormattedMessage id="p_restore_password_login_link" />
                        </Link>
                    </>
                )}
            </div>
        </>
    );
});
