import React from 'react';
import { FormattedMessage } from 'react-intl';

import { useLangLinks } from 'hooks';

import Button from 'components/Button';
import CollectionSection from 'components/CollectionSection';
import Container from 'components/Container';
import HeroLanding from 'components/HeroLanding';

import styles from './styles.css';
import bgImage from './images/bg.jpg';
import bgImageRetina from './images/bg@2x.jpg';

import menSunglassesImg from './images/men-sunglasses.jpg';
import menSunglassesImgWebp from './images/men-sunglasses.webp';
import womenSunglassesImg from './images/women-sunglasses.jpg';
import womenSunglassesImgWebp from './images/women-sunglasses.webp';
import menEyeglassesImg from './images/men-eyeglasses.jpg';
import menEyeglassesImgWebp from './images/men-eyeglasses.webp';
import womenEyeglassesImg from './images/women-eyeglasses.jpg';
import womenEyeglassesImgWebp from './images/women-eyeglasses.webp';

const VALUES = { br: <br /> };

export default () => {
    const [menSunglassesUrl, womenSunglassesUrl, menEyeglassesUrl, womenEyeglassesUrl] = useLangLinks([
        '/muzhskie-solncezashhitnye-ochki/',
        '/zhenskie-solncezashhitnye-ochki/',
        '/muzhskie-opravy/',
        '/zhenskie-opravy/',
    ]);

    return (
        <>
            <Container>
                <HeroLanding
                    title={<FormattedMessage id="p_home_hero_title" values={VALUES} />}
                    image={{ source: bgImage, retina: bgImageRetina }}
                    actions={
                        <>
                            <Button to={menEyeglassesUrl} kind="primary" size="small" bold outlined rounded>
                                <FormattedMessage id="shop_men" />
                            </Button>
                            <Button to={womenEyeglassesUrl} kind="primary" size="small" bold outlined rounded>
                                <FormattedMessage id="shop_women" />
                            </Button>
                        </>
                    }
                />
            </Container>
            {/*
            <div className={styles.main}>
                <Container>
                    <div className={styles.mainText}>
                        <FormattedMessage id="p_home_text" values={{ space: <>&nbsp;</> }} />
                    </div>
                    <CollectionSection />
                </Container>
            </div>
            */}
            <Container>
                <div className={styles.section}>
                    <div className={styles.sectionRow}>
                        <div className={styles.imageContainer}>
                            <picture>
                                <source type="image/webp" srcSet={menSunglassesImgWebp} />
                                <img src={menSunglassesImg} alt="" />
                            </picture>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                <FormattedMessage id="p_home_mensunglasses_title" />
                            </div>
                            <div className={styles.text}>
                                <FormattedMessage id="p_home_mensunglasses_text" values={VALUES} />
                            </div>
                            <div className={styles.actions}>
                                <Button to={menSunglassesUrl} kind="primary" size="large" bold>
                                    <FormattedMessage id="p_home_sunglasses_button" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionRow}>
                        <div className={styles.imageContainer}>
                            <picture>
                                <source type="image/webp" srcSet={womenSunglassesImgWebp} />
                                <img src={womenSunglassesImg} alt="" />
                            </picture>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                <FormattedMessage id="p_home_womensunglasses_title" />
                            </div>
                            <div className={styles.text}>
                                <FormattedMessage id="p_home_womensunglasses_text" values={VALUES} />
                            </div>
                            <div className={styles.actions}>
                                <Button to={womenSunglassesUrl} kind="primary" size="large" bold>
                                    <FormattedMessage id="p_home_sunglasses_button" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionRow}>
                        <div className={styles.imageContainer}>
                            <picture>
                                <source type="image/webp" srcSet={menEyeglassesImgWebp} />
                                <img src={menEyeglassesImg} alt="" />
                            </picture>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                <FormattedMessage id="p_home_meneyeglasses_title" />
                            </div>
                            <div className={styles.text}>
                                <FormattedMessage id="p_home_meneyeglasses_text" values={VALUES} />
                            </div>
                            <div className={styles.actions}>
                                <Button to={menEyeglassesUrl} kind="primary" size="large" bold>
                                    <FormattedMessage id="p_home_eyeglasses_button" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.section}>
                    <div className={styles.sectionRow}>
                        <div className={styles.imageContainer}>
                            <picture>
                                <source type="image/webp" srcSet={womenEyeglassesImgWebp} />
                                <img src={womenEyeglassesImg} alt="" />
                            </picture>
                        </div>
                        <div className={styles.body}>
                            <div className={styles.title}>
                                <FormattedMessage id="p_home_womeneyeglasses_title" />
                            </div>
                            <div className={styles.text}>
                                <FormattedMessage id="p_home_womeneyeglasses_text" values={VALUES} />
                            </div>
                            <div className={styles.actions}>
                                <Button to={womenEyeglassesUrl} kind="primary" size="large" bold>
                                    <FormattedMessage id="p_home_eyeglasses_button" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
};
