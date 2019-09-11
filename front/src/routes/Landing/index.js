import React from 'react';
import PropTypes from 'prop-types';
import { Link as LinkRoute } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import Link from 'components/Link';
import Container from 'components/Container';
import Button from 'components/Button';
import VideoSection from 'components/VideoSection';
import Lenses from './Lenses';
import Collections from './Collections';
import HomeTry from './HomeTry';

import styles from './styles.css';

const Landing = props => (
    <Container>
        <div className={styles.hero}>
            <div className={styles.heroImageWrapper}>
                <picture className={styles.heroImage}>
                    <source
                        media="(min-width: 1440px)"
                        srcSet="https://placehold.it/1440x511 1440w,https://placehold.it/2880x1022 2880w"
                        sizes="1440px"
                    />
                    <source
                        media="(min-width: 900px)"
                        srcSet="https://placehold.it/900x319 900w,https://placehold.it/1296x460 1296w,https://placehold.it/1692x600 1692w,https://placehold.it/2088 2088w,https://placehold.it/2484 2484w,https://placehold.it/2880 2880w"
                        sizes="100vw"
                    />
                    <source
                        media="(min-width: 600px)"
                        srcSet="https://placehold.it/768 768w,https://placehold.it/994x664 994w,https://placehold.it/1221 1221w,https://placehold.it/1447 1447w,https://placehold.it/1674 1674w,https://placehold.it/1900 1900w"
                    />
                    <source
                        media="(min-width: 0)"
                        srcSet="https://placehold.it/320x213 320w,https://placehold.it/556x371 556w,https://placehold.it/792x529 792w,https://placehold.it/1028 1028w,https://placehold.it/1264 1264w,https://placehold.it/1500 1500w"
                    />
                    <img
                        className="u-size--contain"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        alt=""
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
                    <Button to="/muzhskie-opravy/" kind="simple" bold>
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
                title={<FormattedMessage id="home_try_on" />}
                text={<FormattedMessage id="home_try_text" />}
                actionsLeft={
                    <>
                        <Button to="/muzhskie-opravy/" kind="simple" bold>
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
                title={<FormattedMessage id="lenses_title" />}
                text={<FormattedMessage id="lenses_text" />}
                items={[
                    {
                        label: 'Prescription types',
                        value: 'Single-vision, progressives, readers, non-prescription',
                    },
                ]}
            />
        </section>
        <Collections />
    </Container>
);

Landing.defaultProps = {};

Landing.propTypes = {};

export default Landing;
