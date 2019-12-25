import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet';

import { withErrorBoundary } from 'hoc';
import { useLangLinks, useFormatMessage } from 'hooks';

import Link from 'components/Link';
import Title from 'components/Title';
import UserForm from 'components/UserForm';

import styles from './styles.css';

export default withErrorBoundary(() => {
    const [metaTitle] = useFormatMessage([{ id: 'p_register_meta_title' }]);
    const history = useHistory();
    const [loginLink] = useLangLinks(['/account/login']);

    const handleCompleted = () => {
        history.push('/');
    };

    return (
        <>
            <Helmet title={metaTitle} />
            <div className={styles.root}>
                <div className={styles.header}>
                    <Title>
                        <FormattedMessage id="nice_to_meet_you" />
                    </Title>
                </div>
                <UserForm type="registration" onCompleted={handleCompleted} />
                <hr className={styles.hr} />
                <Title className={styles.title}>
                    <FormattedMessage id="i_have_an_account" />
                </Title>
                <Link to={loginLink} className={styles.link}>
                    <FormattedMessage id="sign_in" />
                </Link>
            </div>
        </>
    );
});
