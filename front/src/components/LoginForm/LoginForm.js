import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import Button from 'components/Button';
import ButtonGroup from 'components/ButtonGroup';
import Snackbar from 'components/Snackbar';

const LoginForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        onSubmit({
            variables: {
                input: {
                    email,
                    password,
                },
            },
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    value={email}
                    onChange={({ target: { value } }) => setEmail(value)}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Input
                    name="password"
                    type="password"
                    label="Password"
                    value={password}
                    onChange={({ target: { value } }) => setPassword(value)}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Button type="submit" kind="primary" size="large" fullWidth bold>
                    Sign in
                </Button>
            </InputGroup>
        </form>
    );
};

LoginForm.defaultProps = {
    error: null,
};

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    error: PropTypes.string,
};

export default LoginForm;
