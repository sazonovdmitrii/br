import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';

import { useLang } from 'hooks';
import SEO from 'globalMeta';

const SeoHead = props => {
    const { type, image } = props;
    const { pathname: url } = useLocation();
    const { title, description, keywords, og = {}, ogType = 'website' } = SEO[type](props);
    const lang = useLang();

    return (
        <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={og.title ? og.title : title} />
            <meta property="og:description" content={og.description ? og.description : description} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={`${SEO.url}${url}`} />
            {image && <meta property="og:image" content={`${SEO.url}${image}`} />}
            <meta property="og:site_name" content={SEO.fullSiteName} />
            <meta property="og:locale" content={lang} />
        </Helmet>
    );
};

export default SeoHead;
