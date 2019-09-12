import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Button from 'components/Button';

import styles from './styles.css';

const Lenses = ({ title, text, items }) => (
    <div className={styles.root}>
        <picture>
            <source
                srcSet="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/inlay-edition/3/9a58136d7c.jpg"
                media="(max-width: 500px)"
            />
            <img
                src="https://i.warbycdn.com/v/c/assets/eyeglasses-LP/image/inlay-edition/4/d6fcf05363.jpg"
                alt=""
            />
        </picture>
        <div className={styles.body}>
            <div className={styles.copyBlock}>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.text}>{text}</p>
                <div className={styles.buttonDesktop}>
                    <Button to="/lenses" className={styles.button} kind="simple" size="large" bold>
                        <FormattedMessage id="find_your_lenses" />
                    </Button>
                </div>
            </div>
            <div className={styles.rightBlock}>
                {items.map(({ label, value }) => (
                    <>
                        <div className={styles.label}>{label}</div>
                        <div className={styles.value}>{value}</div>
                    </>
                ))}
            </div>
        </div>
        <div className={styles.buttonMobile}>
            <Button to="/lenses" class={styles.button} kind="simple" size="large" bold>
                <FormattedMessage id="find_your_lenses" />
            </Button>
        </div>
    </div>
);

Lenses.defaultProps = {};

Lenses.propTypes = {};

export default Lenses;
