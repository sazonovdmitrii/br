import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import RadioButton from 'components/RadioButton';
import RadioGroup from 'components/RadioGroup';
import Button from 'components/Button';
import Link from 'components/Link';

import styles from './styles.css';

const UserForm = ({ data, type, onSubmit }) => {
    const isRegistration = type === 'registration';
    const isPersonal = type === 'personal';

    const [state, setState] = useState({
        gender: '',
        lastname: '',
        firstname: '',
        // midname: '',
        email: '',
        phone: '',
        password: '',
        ...data,
    });
    const handleChange = ({ target: { name, value } }) => {
        setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = event => {
        event.preventDefault();

        // todo validation
        if (onSubmit) {
            onSubmit(state);
        }
    };

    const {
        gender,
        lastname,
        firstname,
        // midname,
        email,
        phone,
        password,
    } = state;

    return (
        <form onSubmit={handleSubmit}>
            <InputGroup>
                <Input
                    type="text"
                    name="firstname"
                    label={<FormattedMessage id="first_name" />}
                    value={firstname}
                    onChange={handleChange}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Input
                    type="text"
                    name="lastname"
                    label={<FormattedMessage id="last_name" />}
                    value={lastname}
                    onChange={handleChange}
                    required
                />
            </InputGroup>
            {/* TODO <InputGroup>
                        <Input
                            type="text"
                            name="midname"
                            label="Отчество"
                            value={midname}
                            onChange={handleChange}
                        />
                    </InputGroup> */}
            <FormattedMessage id="gender" />:
            <InputGroup>
                <RadioGroup name="gender" value={gender} onChange={handleChange}>
                    <RadioButton value="" label={<FormattedMessage id="not_specified" />} />
                    <RadioButton value="male" label={<FormattedMessage id="male" />} />
                    <RadioButton value="female" label={<FormattedMessage id="female" />} />
                </RadioGroup>
            </InputGroup>
            <InputGroup>
                <Input
                    name="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Input
                    type="tel"
                    name="phone"
                    value={phone}
                    label={<FormattedMessage id="phone" />}
                    placeholder="+7 (000) 000-00-00"
                    mask="+{7} (000) 000-00-00"
                    onChange={handleChange}
                    required
                />
            </InputGroup>
            {isRegistration && (
                <InputGroup>
                    <Input
                        name="password"
                        type="password"
                        label={<FormattedMessage id="password" />}
                        value={password}
                        onChange={handleChange}
                        required
                    />
                </InputGroup>
            )}
            {(isRegistration || isPersonal) && (
                <InputGroup>
                    <Button type="submit" kind="primary" size="large" bold fullWidth>
                        {isRegistration ? (
                            <FormattedMessage id="create_account" />
                        ) : (
                            <FormattedMessage id="save" />
                        )}
                    </Button>
                </InputGroup>
            )}
            {isRegistration && (
                <div className={styles.termsConditions}>
                    <FormattedMessage
                        id="terms_and_conditions"
                        values={{
                            terms: msg => <Link to="/">{msg}</Link>,
                            privacy: msg => <Link to="/">{msg}</Link>,
                            notice: msg => <Link to="/">{msg}</Link>,
                        }}
                    />
                </div>
            )}
        </form>
    );
};

UserForm.defaultProps = {
    onSubmit: () => {},
    data: {},
    type: null,
};

UserForm.propTypes = {
    type: PropTypes.string,
    data: PropTypes.objectOf(PropTypes.string),
    onSubmit: PropTypes.func,
};

export default UserForm;
