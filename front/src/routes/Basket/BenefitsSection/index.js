import React from 'react';
import { FormattedMessage } from 'react-intl';

import Benefit from 'components/Benefit';

import styles from './styles.css';

import freeShippingImage from './images/free-shipping.png';
import freeShippingImageRetina from './images/free-shipping@2x.png';
import PrescriptionsImage from './images/prescriptions.png';
import PrescriptionsImageRetina from './images/prescriptions@2x.png';
import MoreWaysImage from './images/more-ways-to-save.png';
import MoreWaysImageRetina from './images/more-ways-to-save@2x.png';

export default () => {
    return (
        <section className={styles.root}>
            <div className={styles.title}>
                <FormattedMessage id="cart_benefits_title" />
            </div>
            <div className={styles.row}>
                <Benefit
                    title={<FormattedMessage id="benefit_free_shipping" />}
                    text={<FormattedMessage id="benefit_free_shipping_text" />}
                    image={freeShippingImage}
                    imageRetina={freeShippingImageRetina}
                />
                <Benefit
                    title={<FormattedMessage id="benefit_prescriptions" />}
                    text={<FormattedMessage id="benefit_prescriptions_text" />}
                    image={PrescriptionsImage}
                    imageRetina={PrescriptionsImageRetina}
                />
                <Benefit
                    title={<FormattedMessage id="benefit_more_way" />}
                    text={<FormattedMessage id="benefit_more_way_text" />}
                    image={MoreWaysImage}
                    imageRetina={MoreWaysImageRetina}
                />
            </div>
        </section>
    );
};
