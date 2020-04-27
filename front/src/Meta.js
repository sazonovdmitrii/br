import React, { useMemo, useEffect } from 'react';
import { withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import LANGS from 'lang';
import { isProd } from 'utils';
import { useFormatMessage } from 'hooks';
import SEO from 'globalMeta';

const LIVETEX = `window['l'+'i'+'ve'+'Te'+'x']=!0,window['liv'+'e'+'Tex'+'ID']=163611,window['li'+'veTex_'+'obje'+'ct']=!0,(function(d,s){var t=d['create'+'El'+'em'+'ent'](s);t.type='text/javascript';t.async=!0;t.src='//cs15.'+'livet'+'ex.ru/js/c'+'l'+'ient.js';var c=d['getE'+'le'+'ment'+'sByTag'+'Name'](s)[0];c?c['p'+'aren'+'t'+'Node']['inser'+'t'+'Befo'+'re'](t,c):d['doc'+'u'+'me'+'n'+'tEleme'+'nt']['first'+'Ch'+'i'+'ld']['app'+'en'+'dCh'+'i'+'ld'](t);})(document,'script');`;
const GTM = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PV7HJ4Z');`;
// Anti-Flicker Snippet Google Optimize
const AFSGO = `(function(a,s,y,n,c,h,i){s.className+=' '+y;h.start=1*new Date;h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};(a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;})(window,document.documentElement,'async-hide','dataLayer',2000,{'GTM-PV7HJ4Z':true});`;
const YANDEX_METRIKA = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
ym(55754116, "init", {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true,
    webvisor:true,
    trackHash:true,
    ecommerce:"dataLayer"
});`;

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
        <>
            <Helmet defaultTitle={defaultTitle} titleTemplate={SEO.titleTemplate}>
                <html lang={lang} />
                {!disabledLiveTex && isProd && <script>{LIVETEX}</script>}
                {isProd && <script>{GTM}</script>}
                {isProd && <script>{YANDEX_METRIKA}</script>}
                {isProd && <script>{AFSGO}</script>}
                {/* 16103 */}
                {isProd && <style>{`.async-hide { opacity: 0 !important}`}</style>}
                {/* 16103 */}
                <link rel="preconnect" href="https://cs15.livetex.ru" />
                <link rel="preconnect" href="https://www.facebook.com" />
                <link rel="preconnect" href="https://mc.yandex.ru" />
                <link rel="preconnect" href="https://www.google-analytics.com" />
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
            {isProd && (
                <>
                    <noscript>
                        <iframe
                            src="https://www.googletagmanager.com/ns.html?id=GTM-NLL4WS"
                            height="0"
                            width="0"
                            style={{ display: 'none', visibility: 'hidden' }}
                        />
                    </noscript>
                    <noscript>
                        <div>
                            <img
                                src="https://mc.yandex.ru/watch/55754116"
                                style={{ position: 'absolute', left: '-9999px' }}
                                alt=""
                            />
                        </div>
                    </noscript>
                </>
            )}
        </>
    );
};

export default withRouter(Meta);
