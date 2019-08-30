import React from 'react';
import { Link } from 'react-router-dom';

import FooterTopBrands from 'components/FooterTopBrands';
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
                    <nav className={styles.menus}>
                        <div className={styles.menu}>
                            <h4 className={styles.menuTitle}>Products</h4>
                            <ul className={styles.list}>
                                <li className={styles.listItem}>
                                    <Link className={styles.link} to="/eyeglasses">
                                        Eyeglasses
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Help className={styles.help} />
                </div>
            </section>
            <section className={styles.bottom}>
                <div className={styles.countries}>
                    <ul className="c-footer-country-selector u-db u-list-reset">
                        <li className="c-footer-country-selector__item u-dib">
                            <a
                                href="/country/us"
                                className="c-footer-country-selector__link u-color--dark-gray-alt-3 u-dib u-p10 u-fs10 u-fs12--600 u-link--nav -active"
                            >
                                USA
                            </a>
                        </li>
                        <li className="c-footer-country-selector__item u-dib">
                            <a
                                href="/country/ca"
                                className="c-footer-country-selector__link u-color--dark-gray-alt-3 u-dib u-p10 u-fs10 u-fs12--600 u-link--nav"
                            >
                                Canada
                            </a>
                        </li>
                    </ul>
                    <div className={styles.socials}>
                        <Socials />
                    </div>
                </div>
                <ul className={styles.bottomMenu}>
                    <li className={styles.bottomMenuItem}>
                        <a href="/privacy-policy">Privacy Policy</a>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <a href="/notice-of-privacy-practices">Notice of Privacy Practices</a>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <a href="/terms-of-use">Terms of Use</a>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <a href="/accessibility">Accessibility</a>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <a href="/process/ca-transparency-act">CA Transparency Act</a>
                    </li>
                </ul>
            </section>
        </footer>
    );
};
