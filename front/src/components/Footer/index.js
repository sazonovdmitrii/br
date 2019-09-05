import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import FooterMenu from 'components/FooterMenu';
import Socials from 'components/Socials';
import Help from 'components/Help';

import LANGS from 'lang';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default () => {
    const {
        data: { lang },
    } = useQuery(
        gql`
            {
                lang @client
            }
        `
    );
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
                        <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link to="/notice-of-privacy-practices">Notice of Privacy Practices</Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link to="/terms-of-use">Terms of Use</Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link to="/accessibility">Accessibility</Link>
                    </li>
                    <li className={styles.bottomMenuItem}>
                        <Link to="/process/ca-transparency-act">CA Transparency Act</Link>
                    </li>
                </ul>
            </section>
        </footer>
    );
};
