import React from 'react';

import Container from 'components/Container';

import styles from './styles.css';

import firstCertificateImage from './images/cert-1.jpg';
import secondCertificateImage from './images/cert-2.jpg';

const Certificates = () => (
    <Container>
        <div className={styles.root}>
            <a
                href="/certs/certificate-1.pdf"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={firstCertificateImage} alt="" />
                Декларация о соответствии
            </a>
            <a
                href="/certs/certificate-2.pdf"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                <img src={secondCertificateImage} alt="" />
                Декларация о соответствии
            </a>
        </div>
    </Container>
);

export default Certificates;
