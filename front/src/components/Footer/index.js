import React from 'react';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';

import FooterMenu from 'components/FooterMenu';
import Socials from 'components/Socials';
import Help from 'components/Help';

import LANGS from 'lang';

import CopyrightMenu from './CopyrightMenu';
import styles from './styles.css';

const cx = classnames.bind(styles);

export default ({ lang }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.root}>
            <section className={styles.top}>
                <div className={styles.row}>
                    <FooterMenu lang={lang} className={styles.menu} />
                    <Help className={styles.help} />
                </div>
            </section>
            <section className={styles.bottom}>
                <div className={styles.countries}>
                    <ul>
                        {LANGS.map((item, index) => {
                            const countryLink = cx(styles.countryLink, { active: item.value === lang });

                            return (
                                <li key={index} className={styles.countryItem}>
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
                <CopyrightMenu lang={lang} />
            </section>
        </footer>
    );
};
