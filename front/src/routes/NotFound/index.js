import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import { RouteStatus } from 'utils';

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
                    <Title>
                        <FormattedMessage id="not_found_title" />
                    </Title>
                    <p>
                        <FormattedMessage
                            id="not_found_text"
                            values={{
                                homelink: msg => <Link to="/">{msg}</Link>,
                            }}
                        />
                    </p>
                </div>
            </RouteStatus>
        );
    }
}

export default withRouter(NotFound);
