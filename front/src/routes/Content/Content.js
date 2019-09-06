import React from 'react';
import PropTypes from 'prop-types';

import { SeoHead } from 'utils';

import Container from 'components/Container';

import styles from './styles.css';

const createMarkup = __html => ({
    __html,
});

const Content = ({ title, name, meta_keywords, meta_description, content }) => (
    <div className={styles.root}>
        <Container>
            <SeoHead type="content" name={title} keywords={meta_keywords} description={meta_description} />
            <div className={styles.header}>{title}</div>
            <div className={styles.content} dangerouslySetInnerHTML={createMarkup(content)} />
        </Container>
    </div>
);

Content.defaultProps = {};

Content.propTypes = {};

export default Content;
