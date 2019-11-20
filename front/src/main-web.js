import './polyfills';
import 'destyle.css';
import './fonts';
import './globalStyles.css';

import React from 'react';
import { render, hydrate } from 'react-dom';
import { Router } from 'react-router';
import { hot } from 'react-hot-loader/root';
import { ApolloProvider } from '@apollo/react-common';
import { createBrowserHistory } from 'history';
import { loadableReady } from '@loadable/component';
import hardtack from 'hardtack';
import nanoid from 'nanoid';

// import { isProd } from 'utils';
import { useApp } from 'hooks';
import { AppProvider } from 'AppContext';

import { createClient } from 'lib/apollo';
import App from './App';

// if (isProd && process.env.REACT_APP_GA_TRACKING_ID) {
//     const ReactGA = require('react-ga');

//     ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
// }

const history = createBrowserHistory();
const HotApp = hot(App);

const RootApp = () => {
    const { client } = useApp();

    return (
        <ApolloProvider client={client}>
            <Router history={history}>
                <HotApp />
            </Router>
        </ApolloProvider>
    );
};
const init = () => {
    const root = document.querySelector('#root');
    const token = hardtack.get('token');
    let session = hardtack.get('session_key');

    if (!session) {
        const date = new Date();
        const currentYear = date.getFullYear();
        session = nanoid();

        date.setFullYear(currentYear + 1);
        hardtack.set('session_key', session, {
            path: '/',
            expires: date.toUTCString(),
        });
    }
    const client = createClient({ session, token });

    const app = (
        <AppProvider initialStore={{ client }}>
            <RootApp />
        </AppProvider>
    );

    if (root.hasChildNodes()) {
        hydrate(app, root);
    } else {
        render(app, root);
    }
};

if (process.env.SSR) {
    loadableReady(init);
} else {
    init();
}
