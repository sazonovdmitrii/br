import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';
import Link from 'components/Link';
import Quotes from 'components/Quotes';

import styles from './HomeTry.css';

const HomeTry = ({ title, text, actionsLeft, actionsRight }) => (
    <div className={styles.root}>
        <div className={styles.imageWrapper}>
            <picture className={styles.image}>
                <source
                    media="(min-width: 1200px)"
                    srcSet="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=1092 1092w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=2184 2184w"
                    sizes="1092px"
                />
                <source
                    media="(min-width: 900px)"
                    srcSet="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=794 794w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=1588 1588w"
                    sizes="794px"
                />
                <source
                    media="(min-width: 600px)"
                    srcSet="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=660 660w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=1320 1320w"
                    sizes="660px"
                />
                <source
                    media="(min-width: 0px)"
                    srcSet="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=360 360w,https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/section-2-try/0/fc00235e8d.jpg?quality=70&amp;width=720 720w"
                    sizes="360px"
                />
                <img
                    alt=""
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                />
            </picture>
        </div>
        <div className={styles.body}>
            <div className={styles.textBlock}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.text}>{text}</p>
                <div className={styles.actions}>{actionsLeft}</div>
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
