import React from 'react';
import PropTypes from 'prop-types';

import { SeoHead, createMarkup } from 'utils';

import Container from 'components/Container';
import Title from 'components/Title';

import styles from './styles.css';

const Content = ({ title, meta_keywords, meta_description, content }) => (
    <div className={styles.root}>
        <Container>
            <SeoHead type="content" name={title} keywords={meta_keywords} description={meta_description} />
            <div className={styles.header}>
                <Title>{title}</Title>
            </div>
            <div className={styles.content} dangerouslySetInnerHTML={createMarkup(content)} />
        </Container>
    </div>
);

Content.defaultProps = {};

Content.propTypes = {
    title: PropTypes.string.isRequired,
    meta_keywords: PropTypes.string.isRequired,
    meta_description: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Content;
