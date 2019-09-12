import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import Link from 'components/Link';
import Quotes from 'components/Quotes';

import styles from './styles.css';

const HomeTry = ({ title, text, image, action }) => (
    <div className={styles.root}>
        {image && (
            <div className={styles.imageWrapper}>
                <div className={styles.image}>{image}</div>
            </div>
        )}
        <div className={styles.body}>
            <div className={styles.textBlock}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.text}>{text}</div>
                <div className={styles.actions}>{action}</div>
            </div>
            <div className={styles.rightBlock}>
                <div className={styles.quotes}>
                    <Quotes
                        items={[
                            {
                                author: 'CHRISTINA C, IL',
                                text:
                                    'Friendly, quick service. Love the Home Try-On option for five days because it really let me see how wearing one pair felt all day long.',
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    </div>
);

HomeTry.defaultProps = {};

HomeTry.propTypes = {};

export default HomeTry;
