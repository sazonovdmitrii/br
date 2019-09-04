import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Hero from 'components/Hero';
import Container from 'components/Container';
import ShopCard from 'components/ShopCard';
import Switch from 'components/Switch';

import styles from './styles.css';

const Retail = props => {
    const [filter, setFilter] = useState(true);

    return (
        <div>
            <Hero />
            <Container>
                <section className={styles.body}>
                    <h2 className={styles.title}>
                        <FormattedMessage id="retail_title" />
                    </h2>
                    <div className={styles.filter}>
                        <Switch
                            label={<FormattedMessage id="retail_filter" />}
                            checked={filter}
                            onChange={(e, value) => setFilter(value)}
                        />
                    </div>
                    <section className={styles.columns}>
                        <ShopCard
                            className={styles.column}
                            title="Alabama"
                            subtitle={
                                <>
                                    Birmingham, <a href="/retail/birmingham/the-pizitz">The Pizitz</a>
                                </>
                            }
                            text={
                                <>
                                    <span>1821 Second Avenue North</span>
                                    <br />
                                    <span>Downtown</span>
                                </>
                            }
                        />
                    </section>
                </section>
            </Container>
        </div>
    );
};

Retail.defaultProps = {};

Retail.propTypes = {};

export default Retail;
