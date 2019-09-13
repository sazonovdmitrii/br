import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Hero from 'components/Hero';
import Container from 'components/Container';
import Switch from 'components/Switch';
import Shops from 'components/Shops';

import styles from './styles.css';
import bgImage from './images/bg.jpg';

const _SHOPS = [
    {
        region: 'Московская область',
        shops: [
            {
                city: 'Москва',
                name: 'ЦККЗ на Тверской',
                address:
                    'метро Тверская, Пушкинская, Чеховская (1 минута от метро), Малый Палашевский пер. д. 6',
                phone: '+7 (495) 587 95 95, +7 (800) 100 95 96',
                link: null,
            },
            {
                city: 'Москва',
                name: 'ЦККЗ на Рижской',
                address: `м. Рижская, пр. Мира д. 78a, здание аптеки "Горздрав"`,
                phone: '+7 (926) 653-04-71',
                link: null,
            },
        ],
    },
];

const Retail = props => {
    const [filter, setFilter] = useState(true);

    return (
        <div>
            <Hero image={bgImage} />
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
                    <Shops items={_SHOPS} />
                </section>
            </Container>
        </div>
    );
};

Retail.defaultProps = {};

Retail.propTypes = {};

export default Retail;
