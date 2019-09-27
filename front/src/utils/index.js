import React from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import { useLocation } from 'react-router';

import { useLang } from 'hooks';
import SEO from 'globalMeta';

export const isProd = process.env.NODE_ENV === 'production';
export const isBrowser = typeof window !== 'undefined';

export const RouteStatus = props => (
    <Route
        render={({ staticContext }) => {
            // we have to check if staticContext exists
            // because it will be undefined if rendered through a BrowserRouter
            if (staticContext) {
                staticContext.statusCode = props.statusCode;
            }

            return props.children;
        }}
    />
);

export const SeoHead = props => {
    const { type, image } = props;
    const { pathname: url } = useLocation();
    const { title, description, keywords, ogType = 'website' } = SEO[type](props);
    const { lang } = useLang();

    return (
        <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={`${SEO.url}${url}`} />
            {image && <meta property="og:image" content={`${SEO.url}${image}`} />}
            <meta property="og:site_name" content={SEO.fullSiteName} />
            <meta property="og:locale" content={lang} />
        </Helmet>
    );
};

export const createMarkup = __html => ({
    __html,
});
