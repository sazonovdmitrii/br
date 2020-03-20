import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@apollo/react-hooks';

import { useLangLinks } from 'hooks';
import { GET_BANNER } from 'query';
import { createMarkup } from 'utils';

import Title from 'components/Title';
import Banners from 'components/Banners';
import Button from 'components/Button';
import CollectionSection from 'components/CollectionSection';
import Container from 'components/Container';

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

export default ({ lang }) => {
    const { loading: loadingBanner, error: errorBanner, data: { banner } = {} } = useQuery(GET_BANNER, {
        variables: {
            name: 'main',
            locale: lang,
        },
    });
    const [menSunglassesUrl, womenSunglassesUrl, menEyeglassesUrl, womenEyeglassesUrl] = useLangLinks([
        '/muzhskie-solncezashhitnye-ochki/',
        '/zhenskie-solncezashhitnye-ochki/',
        '/muzhskie-opravy/',
        '/zhenskie-opravy/',
    ]);

    return (
        <>
            <Container>
                {loadingBanner || errorBanner ? null : (
                    <Banners>
                        {banner.bannerItems.map(({ id, description, images }) => (
                            <div key={id}>
                                <picture>
                                    <source type="image/webp" srcSet={images.banner.webp} />
                                    <img src={images.banner.original} alt="" />
                                </picture>
                                <div className={styles.slideText}>
                                    <div className={styles.slideHeading}>
                                        <Title
                                            element="h1"
                                            dangerouslySetInnerHTML={createMarkup(description)}
                                        />
                                    </div>
                                    <div className={styles.slideButtons}>
                                        <Button
                                            className={styles.slideButton}
                                            to={menEyeglassesUrl}
                                            kind="primary"
                                            size="small"
                                            bold
                                            outlined
                                            rounded
                                        >
                                            <FormattedMessage id="shop_men" />
                                        </Button>
                                        <Button
                                            className={styles.slideButton}
                                            to={womenEyeglassesUrl}
                                            kind="primary"
                                            size="small"
                                            bold
                                            outlined
                                            rounded
                                        >
                                            <FormattedMessage id="shop_women" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Banners>
                )}
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
