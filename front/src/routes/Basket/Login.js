import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useApp } from 'hooks';

import Title from 'components/Title';
import LoginForm from 'components/LoginForm';
import UserForm from 'components/UserForm';
import Hr from 'components/Hr';
import RestorePasswordForm from 'components/RestorePasswordForm';

import styles from './styles.css';

const Login = () => {
    const { login } = useApp();
    const [loginType, setLoginType] = useState('login');
    const handleLogInCompleted = ({ auth: { hash } }) => {
        login(hash);
    };
    const handleRegisterCompleted = ({ register: { hash } }) => {
        login(hash);
    };

    return (
        <div className={styles.containerSmall}>
            {loginType === 'login' && (
                <>
                    <Title>
                        <FormattedMessage id="c_login_title" />
                    </Title>
                    <LoginForm onCompleted={handleLogInCompleted} />
                    {/* <Link onClick={() => setLoginType('remind')}>
                        <FormattedMessage id="forgot_password" />?
                    </Link> */}
                    <Hr />
                    <Link onClick={() => setLoginType('register')}>
                        <FormattedMessage id="create_account" />
                    </Link>
                </>
            )}
            {loginType === 'register' && (
                <>
                    <Title>
                        <FormattedMessage id="c_register_title" />!
                    </Title>
                    <UserForm type="registration" onCompleted={handleRegisterCompleted} />
                    <Hr />
                    <Link onClick={() => setLoginType('login')}>
                        <FormattedMessage id="i_have_an_account" />
                    </Link>
                </>
            )}
            {loginType === 'remind' && (
                <>
                    <RestorePasswordForm />
                    <Link onClick={() => setLoginType('login')}>
                        <FormattedMessage id="p_remind_password_login_link" />
                    </Link>
                </>
            )}
        </div>
    );
};

Login.defaultProps = {};

Login.propTypes = {};

export default Login;
