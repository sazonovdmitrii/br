import React, { useMemo, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { IntlProvider, injectIntl } from 'react-intl';

import routes from 'routes';
import SEO from 'globalMeta';
import LANGS from 'lang';
import { isProd } from 'utils';

import NotFound from 'routes/NotFound';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';

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
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            {/* primary color */}
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0099d5" />
            <meta name="msapplication-TileColor" content="#ffffff" />
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
    }, [lang, setLang]);

    useEffect(() => {
        import(/* webpackChunkName: 'i18n-[request]' */ `lang/${lang}.json`).then(resp => {
            setMessages(resp.default);
        });
    }, [lang]);

    if (!finalMessages) return null;

    return (
        <IntlProvider locale={lang} messages={finalMessages}>
            {isProd && <ScrollToTop />}
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
