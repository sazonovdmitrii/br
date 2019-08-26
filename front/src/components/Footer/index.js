import React from 'react';
import { Link } from 'react-router-dom';

import FooterTopBrands from 'components/FooterTopBrands';
import FooterMenu from 'components/FooterMenu';
import Share from 'components/Share';
import Subscribe from 'components/Subscribe';
import Container from 'components/Container';

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
                    <div className={styles.help}>
                        <h4 className={styles.helpTitle}>Need a hand?</h4>
                        <div className={styles.helpText}>
                            <p className="c-footer-help__markdown__p">
                                We’re available by phone (888.492.7297) every day from 9 a.m.–9 p.m. ET.
                            </p>
                        </div>
                        <ul className={styles.helpItems}>
                            <li>
                                <a href="tel:888.492.7297" className={styles.helpItem}>
                                    <span className="c-footer-help__icon">
                                        <img
                                            src="//i.warbycdn.com/v/c/assets/footer-help-links/image/call/0/4c3e625035.png"
                                            alt="Call icon"
                                            className={styles.helpIcon}
                                            role="presentation"
                                        />
                                    </span>
                                    <span className={styles.helpItemTitle}>Call</span>
                                </a>
                            </li>
                            <li>
                                <a href="/help" className={styles.helpItem}>
                                    <span className="c-footer-help__icon">
                                        <img
                                            src="//i.warbycdn.com/v/c/assets/footer-help-links/image/faq/1/193cc9c0a3.png"
                                            alt="FAQ icon"
                                            className={styles.helpIcon}
                                            role="presentation"
                                        />
                                    </span>
                                    <span className={styles.helpItemTitle}>FAQ</span>
                                </a>
                            </li>
                            <li>
                                <a href="mailto:help@warbyparker.com" className={styles.helpItem}>
                                    <span className="c-footer-help__icon">
                                        <img
                                            src="//i.warbycdn.com/v/c/assets/footer-help-links/image/email/1/245dc93278.png"
                                            alt="Email icon"
                                            className={styles.helpIcon}
                                            role="presentation"
                                        />
                                    </span>
                                    <span className={styles.helpItemTitle}>Email</span>
                                </a>
                            </li>
                            <li>
                                <a href="sms:646.374.2771" className={styles.helpItem}>
                                    <span className="c-footer-help__icon">
                                        <img
                                            src="//i.warbycdn.com/v/c/assets/footer-help-links/image/text/0/9a4b86a9f6.png"
                                            alt="Text icon"
                                            className={styles.helpIcon}
                                            role="presentation"
                                        />
                                    </span>
                                    <span className={styles.helpItemTitle}>Text</span>
                                </a>
                            </li>
                            <li>
                                <a href="#livechat" className={styles.helpItem}>
                                    <span className="c-footer-help__icon">
                                        <img
                                            src="//i.warbycdn.com/v/c/assets/footer-help-links/image/chat/1/21f6e570fb.png"
                                            alt="Chat icon"
                                            className={styles.helpIcon}
                                            role="presentation"
                                        />
                                    </span>
                                    <span className={styles.helpItemTitle}>Chat</span>
                                </a>
                            </li>
                        </ul>
                    </div>
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
                    <div className="c-footer-social u-df u-flexd--r u-ai--c u-jc--sa">
                        <ul className="c-footer-social__list u-list-reset u-df u-flexd--r u-ai--c u-jc--sb">
                            <li className="c-footer-social__item -facebook">
                                <a
                                    href="https://www.facebook.com/warbyparker"
                                    target="_blank"
                                    className="c-footer-social__link"
                                >
                                    <span className="c-external-svg c-facebook-icon c-footer-social__icon">
                                        <span className="c-facebook-icon__image u-db u-h0 u-pb1x1 u-bgr--nr">
                                            <span className="u-hide--visual">Facebook</span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li className="c-footer-social__item -instagram">
                                <a
                                    href="https://www.instagram.com/warbyparker/"
                                    target="_blank"
                                    className="c-footer-social__link"
                                >
                                    <span className="c-external-svg c-instagram-icon c-footer-social__icon">
                                        <span className="c-instagram-icon__image u-db u-h0 u-pb1x1 u-bgr--nr">
                                            <span className="u-hide--visual">Instagram</span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li className="c-footer-social__item -youtube">
                                <a
                                    href="https://www.youtube.com/warbyparker/"
                                    target="_blank"
                                    className="c-footer-social__link"
                                >
                                    <span className="c-external-svg c-youtube-icon c-footer-social__icon">
                                        <span className="c-youtube-icon__image u-db u-h0 u-pb1x1 u-bgr--nr">
                                            <span className="u-hide--visual">Youtube</span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li className="c-footer-social__item -twitter">
                                <a
                                    href="https://twitter.com/warbyparker"
                                    target="_blank"
                                    className="c-footer-social__link"
                                >
                                    <span className="c-external-svg c-twitter-icon c-footer-social__icon">
                                        <span className="c-twitter-icon__image u-db u-h0 u-pb1x1 u-bgr--nr">
                                            <span className="u-hide--visual">Twitter</span>
                                        </span>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <ul className={styles.bottomMenu}>
                    <li className={styles.bottomMenuItem}>
                        <a href="/privacy-policy" className="c-footer-legal__link u-color--dark-gray-alt-3">
                            Privacy Policy
                        </a>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <a
                            href="/notice-of-privacy-practices"
                            className="c-footer-legal__link u-color--dark-gray-alt-3"
                        >
                            Notice of Privacy Practices
                        </a>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <a href="/terms-of-use" className="c-footer-legal__link u-color--dark-gray-alt-3">
                            Terms of Use
                        </a>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <a href="/accessibility" className="c-footer-legal__link u-color--dark-gray-alt-3">
                            Accessibility
                        </a>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <a
                            href="/process/ca-transparency-act"
                            className="c-footer-legal__link u-color--dark-gray-alt-3"
                        >
                            CA Transparency Act
                        </a>
                    </li>
                </ul>
            </section>
        </footer>
    );
};
