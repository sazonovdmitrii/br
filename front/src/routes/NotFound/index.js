import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

import { RouteStatus } from 'utils';

import Button from 'components/Button';
import Link from 'components/Link';
import Title from 'components/Title';

import styles from './styles.css';

class NotFound extends Component {
    staticContext = {};

    render() {
        return (
            <RouteStatus statusCode={404}>
                <Helmet>
                    <meta name="robots" content="noindex" />
                </Helmet>
                <div className={styles.root}>
                    <p className={styles.text}>404</p>
                    <Title>Our Apologies</Title>
                    <p>
                        Return{' '}
                        <Link
                        /* TODO prev page*/
                        >
                            to the previous page
                        </Link>{' '}
                        or go back to our <Link to="/">homepage</Link>.
                    </p>
                </div>
            </RouteStatus>
        );
    }
}

export default NotFound;
