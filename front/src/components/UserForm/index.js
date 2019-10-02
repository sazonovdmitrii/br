import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useApp } from 'hooks';

import UserForm from './UserForm';

const CREATE_USER_MUTATION = gql`
    mutation register($input: RegisterInput!) {
        register(input: $input) {
            hash
        }
    }
`;

export default ({ type, onSubmit = () => {}, onCompleted = () => {}, data = {} }) => {
    if (type === 'registration') {
        const { login } = useApp();
        const [createUser] = useMutation(CREATE_USER_MUTATION, {
            onCompleted({ register: { hash } }) {
                login(hash);
                if (onCompleted) onCompleted();
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

    return <UserForm type={type} data={data} onSubmit={onSubmit} />;
};
