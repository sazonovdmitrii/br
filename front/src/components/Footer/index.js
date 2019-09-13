import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';

import { useLang } from 'hooks';

import FooterMenu from 'components/FooterMenu';
import Socials from 'components/Socials';
import Help from 'components/Help';

import LANGS from 'lang';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default () => {
    const lang = useLang();
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.root}>
            <section className={styles.top}>
                <div className={styles.row}>
                    <FooterMenu
                        className={styles.menu}
                        items={[
                            {
                                name: 'products',
                                childrens: [{ name: 'Мужские оправы', url: '/opravi-dlya-ochkov/' }],
                            },
                        ]}
                    />
                    <Help className={styles.help} />
                </div>
            </section>
            <section className={styles.bottom}>
                <div className={styles.countries}>
                    <ul>
                        {LANGS.map(item => {
                            const countryLink = cx(styles.countryLink, { active: item.value === lang });

                            return (
                                <li className={styles.countryItem}>
                                    <a href={`/${!item.default ? item.value : ''}`} className={countryLink}>
                                        {item.native}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                    <div className={styles.socials}>
                        <Socials />
                    </div>
                </div>
                <ul className={styles.bottomMenu}>
                    <li className={styles.bottomMenuItem}>
                        <Link to="/info/privacy-policy">
                            <FormattedMessage id="privacy_policy" />
                        </Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link to="/info/notice-of-privacy-practices">
                            <FormattedMessage id="notice_of_privacy_practices" />
                        </Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link to="/info/terms-of-use">
                            <FormattedMessage id="terms_of_use" />
                        </Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link to="/info/accessibility">
                            <FormattedMessage id="accessibility" />
                        </Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link to="/info/process/ca-transparency-act">
                            <FormattedMessage id="ca_transparency_act" />
                        </Link>
                    </li>
                </ul>
            </section>
        </footer>
    );
};
