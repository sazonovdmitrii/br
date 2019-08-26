import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { useApp } from 'hooks';

import UserForm from './UserForm';

const GET_USER = gql`
    {
        user {
            email
        }
    }
`;

const CREATE_USER_MUTATION = gql`
    mutation register($input: RegisterInput!) {
        register(input: $input) {
            hash
        }
    }
`;

export default ({ type, onSubmit, onCompleted }) => {
    switch (type) {
        case 'personal':
            // return (
            //     <Mutation onCompleted={onCompleted}>
            //         {save => {
            //             return (
            //                 <Query query={GET_USER} ssr={false}>
            //                     {({ loading, error, data }) => {
            //                         console.log(data);

            return (
                <UserForm
                    type={type}
                    // data={data}
                    // onSubmit={() =>
                    //     save({
                    //         variables: {
                    //             input: {
                    //                 // todo
                    //             },
                    //         },
                    //     })
                    // }
                />
            );
        //                 }}
        //             </Query>
        //         );
        //     }}
        // </Mutation>
        // );
        case 'registration':
            const { login } = useApp();
            const [createUser] = useMutation(CREATE_USER_MUTATION, { onCompleted: handleCompleted });
            const handleCompleted = ({ register: { hash } }) => {
                login(hash);
                if (onCompleted) onCompleted();
            };

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
        default:
            return <UserForm type={type} onSubmit={onSubmit} />;
    }
};
