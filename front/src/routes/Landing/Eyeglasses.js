import React from 'react';
// import { Link as LinkRoute } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useLangLinks } from 'hooks';

import Link from 'components/Link';
// import Collections from 'components/Collections';
import Container from 'components/Container';
import Button from 'components/Button';
// import VideoSection from 'components/VideoSection';
import HomeTry from 'components/HomeTry';
import Lenses from 'components/Lenses';
import HeroLanding from 'components/HeroLanding';

import styles from './styles.css';
import heroImage from './images/eyeglasses-hero.jpg';
import homeTryImage from './images/eyeglasses-hometry.jpg';
import lensesImage from './images/eyeglasses-lenses.jpg';
// import videoPosterImage from './images/videposter.jpg';

const Landing = () => {
    const [manUrl, womanUrl, lensesUrl] = useLangLinks(['/muzhskie-opravy/', '/zhenskie-opravy/', '/lenses']);

    return (
        <Container>
            <HeroLanding
                title={<FormattedMessage id="p_eyeglasses_hero_title" />}
                text={<FormattedMessage id="p_eyeglasses_hero_text" />}
                image={{ source: heroImage }}
                actions={
                    <>
                        <Button to={manUrl} kind="simple" bold>
                            <FormattedMessage id="p_eyeglasses_button_men" />
                        </Button>
                        <Button to={womanUrl} kind="simple" bold>
                            <FormattedMessage id="p_eyeglasses_button_women" />
                        </Button>
                    </>
                }
            />
            <section>
                <HomeTry
                    image={<img src={homeTryImage} alt="" />}
                    title={<FormattedMessage id="home_try_on" />}
                    text={<FormattedMessage id="home_try_text" />}
                    action={
                        <>
                            <Button to="" kind="simple" bold>
                                <FormattedMessage id="home_try_button" />
                            </Button>
                            <Link to="#">
                                <FormattedMessage id="quiz_action" />
                            </Link>
                        </>
                    }
                />
            </section>
            {/*
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
            </section> */}
            <section className={styles.section}>
                <Lenses
                    image={<img src={lensesImage} alt="" />}
                    title={<FormattedMessage id="eyeglasses_lenses_title" />}
                    text={<FormattedMessage id="eyeglasses_lenses_text" />}
                    items={[
                        {
                            label: <FormattedMessage id="prescription_types" />,
                            value: <FormattedMessage id="prescription_types_text" />,
                        },
                    ]}
                    action={
                        <Button to={lensesUrl} kind="simple" size="large" bold>
                            <FormattedMessage id="find_your_lenses" />
                        </Button>
                    }
                />
            </section>
            {/* <Collections /> */}
        </Container>
    );
};

export default Landing;
