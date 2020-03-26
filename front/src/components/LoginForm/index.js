import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useApp } from 'hooks';

import LoginForm from './LoginForm';

const LOGIN_MUTATION = gql`
    mutation($input: UserInput!) {
        auth(input: $input) {
            email
            hash
        }
    }
`;

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
