import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useLangLinks } from 'hooks';

import HeroHome from 'components/HeroHome';
import Button from 'components/Button';
import CollectionSection from 'components/CollectionSection';
import Container from 'components/Container';

import styles from './styles.css';
import bgImage from './images/bg.jpg';

import menSunglassesImg from './images/men-sunglasses.jpg';
import womenSunglassesImg from './images/women-sunglasses.jpg';
import menEyeglassesImg from './images/men-eyeglasses.jpg';
import womenEyeglassesImg from './images/women-eyeglasses.jpg';

export default () => {
    const [
        manUrl,
        womanUrl,
        menSunglassesUrl,
        womenSunglassesUrl,
        menEyeglassesUrl,
        womenEyeglassesUrl,
    ] = useLangLinks([
        '/muzhskie-opravy/',
        '/zhenskie-opravy/',
        '/muzhskie-solncezashhitnye-ochki/',
        '/zhenskie-solncezashhitnye-ochki/',
        '/muzhskie-opravy/',
        '/zhenskie-opravy/',
    ]);

    return (
        <>
            <HeroHome
                title={<FormattedMessage id="p_home_hero_title" />}
                image={bgImage}
                actions={
                    <>
                        <Button to={manUrl} kind="primary" size="small" bold outlined rounded>
                            <FormattedMessage id="shop_men" />
                        </Button>
                        <Button to={womanUrl} kind="primary" size="small" bold outlined rounded>
                            <FormattedMessage id="shop_women" />
                        </Button>
                    </>
                }
            />
            <div className={styles.main}>
                <div className={styles.mainText}>
                    <FormattedMessage id="p_home_text" />
                </div>
                <CollectionSection />
            </div>
            <Container>
                <div className={styles.section}>
                    <div className={styles.sectionRow}>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                <FormattedMessage id="p_home_mensunglasses_title" />
                            </div>
                            <div className={styles.text}>
                                <FormattedMessage id="p_home_menglasses_text" />
                            </div>
                            <div className={styles.actions}>
                                <Button to={menSunglassesUrl} kind="primary" size="large" bold>
                                    <FormattedMessage id="p_home_sunglasses_button" />
                                </Button>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={menSunglassesImg} alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionRow}>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                <FormattedMessage id="p_home_womensunglasses_title" />
                            </div>
                            <div className={styles.text}>
                                <FormattedMessage id="p_home_womenglasses_text" />
                            </div>
                            <div className={styles.actions}>
                                <Button to={womenSunglassesUrl} kind="primary" size="large" bold>
                                    <FormattedMessage id="p_home_sunglasses_button" />
                                </Button>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={womenSunglassesImg} alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionRow}>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                <FormattedMessage id="p_home_meneyeglasses_title" />
                            </div>
                            <div className={styles.text}>
                                <FormattedMessage id="p_home_menglasses_text" />
                            </div>
                            <div className={styles.actions}>
                                <Button to={menEyeglassesUrl} kind="primary" size="large" bold>
                                    <FormattedMessage id="p_home_eyeglasses_button" />
                                </Button>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={menEyeglassesImg} alt="" />
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionRow}>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                <FormattedMessage id="p_home_womeneyeglasses_title" />
                            </div>
                            <div className={styles.text}>
                                <FormattedMessage id="p_home_womenglasses_text" />
                            </div>
                            <div className={styles.actions}>
                                <Button to={womenEyeglassesUrl} kind="primary" size="large" bold>
                                    <FormattedMessage id="p_home_eyeglasses_button" />
                                </Button>
                            </div>
                        </div>
                        <div className={styles.imageContainer}>
                            <img src={womenEyeglassesImg} alt="" />
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};
