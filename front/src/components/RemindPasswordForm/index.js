import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { FormattedMessage } from 'react-intl';

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

const RemindPassword = () => {
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
                    label={<FormattedMessage id="email" />}
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Button type="submit" kind="primary" size="large" fullWidth bold>
                    <FormattedMessage id="remind_password_button" />
                </Button>
            </InputGroup>
        </form>
    );
};

export default RemindPassword;
