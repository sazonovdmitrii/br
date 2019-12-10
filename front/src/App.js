import React, { useMemo, useState, useEffect } from 'react';
import { Switch, Route } from 'react-router';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { IntlProvider } from 'react-intl';

import routes from 'routes';
import LANGS from 'lang';
import { isProd } from 'utils';
import { useApp } from 'hooks';
import { withErrorBoundary } from 'hoc';

import NotFound from 'routes/NotFound';
import Header from 'components/Header';
import Footer from 'components/Footer';
import ScrollToTop from 'components/ScrollToTop';
import Snackbar, { SnackbarOverlay } from 'components/Snackbar';

import Meta from './Meta';

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
                {routes({ lang, defaultLang }).map(([Component, props], index) => {
                    const ComponentWithError = withErrorBoundary(Component);

                    return (
                        // eslint-disable-next-line react/jsx-props-no-spreading
                        <Route key={index} {...props}>
                            <ComponentWithError lang={lang} />
                        </Route>
                    );
                })}
            </Switch>
            <Footer lang={lang} />
            {notifications.length ? (
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
            ) : null}
        </IntlProvider>
    );
};

export default () => (
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
