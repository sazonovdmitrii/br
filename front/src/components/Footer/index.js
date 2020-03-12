import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';
import { useLocation } from 'react-router';

import FooterMenu from 'components/FooterMenu';
import Socials from 'components/Socials';
import Help from 'components/Help';

import LANGS from 'lang';

import CopyrightMenu from './CopyrightMenu';
import styles from './styles.css';

const cx = classnames.bind(styles);

const Footer = ({ lang }) => {
    const { pathname } = useLocation();
    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <footer className={styles.root}>
            <section className={styles.top}>
                <div className={styles.row}>
                    <FooterMenu lang={lang} className={styles.menu} />
                    <Help className={styles.help} />
                </div>
            </section>
            <section className={styles.bottom}>
                <div className={styles.langs}>
                    <ul>
                        {LANGS.map(({ value, default: defaultLang, native }) => {
                            const isActive = value === lang;
                            const langLink = cx(styles.langLink, { active: isActive });
                            const href = `/${defaultLang ? '' : `${value}`}${pathname.replace(
                                /\/\w{2}\//,
                                ''
                            )}`;

                            return (
                                <li key={native} className={styles.langItem}>
                                    {isActive ? (
                                        <span className={langLink}>{native}</span>
                                    ) : (
                                        <a href={href} className={langLink}>
                                            {native}
                                        </a>
                                    )}
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
            <section className={styles.copyright}>
                <FormattedMessage id="c_footer_copyright" values={{ br: <br />, year: currentYear }} />
            </section>
            <section className={styles.disclamer}>
                <FormattedMessage id="c_footer_disclamer" />
            </section>
        </footer>
    );
};

Footer.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default Footer;
