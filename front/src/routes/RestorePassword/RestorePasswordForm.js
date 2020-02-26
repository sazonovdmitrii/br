import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'react-feather';
import { useMutation } from '@apollo/react-hooks';

import { useFormatMessage, useApp } from 'hooks';
import { CHANGE_PASSWORD_MUTATION } from 'mutations';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import Title from 'components/Title';

import styles from './styles.css';

const RestorePasswordForm = ({ token }) => {
    const { createNotification } = useApp();
    const [metaTitle] = useFormatMessage([{ id: 'p_remind_password_meta_title' }]);
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
        </>
    );
};

RestorePasswordForm.defaultProps = {};

export default RestorePasswordForm;
