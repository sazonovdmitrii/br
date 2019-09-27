import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import Container from 'components/Container';
import Title from 'components/Title';

import styles from './styles.css';

export default () => (
    <Container>
        <div className={styles.text}>
            <Title>
                <FormattedMessage id="500" /> 😢
            </Title>
        </div>
    </Container>
);
