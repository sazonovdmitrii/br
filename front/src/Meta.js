import React from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import LANGS from 'lang';
import { isProd } from 'utils';
import { useFormatMessage } from 'hooks';
import SEO from 'globalMeta';

const Meta = ({ lang, location: { pathname }, match: { path } }) => {
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
};

export default withRouter(Meta);
