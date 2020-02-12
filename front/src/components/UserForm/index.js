import React from 'react';
import { useMutation } from '@apollo/react-hooks';

import { useApp } from 'hooks';
import { CREATE_USER_MUTATION, UPDATE_USER_MUTATION } from 'mutations';

import UserForm from './UserForm';

export default ({ type, onSubmit = () => {}, onCompleted = () => {}, data = {} }) => {
    const { createNotification, login } = useApp();

    if (type === 'registration') {
        const [createUser] = useMutation(CREATE_USER_MUTATION, {
            onCompleted({ register: { hash } }) {
                if (hash) {
                    login(hash);
                    onCompleted();
                }
            },
            onError({ graphQLErrors: [{ message }] }) {
                createNotification({ type: 'error', message });
            },
        });

        return (
            <UserForm
                type={type}
                onSubmit={({ firstname, lastname, phone, email, password, gender }) => {
                    createUser({
                        variables: {
                            input: {
                                firstname,
                                lastname,
                                phone,
                                email,
                                password,
                                gender,
                                confirm_password: password,
                            },
                        },
                    });
                }}
            />
        );
    }

    const [updateUser] = useMutation(UPDATE_USER_MUTATION, {
        onCompleted({ register: { hash } }) {
            if (hash) {
                createNotification({ type: 'success', message: 'Успешно обновленно' });
            }
        },
        onError({ graphQLErrors: [{ message }] }) {
            createNotification({ type: 'error', message });
        },
    });

    return (
        <UserForm
            type={type}
            data={data}
            onSubmit={({ firstname, lastname, phone, gender }) => {
                updateUser({
                    variables: {
                        input: {
                            id: data.id,
                            firstname,
                            lastname,
                            phone,
                            gender,
                        },
                    },
                });
            }}
        />
    );
};
