import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';

import CollectionCard from './CollectionCard';
import styles from './collections.css';

const Collections = props => (
    <section className={styles.root}>
        <div className={styles.header}>
            <h1 className={styles.title}>
                <FormattedMessage id="our_newest_collections" />
            </h1>
        </div>
        <div className={styles.row}>
            <div className={styles.card}>
                <CollectionCard
                    title="aue"
                    text="Delicate metal and contrasting acetate are paired together in this breezy lineup, starting at $145."
                    actions={
                        <Button to="/sesia-collection" kind="simple" size="large" bold>
                            <FormattedMessage id="shop_now" />
                        </Button>
                    }
                />
            </div>
            <div className={styles.card}>
                <CollectionCard
                    title="aue"
                    text="Delicate metal and contrasting acetate are paired together in this breezy lineup, starting at $145."
                    actions={
                        <Button to="/sesia-collection" kind="simple" size="large" bold>
                            <FormattedMessage id="shop_now" />
                        </Button>
                    }
                />
            </div>
        </div>
    </section>
);

Collections.defaultProps = {};

Collections.propTypes = {};

export default Collections;
