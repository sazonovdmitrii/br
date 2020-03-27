import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useApp } from 'hooks';
import { LOGIN_MUTATION } from 'mutations';

import LoginForm from './LoginForm';

export default ({ onCompleted }) => {
    const { createNotification, login } = useApp();
    const [auth] = useMutation(LOGIN_MUTATION, {
        onCompleted({ auth: { hash } }) {
            if (hash) {
                if (onCompleted) onCompleted();

                login(hash);
            }
        },
        onError({ graphQLErrors: [{ message }] }) {
            createNotification({ type: 'error', message });
        },
    });

    return <LoginForm onSubmit={auth} />;
};
