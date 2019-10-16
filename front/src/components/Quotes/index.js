import React from 'react';
import PropTypes from 'prop-types';
import Link from 'components/Link';
import { FormattedMessage } from 'react-intl';

import styles from './styles.css';

const Quotes = ({ items }) => (
    <div className={styles.root}>
        {items.map(({ author, text }) => (
            <div className={styles.item}>
                <div className={styles.author}>{author}</div>
                <div className={styles.text}>{text}</div>
            </div>
        ))}
        <div className={styles.actions}>
            <Link to="#">
                <FormattedMessage id="more_reviews" />
            </Link>
        </div>
    </div>
);

Quotes.defaultProps = {
    items: [],
};

Quotes.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string),
};

export default Quotes;
