import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Input from 'components/Input';
import InputGroup from 'components/InputGroup';
import RadioButton from 'components/RadioButton';
import RadioGroup from 'components/RadioGroup';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

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
        disclaimer: true,
        email_subscription: true,
        sms_subscription: true,
        ...data,
    });
    const handleChange = ({ target: { name, value, type: targetType } }, checked) => {
        const newValue = targetType === 'checkbox' ? checked : value;

        setState(prevState => ({
            ...prevState,
            [name]: newValue,
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
        disclaimer,
        email_subscription,
        sms_subscription,
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
            <InputGroup>
                <Checkbox
                    label={<FormattedMessage id="disclaimer" />}
                    name="disclaimer"
                    checked={disclaimer}
                    onChange={handleChange}
                    required
                />
            </InputGroup>
            <InputGroup>
                <Checkbox
                    label={<FormattedMessage id="email_subscription" />}
                    name="email_subscription"
                    checked={email_subscription}
                    onChange={handleChange}
                />
            </InputGroup>
            <InputGroup>
                <Checkbox
                    label={<FormattedMessage id="sms_subscription" />}
                    name="sms_subscription"
                    checked={sms_subscription}
                    onChange={handleChange}
                />
            </InputGroup>
            {(isRegistration || isPersonal) && (
                <>
                    <Button type="submit" kind="primary" size="large" bold fullWidth={isRegistration}>
                        {isRegistration ? (
                            <FormattedMessage id="create_account" />
                        ) : (
                            <FormattedMessage id="save" />
                        )}
                    </Button>
                    {isPersonal && (
                        <Button type="reset" kind="secondary" size="large">
                            <FormattedMessage id="cancel" />
                        </Button>
                    )}
                </>
            )}
        </form>
    );
};

UserForm.defaultProps = {
    onSubmit: () => {},
};

UserForm.propTypes = {
    onSubmit: PropTypes.func,
};

export default UserForm;
