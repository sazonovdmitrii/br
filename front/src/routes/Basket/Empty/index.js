import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useLangLinks } from 'hooks';

import Button from 'components/Button';
import Title from 'components/Title';
import BenefitsSection from 'components/BenefitsSection';

import styles from './styles.css';

import freeShippingImage from './images/free-shipping.png';
import freeShippingImageRetina from './images/free-shipping@2x.png';
import PrescriptionsImage from './images/prescriptions.png';
import PrescriptionsImageRetina from './images/prescriptions@2x.png';
import MoreWaysImage from './images/more-ways-to-save.png';
import MoreWaysImageRetina from './images/more-ways-to-save@2x.png';

const _benefits = [
    {
        title: <FormattedMessage id="benefit_free_shipping" />,
        text: <FormattedMessage id="benefit_free_shipping_text" />,
        image: freeShippingImage,
        imageRetina: freeShippingImageRetina,
    },
    {
        title: <FormattedMessage id="benefit_prescriptions" />,
        text: <FormattedMessage id="benefit_prescriptions_text" />,
        image: PrescriptionsImage,
        imageRetina: PrescriptionsImageRetina,
    },
    {
        title: <FormattedMessage id="benefit_more_way" />,
        text: <FormattedMessage id="benefit_more_way_text" />,
        image: MoreWaysImage,
        imageRetina: MoreWaysImageRetina,
    },
];

export default () => {
    const [eyeglassesLink, sunglassesLink] = useLangLinks(['/eyeglasses', '/sunglasses']);

    return (
        <>
            <div className={styles.empty}>
                <Title className={styles.title}>
                    <FormattedMessage id="p_cart_empty_title" />
                </Title>
                <p className={styles.subtitle}>
                    (<FormattedMessage id="p_cart_empty_text" />)
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
            <BenefitsSection
                className={styles.benefitsSection}
                title={<FormattedMessage id="cart_benefits_title" />}
                items={_benefits}
            />
        </>
    );
};
