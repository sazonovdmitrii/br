import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';

import { GET_USER } from 'query';

import UserForm from 'components/UserForm';
import Container from 'components/Container';

import styles from './styles.css';

export default () => {
    const { loading, error, data: { user } = {} } = useQuery(GET_USER);

    if (loading || error) return null;

    return (
        <Container className={styles.root} size="form">
            <h1 className={styles.title}>
                <FormattedMessage id="edit_profile_title" />
            </h1>
            <UserForm type="personal" data={user} />
        </Container>
    );
};
