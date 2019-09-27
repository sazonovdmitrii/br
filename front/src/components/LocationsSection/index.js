import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useLangLinks } from 'hooks';

import Container from 'components/Container';
import LocationCard from 'components/LocationCard';

import styles from './styles.css';

const LocationsSection = props => {
    const [reatilsLink] = useLangLinks(['/retail']);

    return (
        <section className={styles.root}>
            <Container>
                <div className={styles.header}>
                    <h1 className={styles.title}>
                        <FormattedMessage id="locations_title" />
                    </h1>
                </div>
                <ul className={styles.items}>
                    <li className={styles.item}>
                        <LocationCard
                            title="Oakbrook Center"
                            image="https://i.warbycdn.com/v/c/assets/retail-oakbrook/image/04-desktop/1/1ab43c2a8d.jpg?quality=70&amp;width=400"
                            subtitle="Now closed"
                            meta="Eye exams available"
                            url="/retail/illinois/oakbrook-center"
                        />
                    </li>
                </ul>
                <div className={styles.footer}>
                    <Link to={reatilsLink} className={styles.link}>
                        <FormattedMessage id="locations_link" />
                    </Link>
                </div>
            </Container>
        </section>
    );
};

export default LocationsSection;
