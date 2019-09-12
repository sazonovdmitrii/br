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

const Landing = () => {
    const testUrl = useLangLink('/muzhskie-opravy/');

    return (
        <Container>
            <div className={styles.hero}>
                <div className={styles.heroImageWrapper}>
                    <picture className={styles.heroImage}>
                        <source
                            media="(min-width: 1440px)"
                            srcset="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/1/8ec2af9e7a.jpg?quality=80&amp;width=1440 1440w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/1/8ec2af9e7a.jpg?quality=80&amp;width=2880 2880w"
                            sizes="1440px"
                        />
                        <source
                            media="(min-width: 900px)"
                            srcset="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/1/8ec2af9e7a.jpg?quality=80&amp;width=900 900w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/1/8ec2af9e7a.jpg?quality=80&amp;width=1296 1296w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/1/8ec2af9e7a.jpg?quality=80&amp;width=1692 1692w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/1/8ec2af9e7a.jpg?quality=80&amp;width=2088 2088w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/1/8ec2af9e7a.jpg?quality=80&amp;width=2484 2484w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/1/8ec2af9e7a.jpg?quality=80&amp;width=2880 2880w"
                            sizes="100vw"
                        />
                        <source
                            media="(min-width: 600px)"
                            srcset="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=768 768w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=994 994w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=1221 1221w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=1447 1447w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=1674 1674w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=1900 1900w"
                        />
                        <source
                            media="(min-width: 0px)"
                            srcset="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=320 320w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=556 556w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=792 792w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=1028 1028w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=1264 1264w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/hero-buy/0/747f934488.jpg?quality=70&amp;width=1500 1500w"
                        />
                        <img
                            alt=""
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        />
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
                        <Button to={testUrl} kind="simple" bold>
                            <FormattedMessage id="shop_men" />
                        </Button>
                        <Button to="/zhenskie-opravy/" kind="simple" bold>
                            <FormattedMessage id="shop_women" />
                        </Button>
                    </div>
                </div>
            </div>
            <section>
                <HomeTry
                    image={
                        <picture>
                            <source
                                media="(min-width: 1200px)"
                                srcset="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=1092 1092w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=2184 2184w"
                                sizes="1092px"
                            />
                            <source
                                media="(min-width: 900px)"
                                srcset="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=794 794w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=1588 1588w"
                                sizes="794px"
                            />
                            <source
                                media="(min-width: 600px)"
                                srcset="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=660 660w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=1320 1320w"
                                sizes="660px"
                            />
                            <source
                                media="(min-width: 0px)"
                                srcset="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=360 360w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=720 720w"
                                sizes="360px"
                            />
                            <img
                                alt=""
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                            />
                        </picture>
                    }
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
                    poster="https://i.warbycdn.com/v/c/assets/quality-landing-page/image/hero/2/4abad3fd34.jpg"
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
                    image={
                        <picture>
                            <source
                                srcSet="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/inlay-edition/3/9a58136d7c.jpg"
                                media="(max-width: 500px)"
                            />
                            <img
                                src="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/inlay-edition/4/d6fcf05363.jpg"
                                alt=""
                            />
                        </picture>
                    }
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
