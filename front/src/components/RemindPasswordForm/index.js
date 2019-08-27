import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';

const REMIND_PASSWORD_MUTATION = gql`
    mutation remindPassword($email: String!) {
        remindPassword(email: $email) {
            status
        }
    }
`;

const RemindPassword = props => {
    const [email, setEmail] = useState('');
    const [remindPassword] = useMutation(REMIND_PASSWORD_MUTATION, {
        variables: {
            email,
        },
    });
    const handleSubmit = e => {
        e.preventDefault();

        if (!email) return;

        remindPassword();
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <Input
                    name="email"
                    type="email"
                    label="Email address"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Button type="submit" kind="primary" size="large" fullWidth bold>
                    Email me reset instructions
                </Button>
            </InputGroup>
        </form>
    );
};

export default RemindPassword;
