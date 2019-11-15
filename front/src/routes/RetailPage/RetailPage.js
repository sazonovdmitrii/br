import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { SeoHead } from 'utils';

import Container from 'components/Container';
import Hero from 'components/Hero';
import Link from 'components/Link';
import LocationsSection from 'components/LocationsSection';
import Map from 'components/Map';

import styles from './styles.css';
import bgImage from './images/bg.jpg';

const cx = classnames.bind(styles);

const RetailPage = ({ name, full_name, longitude, latitude, phone, description, image, hours, nearby }) => {
    const mapLink = `https://www.google.com/maps/place/${latitude},${longitude}`;
    const phoneClassName = cx(styles.phone, styles.block);
    const descriptionClassName = cx(styles.description, styles.block);

    return (
        <div>
            <SeoHead type="retail" name={name} />
            <Hero image={image || bgImage} />
            <section className={styles.section}>
                <Container>
                    <div className={styles.center}>
                        <div className={styles.inner}>
                            <h1 className={styles.title}>{name}</h1>
                            <div>
                                <div className={styles.location}>
                                    <Link href={mapLink} target="_blank">
                                        {full_name}
                                    </Link>
                                </div>
                                {phone && (
                                    <div className={phoneClassName}>
                                        <a className={styles.phoneLink} href="tel:+799912341212">
                                            {phone}
                                        </a>
                                    </div>
                                )}
                            </div>
                            {description && <div className={descriptionClassName}>{description}</div>}
                            {hours && (
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
                            )}
                        </div>
                    </div>
                    {longitude && latitude && (
                        <Map
                            items={[{ id: 666, name, full_name, longitude, latitude }]}
                            zoom={16}
                            active={666}
                        />
                    )}
                </Container>
            </section>
            {nearby.length ? <LocationsSection /> : null}
        </div>
    );
};

RetailPage.defaultProps = {
    phone: null,
    hours: null,
    image: null,
    description: null,
    nearby: [],
};

RetailPage.propTypes = {
    hours: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    phone: PropTypes.string,
    name: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    latitude: PropTypes.string.isRequired,
};

export default RetailPage;
