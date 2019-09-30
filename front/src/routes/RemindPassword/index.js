import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useLangLinks } from 'hooks';

import Title from 'components/Title';
import Link from 'components/Link';
import RemindPasswordForm from 'components/RemindPasswordForm';

import styles from './styles.css';

export default () => {
    const [loginLink] = useLangLinks(['/account/login']);

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <Title>
                    <FormattedMessage id="remind_password_title" />
                </Title>
                <div className={styles.subTitle}>
                    <FormattedMessage id="remind_password_subtitle" />
                </div>
            </div>
            <RemindPasswordForm />
            <Link to={loginLink}>
                <FormattedMessage id="remind_password_login_link" />
            </Link>
        </div>
    );
};
