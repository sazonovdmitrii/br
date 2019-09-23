import React, { useMemo, useState } from 'react';
import { withRouter, Switch, Route } from 'react-router';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { IntlProvider, FormattedMessage, injectIntl } from 'react-intl';

import routes from 'routes';
import SEO from 'globalMeta';
import LANGS from 'lang';

import NotFound from 'routes/NotFound';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Container from 'components/Container';
import ScrollToTop from 'components/ScrollToTop';
// import ErrorBoundary from 'components/ErrorBoundary';

const FAVS = [
    {
        sizes: '16x16',
        path: '/favicons/favicon-16x16.png',
    },
    {
        sizes: '32x32',
        path: '/favicons/favicon-32x32.png',
    },
    {
        sizes: '96x96',
        path: '/favicons/favicon-96x96.png',
    },
];

const APPLE_TOUCH_ICON = [
    {
        path: '/favicons/apple-icon.png',
    },
    {
        sizes: '57x57',
        path: '/favicons/apple-icon-57x57.png',
    },
    {
        sizes: '60x60',
        path: '/favicons/apple-icon-60x60.png',
    },
    {
        sizes: '72x72',
        path: '/favicons/apple-icon-72x72.png',
    },
    {
        sizes: '76x76',
        path: '/favicons/apple-icon-76x76.png',
    },
    {
        sizes: '114x114',
        path: '/favicons/apple-icon-114x114.png',
    },
    {
        sizes: '120x120',
        path: '/favicons/apple-icon-120x120.png',
    },
    {
        sizes: '144x144',
        path: '/favicons/apple-icon-144x144.png',
    },
    {
        sizes: '152x152',
        path: '/favicons/apple-icon-152x152.png',
    },
    {
        sizes: '180x180',
        path: '/favicons/apple-icon-180x180.png',
    },
];

const GET_MESSAGES = gql`
    query getMessages($lang: String) {
        getMessages(lang: $lang) @client
    }
`;

const SET_LANG_MUTATION = gql`
    mutation setLang($lang: String) {
        setLang(lang: $lang) @client
    }
`;

const defaultLang = LANGS.find(item => item.default);

const Meta = injectIntl(({ intl, lang }) => {
    const defaultTitle = intl.formatMessage({ id: 'meta_title' });

    return (
        <Helmet defaultTitle={defaultTitle} titleTemplate={SEO.titleTemplate}>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
            />
            <html lang={lang} />
            {LANGS.map((item, index) => {
                return (
                    <link
                        key={index}
                        rel="alternate"
                        hrefLang={item.value === lang ? 'x-default' : item.value}
                        href={`/${item.default ? '' : `${item.value}/`}`}
                    />
                );
            })}
            <link rel="shortcut icon" href="/favicon.ico" />
            {FAVS.map(({ sizes, path }, index) => (
                <link key={index} rel="icon" type="image/png" sizes={sizes} href={path} />
            ))}
            {APPLE_TOUCH_ICON.map(({ sizes, path }, index) => (
                <link key={index} rel="apple-touch-icon" sizes={sizes} href={path} />
            ))}
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="/favicons/ms-icon-144x144.png" />
            <meta name="msapplication-config" content="/browserconfig.xml" />
            <meta name="theme-color" content="#ffffff" />
        </Helmet>
    );
});

const App = ({ lang }) => {
    const { data: { getMessages = {} } = {} } = useQuery(GET_MESSAGES, { variables: { lang } });
    const [setLang] = useMutation(SET_LANG_MUTATION, {
        variables: { lang },
    });
    const [finalMessages, setMessages] = useState(getMessages);

    useMemo(() => {
        setLang();
    }, [lang]);

    if (typeof window !== undefined) {
        import(/* webpackChunkName: 'i18n-[request]' */ `lang/${lang}.json`).then(resp => {
            setMessages(resp.default);
        });
    }

    if (!finalMessages) return null;

    return (
        <IntlProvider locale={lang} messages={finalMessages}>
            <ScrollToTop />
            <Meta lang={lang} />
            <Header />
            <Switch>
                {routes({ lang, defaultLang }).map((route, index) => (
                    <Route key={index} {...route} />
                ))}
            </Switch>
            <Footer />
        </IntlProvider>
    );
};

export default () => {
    return (
        <Switch>
            {LANGS.map((item, index) => (
                <Route
                    key={index}
                    path={`/${item.default ? '' : item.value}`}
                    component={() => <App lang={item.value} />}
                />
            ))}
            <Route component={NotFound} />
        </Switch>
    );
};
