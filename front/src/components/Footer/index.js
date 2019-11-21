import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';
import { FormattedMessage } from 'react-intl';

import FooterMenu from 'components/FooterMenu';
import Socials from 'components/Socials';
import Help from 'components/Help';

import LANGS from 'lang';

import CopyrightMenu from './CopyrightMenu';
import styles from './styles.css';

const cx = classnames.bind(styles);

const Footer = ({ lang }) => (
    <footer id="footer" className={styles.root}>
        <section className={styles.top}>
            <div className={styles.row}>
                <FooterMenu lang={lang} className={styles.menu} />
                <Help className={styles.help} />
            </div>
        </section>
        <section className={styles.bottom}>
            <div className={styles.countries}>
                <ul>
                    {LANGS.map(({ value, default: defaultLang, native }) => {
                        const countryLink = cx(styles.countryLink, { active: value === lang });

                        return (
                            <li key={native} className={styles.countryItem}>
                                <a href={`/${!defaultLang ? value : ''}`} className={countryLink}>
                                    {native}
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
        <section className={styles.copyright}>
            <FormattedMessage id="c_footer_copyright" values={{ br: <br /> }} />
        </section>
        <section className={styles.disclamer}>
            <FormattedMessage id="c_footer_disclamer" />
        </section>
    </footer>
);

Footer.propTypes = {
    lang: PropTypes.string.isRequired,
};

export default Footer;
