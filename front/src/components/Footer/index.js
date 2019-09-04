import React from 'react';
import { Link } from 'react-router-dom';

import FooterMenu from 'components/FooterMenu';
import Socials from 'components/Socials';
import Help from 'components/Help';

import styles from './styles.css';

export default () => {
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
                    <ul className="c-footer-country-selector u-db u-list-reset">
                        <li className="c-footer-country-selector__item u-dib">
                            <Link
                                href="/country/us"
                                className="c-footer-country-selector__link u-color--dark-gray-alt-3 u-dib u-p10 u-fs10 u-fs12--600 u-link--nav -active"
                            >
                                USA
                            </Link>
                        </li>
                        <li className="c-footer-country-selector__item u-dib">
                            <Link
                                href="/country/ca"
                                className="c-footer-country-selector__link u-color--dark-gray-alt-3 u-dib u-p10 u-fs10 u-fs12--600 u-link--nav"
                            >
                                Canada
                            </Link>
                        </li>
                    </ul>
                    <div className={styles.socials}>
                        <Socials />
                    </div>
                </div>
                <ul className={styles.bottomMenu}>
                    <li className={styles.bottomMenuItem}>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link href="/notice-of-privacy-practices">Notice of Privacy Practices</Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link href="/terms-of-use">Terms of Use</Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link href="/accessibility">Accessibility</Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link href="/process/ca-transparency-act">CA Transparency Act</Link>
                    </li>
                </ul>
            </section>
        </footer>
    );
};
