import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useLangLinks } from 'hooks';

import Button from 'components/Button';
import Title from 'components/Title';

import BenefitsSection from '../BenefitsSection';

import styles from './styles.css';

export default () => {
    const [eyeglassesLink, sunglassesLink] = useLangLinks(['/eyeglasses', '/sunglasses']);

    return (
        <>
            <div className={styles.empty}>
                <Title className={styles.title}>
                    <FormattedMessage id="empty_cart_title" />
                </Title>
                <p className={styles.subtitle}>
                    (<FormattedMessage id="empty_cart_text" />)
                </p>
                <div className={styles.actions}>
                    <Button className={styles.button} to={eyeglassesLink} kind="primary" size="large" bold>
                        <FormattedMessage id="shop_eyeglasses" />
                    </Button>
                    <Button className={styles.button} to={sunglassesLink} kind="primary" size="large" bold>
                        <FormattedMessage id="shop_sunglasses" />
                    </Button>
                </div>
            </div>
            <BenefitsSection />
        </>
    );
};
