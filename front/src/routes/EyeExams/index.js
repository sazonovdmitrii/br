import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Hero from 'components/Hero';
import Container from 'components/Container';
import Switch from 'components/Switch';
import Link from 'components/Link';

import styles from './styles.css';

const EyeExams = props => {
    const [filter, setFilter] = useState(false);

    return (
        <div>
            <Hero />
            <Container>
                <section className={styles.body}>
                    <div className={styles.header}>
                        <h1 className={styles.title}>
                            <FormattedMessage id="eye_exam_title" />
                        </h1>
                        <div className={styles.description}>
                            <FormattedMessage id="eye_exam_description" />
                        </div>
                    </div>
                    <section className={styles.columns} />
                </section>
            </Container>
        </div>
    );
};

EyeExams.defaultProps = {};

EyeExams.propTypes = {};

export default EyeExams;
