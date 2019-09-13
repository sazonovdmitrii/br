import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import Container from 'components/Container';
import Hero from 'components/Hero';
import Link from 'components/Link';
import LocationsSection from 'components/LocationsSection';

import styles from './styles.css';
import bgImage from './images/bg.jpg';

const cx = classnames.bind(styles);

const RetailPage = props => {
    const rowCenterClassName = cx(styles.row, styles.center);
    const phoneClassName = cx(styles.phone, styles.block);
    const descriptionClassName = cx(styles.description, styles.block);

    return (
        <div>
            <Hero image={bgImage} />
            <section className={styles.section}>
                <Container>
                    <div className={rowCenterClassName}>
                        <div className={styles.col}>
                            <h1 className={styles.title}>The Pizitz</h1>
                            <div>
                                <div className={styles.location}>
                                    <Link href="https://goo.gl/maps/Nb2fCjE1hXp">
                                        <span>1821 Second Avenue North</span>
                                        <span>Birmingham, AL 35203</span>
                                    </Link>
                                </div>
                                <div className={phoneClassName}>
                                    <a className={styles.phoneLink} href="tel:+799912341212">
                                        +7 (999) 1234-12-12
                                    </a>
                                </div>
                            </div>
                            <div className={descriptionClassName}>
                                Behind the Reference Desk in our store at The Pizitz, you’ll find a bright
                                geometric mural in shades of our very favorite color, blue.
                            </div>
                            <div className={styles.workingHours}>
                                <div className={styles.hoursBlock}>
                                    <p className={styles.day}>mon–sat</p>
                                    <p className={styles.time}>10 a.m.–7 p.m.</p>
                                </div>
                                <div className={styles.hoursBlock}>
                                    <p className={styles.day}>sun</p>
                                    <p className={styles.time}>12 p.m.–6 p.m.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <LocationsSection />
        </div>
    );
};

RetailPage.defaultProps = {};

RetailPage.propTypes = {};

export default RetailPage;
