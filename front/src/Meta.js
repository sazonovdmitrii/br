import React, { useMemo, useEffect } from 'react';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';

import LANGS from 'lang';
import { isProd } from 'utils';
import { useFormatMessage } from 'hooks';
import SEO from 'globalMeta';

const LIVETEX = `window['l'+'i'+'ve'+'Te'+'x']=!0,window['liv'+'e'+'Tex'+'ID']=163611,window['li'+'veTex_'+'obje'+'ct']=!0,(function(d,s){var t=d['create'+'El'+'em'+'ent'](s);t.type='text/javascript';t.async=!0;t.src='//cs15.'+'livet'+'ex.ru/js/c'+'l'+'ient.js';var c=d['getE'+'le'+'ment'+'sByTag'+'Name'](s)[0];c?c['p'+'aren'+'t'+'Node']['inser'+'t'+'Befo'+'re'](t,c):d['doc'+'u'+'me'+'n'+'tEleme'+'nt']['first'+'Ch'+'i'+'ld']['app'+'en'+'dCh'+'i'+'ld'](t);})(document,'script');`;

const Meta = ({ lang, location: { pathname }, match: { path } }) => {
    const [defaultTitle] = useFormatMessage([{ id: 'meta_title' }]);
    const disabledPages = ['/cart', '/order/'];
    const disabledLiveTex = useMemo(() => disabledPages.some(page => pathname.indexOf(page) >= 0), [
        pathname,
    ]);

    useEffect(() => {
        try {
            if (disabledLiveTex) {
                window.LiveTex.hideLabel();
            } else {
                window.LiveTex.showLabel();
            }
        } catch (e) {}
    }, [disabledLiveTex]);

    return (
        <Helmet defaultTitle={defaultTitle} titleTemplate={SEO.titleTemplate}>
            <html lang={lang} />
            {!disabledLiveTex && isProd && <script>{LIVETEX}</script>}
            <link rel="preconnect" href="https://mc.yandex.ru" />
            <link rel="preconnect" href="https://www.google-analytics.com" />
            <link rel="preconnect" href="https://cs15.livetex.ru" />
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
