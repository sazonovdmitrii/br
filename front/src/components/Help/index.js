import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import chatIcon from './images/chat.png';
import smsIcon from './images/sms.png';
import phoneIcon from './images/phone.png';
import faqIcon from './images/faq.png';
import emailIcon from './images/email.png';

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
                    <a href="tel:" className={styles.item}>
                        <span className="c-footer-help__icon">
                            <img
                                src={phoneIcon}
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
                    <Link to="/help" className={styles.item}>
                        <span className="c-footer-help__icon">
                            <img src={faqIcon} alt="FAQ icon" className={styles.icon} role="presentation" />
                        </span>
                        <span className={styles.itemTitle}>
                            <FormattedMessage id="faq" />
                        </span>
                    </Link>
                </li>
                <li>
                    <a href="mailto:help@warbyparker.com" className={styles.item}>
                        <span className="c-footer-help__icon">
                            <img
                                src={emailIcon}
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
                            <img src={smsIcon} alt="Text icon" className={styles.icon} role="presentation" />
                        </span>
                        <span className={styles.itemTitle}>
                            <FormattedMessage id="text" />
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#livechat" className={styles.item}>
                        <span className="c-footer-help__icon">
                            <img src={chatIcon} alt="Chat icon" className={styles.icon} role="presentation" />
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
