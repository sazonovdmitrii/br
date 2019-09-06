import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Route, withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import SEO from 'globalMeta';

import NotFound from 'routes/NotFound';

import Loader from 'components/Loader';
import ErrorMessage from 'components/Error';

export const isProd = process.env.NODE_ENV === 'production';

export const RouteStatus = props => (
    <Route
        render={({ staticContext }) => {
            // we have to check if staticContext exists
            // because it will be undefined if rendered through a BrowserRouter
            if (staticContext) {
                staticContext.statusCode = props.statusCode;
            }

            return <div>{props.children}</div>;
        }}
    />
);

export const SeoHead = withRouter(props => {
    const {
        type,
        location: { pathname: url },
        image,
    } = props;
    const { title, description, keywords, ogType = 'website' } = SEO[type](props);
    const {
        data: { lang },
    } = useQuery(
        gql`
            {
                lang @client
            }
        `
    );

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
});

export const withQuery = ({ query, variables }) => Component => {
    const { data, loading, error } = useQuery(query, { variables });

    if (loading) return <Loader />;
    if (error) {
        return (
            <>
                <NotFound />
                <ErrorMessage error={error} />
            </>
        );
    }
    const newData = Object.values(data).reduce((obj, item) => {
        return { ...obj, ...item };
    }, {});

    if (newData) {
        return Component(newData);
    }

    return null;
};
