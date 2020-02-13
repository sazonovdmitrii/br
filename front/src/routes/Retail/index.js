import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';

import { GET_STORES } from 'query';

import Hero from 'components/Hero';
import Container from 'components/Container';
import Switch from 'components/Switch';
import Shops from 'components/Shops';
import Loader from 'components/Loader';
import Map from 'components/Map';
import Title from 'components/Title';

import styles from './styles.css';
import bgImage from './images/bg.jpg';

const Retail = () => {
    const { loading: loadingStores, data: { stores } = {} } = useQuery(GET_STORES, {
        variables: {
            vision: false,
        },
    });
    const { loading: loadingStoresWithVision, data: { stores: storesWithVision } = {} } = useQuery(
        GET_STORES,
        {
            variables: {
                vision: true,
            },
        }
    );
    const loading = loadingStores && loadingStoresWithVision;

    return (
        <div>
            <Hero image={bgImage} />
            <Container>
                <section className={styles.body}>
                    <h2 className={styles.title}>
                        <FormattedMessage id="p_retail_title" />
                    </h2>
                    {loadingStoresWithVision ? (
                        <Loader />
                    ) : (
                        <>
                            <Title className={styles.subTitle}>
                                <FormattedMessage id="p_retail_store_vision_title" />
                            </Title>
                            <Shops items={storesWithVision.data} kind="row" />
                        </>
                    )}
                    {loadingStores ? (
                        <Loader />
                    ) : (
                        <>
                            <Title className={styles.subTitle}>
                                <FormattedMessage id="p_retail_store_title" />
                            </Title>
                            <Shops items={stores.data} kind="row" />
                        </>
                    )}
                    {!loading && stores && storesWithVision ? (
                        <Map items={[...stores.data, ...storesWithVision.data]} />
                    ) : null}
                </section>
            </Container>
        </div>
    );
};

export default Retail;
