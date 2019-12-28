import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import { withErrorBoundary } from 'hoc';
import { useLangLinks, useFormatMessage } from 'hooks';

import Title from 'components/Title';
import Link from 'components/Link';
import RemindPasswordForm from 'components/RemindPasswordForm';

import styles from './styles.css';

export default withErrorBoundary(() => {
    const [metaTitle] = useFormatMessage([{ id: 'p_remind_password_meta_title' }]);
    const [loginLink] = useLangLinks(['/account/login']);

    return (
        <>
            <Helmet title={metaTitle} />
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
        </>
    );
});
