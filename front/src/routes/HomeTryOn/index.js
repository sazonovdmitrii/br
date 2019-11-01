import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';

import { useFormatMessage, useLangLinks } from 'hooks';

// import BenefitsSection from 'components/BenefitsSection';
import Button from 'components/Button';
import Link from 'components/Link';
import Hr from 'components/Hr';
import Title from 'components/Title';

import Animated from './Animated';
import Benefit from './Benefit';

import styles from './styles.css';
import heroImage from './images/hero.jpg';

import pickFramesImage from './images/pick-frames.jpg';
import buyAtAnyTimeImage from './images/buy-at-any-time.jpg';
import returnYourFramesImage from './images/return-your-frames.jpg';

const _benefits = [
    {
        title: <FormattedMessage id="p_hometry_benefit_pickframes_title" />,
        text: <FormattedMessage id="p_hometry_benefit_pickframes_text" />,
        image: pickFramesImage,
    },
    {
        title: <FormattedMessage id="p_hometry_benefit_buy_title" />,
        text: <FormattedMessage id="p_hometry_benefit_buy_text" />,
        image: buyAtAnyTimeImage,
    },
    {
        title: <FormattedMessage id="p_hometry_benefit_return_title" />,
        text: <FormattedMessage id="p_hometry_benefit_return_text" />,
        image: returnYourFramesImage,
    },
];

const HomeTryOn = ({ intl }) => {
    const [sunglassesMenLink, sunglassesWomenLink, eyeglassesMenLink, eyeglassesWomenLink] = useLangLinks([
        '/muzhskie-solncezashhitnye-ochki/',
        '/zhenskie-solncezashhitnye-ochki/',
        '/muzhskie-opravy/',
        '/zhenskie-opravy/',
    ]);
    const [metaTitle] = useFormatMessage([{ id: 'p_hometry_meta_title' }]);

    return (
        <div className={styles.root}>
            <Helmet title={metaTitle} />
            <div className={styles.hero}>
                <div className={styles.heroImageContainer}>
                    <img className={styles.heroImage} src={heroImage} alt="" />
                </div>
                <div className={styles.heroText}>
                    <h1 className={styles.heroTitle}>
                        <FormattedMessage id="p_hometry_title" />
                    </h1>
                    <div className={styles.heroSubtitle}>
                        <FormattedMessage
                            id="p_hometry_subtitle"
                            values={{ mobile: msg => <div className={styles.showMobile}>{msg}</div> }}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.benefitsSection}>
                <Title element="h2" className={styles.benefitsTitle}>
                    <FormattedMessage id="p_hometry_benefits_title" />
                </Title>
                <div className={styles.benefits}>
                    {_benefits.map(({ title, text, image }, index) => (
                        <Benefit key={index} title={title} text={text} image={image} />
                    ))}
                </div>
            </div>
            <Animated />
            <div className={styles.sectionActions}>
                <Title element="h2" className={styles.sectionTitle}>
                    <FormattedMessage id="p_hometry_shop_section_title" />
                </Title>
                <div className={styles.actionsCols}>
                    <div className={styles.actionCol}>
                        <h3 className={styles.actionsTitle}>
                            <FormattedMessage id="p_hometry_shop_section_eyeglasses_title" />
                        </h3>
                        <div className={styles.actions}>
                            <Button to={eyeglassesMenLink} kind="simple" size="large" bold>
                                <FormattedMessage id="men" />
                            </Button>
                            <Button to={eyeglassesWomenLink} kind="simple" size="large" bold>
                                <FormattedMessage id="women" />
                            </Button>
                        </div>
                    </div>
                    <div className={styles.actionCol}>
                        <h3 className={styles.actionsTitle}>
                            <FormattedMessage id="p_hometry_shop_section_sunglasses_title" />
                        </h3>
                        <div className={styles.actions}>
                            <Button to={sunglassesMenLink} kind="simple" size="large" bold>
                                <FormattedMessage id="men" />
                            </Button>
                            <Button to={sunglassesWomenLink} kind="simple" size="large" bold>
                                <FormattedMessage id="women" />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={styles.sectionFooter}>
                    <Hr className={styles.hr} />
                    <Link to="/help">
                        <FormattedMessage id="p_hometry_shop_section_help_link" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomeTryOn;
