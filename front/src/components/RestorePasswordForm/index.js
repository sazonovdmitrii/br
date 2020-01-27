import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FormattedMessage } from 'react-intl';

import { useApp } from 'hooks';
import { RESTORE_PASSWORD } from 'mutations';

import Input from 'components/Input';
import Title from 'components/Title';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';

import styles from './styles.css';

const RestorePassword = () => {
    const { createNotification } = useApp();
    const [email, setEmail] = useState('');
    const [restorePassword] = useMutation(RESTORE_PASSWORD, {
        variables: {
            input: {
                login: email,
            },
        },
        onCompleted({ restore: { success, message } }) {
            createNotification({ type: success ? 'success' : 'error', message });
        },
        onError({ graphQLErrors: [{ message }] }) {
            createNotification({ type: 'error', message });
        },
    });
    const handleSubmit = event => {
        event.preventDefault();

        if (!email) return;

        restorePassword();
    };

    return (
        <>
            <div className={styles.header}>
                <Title>
                    <FormattedMessage id="c_restore_password_title" />
                </Title>
                <div className={styles.subTitle}>
                    <FormattedMessage id="c_restore_password_subtitle" />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input
                        name="email"
                        type="email"
                        label={<FormattedMessage id="email" />}
                        value={email}
                        onChange={({ target: { value } }) => setEmail(value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <Button type="submit" kind="primary" size="large" fullWidth bold>
                        <FormattedMessage id="c_restore_password_button" />
                    </Button>
                </InputGroup>
            </form>
        </>
    );
};

export default RestorePassword;
