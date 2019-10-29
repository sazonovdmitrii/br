import React from 'react';
import { FormattedMessage } from 'react-intl';

import Container from 'components/Container';
import Title from 'components/Title';

import styles from './styles.css';

export default () => (
    <Container>
        <div className={styles.text}>
            <Title>
                <FormattedMessage id="p_500_title" /> 😢
            </Title>
        </div>
    </Container>
);
