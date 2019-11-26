import React, { useMemo, useState, useEffect } from 'react';
import { Switch, Route, withRouter } from 'react-router';
import Helmet from 'react-helmet';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { IntlProvider } from 'react-intl';

import routes from 'routes';
import SEO from 'globalMeta';
import LANGS from 'lang';
import { isProd } from 'utils';
import { useFormatMessage, useApp } from 'hooks';

import NotFound from 'routes/NotFound';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import Snackbar, { SnackbarOverlay } from 'components/Snackbar';

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

const Meta = withRouter(({ lang, location: { pathname }, match: { path } }) => {
    const [defaultTitle] = useFormatMessage([{ id: 'meta_title' }]);

    return (
        <Helmet defaultTitle={defaultTitle} titleTemplate={SEO.titleTemplate}>
            <html lang={lang} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {LANGS.map(item => {
                const isDefault = item.default;
                const isActive = item.value === lang;
                const href = `/${isDefault ? '' : `${item.value}/`}${pathname
                    .replace(path, '')
                    .replace(/^\//, '')}`;

                return <link key={item.value} rel="alternate" hrefLang={item.value} href={href} />;
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
    const { notifications, removeNotification } = useApp();
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
        <IntlProvider locale={lang} key={lang} messages={finalMessages}>
            {isProd && <ScrollToTop />}
            <Meta lang={lang} />
            <Header lang={lang} />
            <Switch>
                {routes({ lang, defaultLang }).map(([Component, props], index) => (
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    <Route key={index} {...props}>
                        <Component lang={lang} />
                    </Route>
                ))}
            </Switch>
            <Footer lang={lang} />
            <SnackbarOverlay>
                {notifications.map(item => (
                    <Snackbar
                        key={item.id}
                        text={item.message}
                        active={!!item.message}
                        theme={item.type}
                        onClose={() => removeNotification(item.id)}
                        overlay={false}
                    />
                ))}
            </SnackbarOverlay>
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
