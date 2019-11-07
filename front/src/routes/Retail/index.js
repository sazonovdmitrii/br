import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';

import { GET_STORES } from 'query';

import Hero from 'components/Hero';
import Container from 'components/Container';
import Switch from 'components/Switch';
import Shops from 'components/Shops';
import Loader from 'components/Loader';

import Map from './Map';

import styles from './styles.css';
import bgImage from './images/bg.jpg';

const Retail = () => {
    const { loading, data: { stores } = {}, refetch } = useQuery(GET_STORES);
    const [filter, setFilter] = useState(false);

    useEffect(() => {
        refetch({ vision: filter ? 1 : 0 });
    }, [filter, refetch]);

    return (
        <div>
            <Hero image={bgImage} />
            <Container>
                <section className={styles.body}>
                    <h2 className={styles.title}>
                        <FormattedMessage id="p_retail_title" />
                    </h2>
                    <div className={styles.filter}>
                        <Switch
                            label={<FormattedMessage id="p_retail_filter" />}
                            checked={filter}
                            onChange={(e, value) => setFilter(value)}
                        />
                    </div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <>
                            <Shops items={stores.data} />
                            {stores.data.length ? <Map items={stores.data} /> : null}
                        </>
                    )}
                </section>
            </Container>
        </div>
    );
};

export default Retail;
