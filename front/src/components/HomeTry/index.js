import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

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
                {action && <div className={styles.actions}>{action}</div>}
            </div>
            <div className={styles.rightBlock}>
                <div className={styles.quotes}>
                    <Quotes
                        items={[
                            {
                                author: <FormattedMessage id="sunglasses_home_try_feedback_author" />,
                                text: <FormattedMessage id="sunglasses_home_try_feedback_text" />,
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    </div>
);

HomeTry.defaultProps = {
    image: null,
    action: null,
};

HomeTry.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    image: PropTypes.string,
    action: PropTypes.node,
};

export default HomeTry;
