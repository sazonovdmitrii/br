import React from 'react';
import { Link as LinkRoute } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useLangLink } from 'hooks';

import Link from 'components/Link';
import Collections from 'components/Collections';
import Container from 'components/Container';
import Button from 'components/Button';
import VideoSection from 'components/VideoSection';
import HomeTry from 'components/HomeTry';
import Lenses from 'components/Lenses';

import styles from './styles.css';
import heroImage from './images/eyeglasses-hero.jpg';
import homeTryImage from './images/eyeglasses-hometry.jpg';
import lensesImage from './images/eyeglasses-lenses.jpg';
import videoPosterImage from './images/videposter.jpg';

const Landing = () => {
    const manUrl = useLangLink('/muzhskie-opravy/');
    const womanUrl = useLangLink('/zhenskie-opravy/');

    return (
        <Container>
            <div className={styles.hero}>
                <div className={styles.heroImageWrapper}>
                    <picture className={styles.heroImage}>
                        <img src={heroImage} alt="" />
                    </picture>
                </div>
                <div className={styles.heroBody}>
                    <h1 className={styles.heroTitle}>
                        <FormattedMessage id="eyeglasses" />
                    </h1>
                    <p className={styles.heroText}>
                        <FormattedMessage id="eyeglasses_text" />
                    </p>
                    <div className={styles.heroActions} role="group" aria-label="Button Group">
                        <Button to={manUrl} kind="simple" bold>
                            <FormattedMessage id="shop_men" />
                        </Button>
                        <Button to={womanUrl} kind="simple" bold>
                            <FormattedMessage id="shop_women" />
                        </Button>
                    </div>
                </div>
            </div>
            <section>
                <HomeTry
                    image={<img src={homeTryImage} alt="" />}
                    title={<FormattedMessage id="eyeglasses_home_try_on" />}
                    text={<FormattedMessage id="eyeglasses_home_try_text" />}
                    action={
                        <>
                            <Button to="" kind="simple" bold>
                                <FormattedMessage id="get_started" />
                            </Button>
                            <Link to="#">
                                <FormattedMessage id="quiz_action" />
                            </Link>
                        </>
                    }
                />
            </section>
            <section className={styles.section}>
                <VideoSection
                    title={<FormattedMessage id="video_title" />}
                    poster={videoPosterImage}
                    video="https://player.vimeo.com/external/246989570.hd.mp4?s=276721bec238e24770d1c7e8f7678ab224480188&amp;profile_id=174"
                    actions={
                        <LinkRoute to="/how-our-glasses-are-made" className={styles.button}>
                            <FormattedMessage id="video_action" />
                        </LinkRoute>
                    }
                />
            </section>
            <section className={styles.section}>
                <Lenses
                    image={<img src={lensesImage} alt="" />}
                    title={<FormattedMessage id="eyeglasses_lenses_title" />}
                    text={<FormattedMessage id="eyeglasses_lenses_text" />}
                    items={[
                        {
                            label: 'Prescription types',
                            value: 'Single-vision, progressives, readers, non-prescription',
                        },
                    ]}
                    action={
                        <Button to="/lenses" kind="simple" size="large" bold>
                            <FormattedMessage id="find_your_lenses" />
                        </Button>
                    }
                />
            </section>
            <Collections />
        </Container>
    );
};

export default Landing;
