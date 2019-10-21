import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { FormattedMessage } from 'react-intl';

import { GET_STORES } from 'query';

import Hero from 'components/Hero';
import Container from 'components/Container';
// import Switch from 'components/Switch';
import Shops from 'components/Shops';
import Loader from 'components/Loader';

import styles from './styles.css';
import bgImage from './images/bg.jpg';

const Retail = () => {
    const { loading, error, data: { stores } = {} } = useQuery(GET_STORES);
    // const [filter, setFilter] = useState(true);

    if (loading) return <Loader />;
    if (error || !stores) return null;

    return (
        <div>
            <Hero image={bgImage} />
            <Container>
                <section className={styles.body}>
                    <h2 className={styles.title}>
                        <FormattedMessage id="p_retail_title" />
                    </h2>
                    {/* <div className={styles.filter}>
                        <Switch
                            label={<FormattedMessage id="p_retail_filter" />}
                            checked={filter}
                            onChange={(e, value) => setFilter(value)}
                        />
                    </div> */}
                    <Shops items={stores.data} />
                </section>
            </Container>
        </div>
    );
};

export default Retail;
