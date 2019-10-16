import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import classnames from 'classnames/bind';
import chatIcon from './images/chat.png';
import smsIcon from './images/sms.png';
import phoneIcon from './images/phone.png';
import faqIcon from './images/faq.png';
import emailIcon from './images/email.png';

import styles from './styles.css';

const cx = classnames.bind(styles);

const Help = ({ className, socials }) => {
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
                        values={{ phone: '8 (495) 587 98 99', time: '8', timeEnd: '21' }}
                    />
                </p>
            </div>
            {socials.length ? (
                <ul className={styles.items}>
                    <li className={styles.item}>
                        <a href="tel:" className={styles.link}>
                            <span className={styles.icon}>
                                <img src={phoneIcon} alt="Call icon" />
                            </span>
                            <span className={styles.itemTitle}>
                                <FormattedMessage id="call" />
                            </span>
                        </a>
                    </li>
                    <li className={styles.item}>
                        <Link to="#" className={styles.link}>
                            <span className={styles.icon}>
                                <img src={faqIcon} alt="FAQ icon" className={styles.icon} />
                            </span>
                            <span className={styles.itemTitle}>
                                <FormattedMessage id="faq" />
                            </span>
                        </Link>
                    </li>
                    <li className={styles.item}>
                        <a href="#" className={styles.link}>
                            <span className={styles.icon}>
                                <img src={emailIcon} alt="Email icon" />
                            </span>
                            <span className={styles.itemTitle}>
                                <FormattedMessage id="email" />
                            </span>
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a href="#" className={styles.link}>
                            <span className={styles.icon}>
                                <img src={smsIcon} alt="Text icon" />
                            </span>
                            <span className={styles.itemTitle}>
                                <FormattedMessage id="text" />
                            </span>
                        </a>
                    </li>
                    <li className={styles.item}>
                        <a href="#" className={styles.link}>
                            <span className={styles.icon}>
                                <img src={chatIcon} alt="Chat icon" />
                            </span>
                            <span className={styles.itemTitle}>
                                <FormattedMessage id="chat" />
                            </span>
                        </a>
                    </li>
                </ul>
            ) : null}
        </div>
    );
};

Help.defaultProps = {
    className: null,
    socials: [],
};

Help.propTypes = {
    className: PropTypes.string,
    socials: PropTypes.arrayOf(PropTypes.string),
};

export default Help;
