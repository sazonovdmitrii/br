import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames/bind';

import UserMenu from 'components/UserMenu';
import HeaderMenu from 'components/HeaderMenu';
import Container from 'components/Container';

import logo from './images/logo.png';
import mobileMenuIcon from './images/mobile.png';

import styles from './styles.css';

const cx = classnames.bind(styles);

export default () => {
    const [open, setOpen] = useState(false);
    const iconClassName = cx(styles.burgerIcon, {
        open,
    });

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <header className={styles.root}>
            <Container>
                <div className={styles.content}>
                    <div className={styles.row}>
                        <div className={styles.item}>
                            <button type="button" className={styles.button} onClick={handleClick}>
                                <svg className={iconClassName} viewBox="0 0 13 16" focusable="false">
                                    <g>
                                        <rect width="13" height="1.15" rx=".5" />
                                        <rect width="13" height="1.15" rx=".5" y="4.25" />
                                        <rect width="13" height="1.15" rx=".5" y="8.5" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                        <div className={styles.item}>
                            <Link to="/" className={styles.logo}>
                                <img
                                    className="header__logolink--img"
                                    src={logo}
                                    title="LaParfumerie.ru"
                                    alt="Laparfumerie.ru - интернет-магазин парфюмерии и косметики"
                                />
                            </Link>
                        </div>
                        <div className={styles.item}>
                            <UserMenu />
                        </div>
                    </div>
                </div>
            </Container>
            <HeaderMenu active={open} />
        </header>
    );
};
