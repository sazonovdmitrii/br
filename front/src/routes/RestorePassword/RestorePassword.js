import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { useMutation } from '@apollo/react-hooks';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'react-feather';

import { withErrorBoundary } from 'hoc';
import { useLangLinks, useFormatMessage, useApp } from 'hooks';
import { CHECK_TOKEN_MUTATION, CHANGE_PASSWORD_MUTATION } from 'mutations';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import Title from 'components/Title';
import Link from 'components/Link';
import RestorePasswordForm from 'components/RestorePasswordForm';

import styles from './styles.css';

export default withErrorBoundary(() => {
    const { token } = useParams();
    const { createNotification } = useApp();
    const [validToken, setValidToken] = useState(false);
    const [metaTitle, passwordsDontMatch] = useFormatMessage([
        { id: 'p_remind_password_meta_title' },
        { id: 'p_restore_password_dont_match' },
    ]);
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

    if (validToken) {
        const [password, setPassword] = useState(null);
        const [showPassword, setShowPassword] = useState(false);
        const [changePassword] = useMutation(CHANGE_PASSWORD_MUTATION, {
            variables: {
                input: {
                    token,
                    password,
                },
            },
            onCompleted({ changePassword: { message } }) {
                createNotification({ type: 'success', message });
            },
            onError({ graphQLErrors: [{ message }] }) {
                createNotification({ type: 'error', message });
            },
        });
        const handleSubmit = event => {
            event.preventDefault();

            if (!password) return;

            changePassword();
        };

        return (
            <>
                <Helmet title={metaTitle} />
                <div className={styles.root}>
                    <div className={styles.header}>
                        <Title>
                            <FormattedMessage id="p_reset_password_title" />
                        </Title>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <InputGroup>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                label={<FormattedMessage id="new_password" />}
                                value={password}
                                rightButton={
                                    <button
                                        type="button"
                                        className={styles.showPasswordButton}
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </button>
                                }
                                onChange={({ target: { value } }) => {
                                    setPassword(value);
                                }}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Button type="submit" kind="primary" size="large" fullWidth bold>
                                <FormattedMessage id="p_reset_password_button" />
                            </Button>
                        </InputGroup>
                    </form>
                </div>
            </>
        );
    }

    return (
        <>
            <Helmet title={metaTitle} />
            <div className={styles.root}>
                <RestorePasswordForm />
                <Link to={loginLink}>
                    <FormattedMessage id="p_restore_password_login_link" />
                </Link>
            </div>
        </>
    );
});
