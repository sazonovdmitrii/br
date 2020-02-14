import React from 'react';
import { FormattedMessage } from 'react-intl';
import classnames from 'classnames/bind';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default ({ className, messages = [], coupon, actions, pricing = [] }) => {
    const rootClassName = cx(styles.root, className);

    return (
        <div className={rootClassName}>
            {messages.length ? (
                <ul className={styles.list}>
                    {messages.map(item => (
                        <li key={item} className={styles.listItem}>
                            <FormattedMessage id={item} />
                        </li>
                    ))}
                </ul>
            ) : null}
            <div className={styles.reverse}>
                <div className={styles.pricing}>
                    {pricing.map(({ name, value }) => (
                        <p key={name} className={styles.pricingItem}>
                            <FormattedMessage id={name} />
                            <span className={styles.pricingValue}>
                                {value ? (
                                    <FormattedMessage id="currency" values={{ price: value }} />
                                ) : (
                                    <FormattedMessage id="free" />
                                )}
                            </span>
                        </p>
                    ))}
                </div>
                {coupon && <div className={styles.coupon}>{coupon}</div>}
            </div>
            <div className={styles.actions}>
                <div className={styles.actionsInner}>{actions}</div>
            </div>
        </div>
    );
};
