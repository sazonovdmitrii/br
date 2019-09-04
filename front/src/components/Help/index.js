import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Help = ({ className }) => {
    const rootClassName = cx(styles.root, className);

    return (
        <div className={rootClassName}>
            <h4 className={styles.title}>
                <FormattedMessage id="need_a_hand" />?
            </h4>
            <div className={styles.text}>
                <p>
                    <FormattedMessage
                        id="help_subtitle"
                        values={{ phone: '+7 (999) 1234-56-78', time: '9' }}
                    />
                </p>
            </div>
            <ul className={styles.items}>
                <li>
                    <a href="tel:888.492.7297" className={styles.item}>
                        <span className="c-footer-help__icon">
                            <img
                                src="//i.warbycdn.com/v/c/assets/footer-help-links/image/call/0/4c3e625035.png"
                                alt="Call icon"
                                className={styles.icon}
                                role="presentation"
                            />
                        </span>
                        <span className={styles.itemTitle}>
                            <FormattedMessage id="call" />
                        </span>
                    </a>
                </li>
                <li>
                    <a href="/help" className={styles.item}>
                        <span className="c-footer-help__icon">
                            <img
                                src="//i.warbycdn.com/v/c/assets/footer-help-links/image/faq/1/193cc9c0a3.png"
                                alt="FAQ icon"
                                className={styles.icon}
                                role="presentation"
                            />
                        </span>
                        <span className={styles.itemTitle}>
                            <FormattedMessage id="faq" />
                        </span>
                    </a>
                </li>
                <li>
                    <a href="mailto:help@warbyparker.com" className={styles.item}>
                        <span className="c-footer-help__icon">
                            <img
                                src="//i.warbycdn.com/v/c/assets/footer-help-links/image/email/1/245dc93278.png"
                                alt="Email icon"
                                className={styles.icon}
                                role="presentation"
                            />
                        </span>
                        <span className={styles.itemTitle}>
                            <FormattedMessage id="email" />
                        </span>
                    </a>
                </li>
                <li>
                    <a href="sms:646.374.2771" className={styles.item}>
                        <span className="c-footer-help__icon">
                            <img
                                src="//i.warbycdn.com/v/c/assets/footer-help-links/image/text/0/9a4b86a9f6.png"
                                alt="Text icon"
                                className={styles.icon}
                                role="presentation"
                            />
                        </span>
                        <span className={styles.itemTitle}>
                            <FormattedMessage id="text" />
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#livechat" className={styles.item}>
                        <span className="c-footer-help__icon">
                            <img
                                src="//i.warbycdn.com/v/c/assets/footer-help-links/image/chat/1/21f6e570fb.png"
                                alt="Chat icon"
                                className={styles.icon}
                                role="presentation"
                            />
                        </span>
                        <span className={styles.itemTitle}>
                            <FormattedMessage id="chat" />
                        </span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

Help.defaultProps = {};

Help.propTypes = {};

export default Help;
