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

import { isProd, createSession } from 'utils';
import { useApp } from 'hooks';
import { AppProvider } from 'AppContext';

import { createClient } from 'server/apollo';
import App from './App';

// if (isProd && process.env.REACT_APP_GA_TRACKING_ID) {
//     const ReactGA = require('react-ga');

//     ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
// }

if (!isProd) {
    // for debugging GTM
    window.dataLayer = [];
}

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
    const session = createSession();
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

if (process.env.SSR || isProd) {
    loadableReady(init);
} else {
    init();
}
