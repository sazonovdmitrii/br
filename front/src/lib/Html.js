import React from 'react';

const isProd = process.env.NODE_ENV === 'production';
const GTM = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-NLL4WS');`;
const LIVETEX = `window['l'+'i'+'ve'+'Te'+'x']=!0,window['liv'+'e'+'Tex'+'ID']=163611,window['li'+'veTex_'+'obje'+'ct']=!0,(function(d,s){var t=d['create'+'El'+'em'+'ent'](s);t.type='text/javascript';t.async=!0;t.src='//cs15.'+'livet'+'ex.ru/js/c'+'l'+'ient.js';var c=d['getE'+'le'+'ment'+'sByTag'+'Name'](s)[0];c?c['p'+'aren'+'t'+'Node']['inser'+'t'+'Befo'+'re'](t,c):d['doc'+'u'+'me'+'n'+'tEleme'+'nt']['first'+'Ch'+'i'+'ld']['app'+'en'+'dCh'+'i'+'ld'](t);
})(document,'script');`;
// Anti-Flicker Snippet Google Optimize
const AFSGO = `(function(a,s,y,n,c,h,i){s.className+=' '+y;h.start=1*new Date;h.end=i=function(){s.className=s.className.replace(RegExp(' ?'+y),'')};(a[n]=a[n]||[]).hide=h;setTimeout(function(){i();h.end=null},c);h.timeout=c;})(window,document.documentElement,'async-hide','dataLayer',4000, {'GTM-PV7HJ4Z':true});`;

export default ({ bundle, helmet, html, window = {} }) => (
    <html {...helmet.htmlAttributes.toString()}>
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            {helmet.title.toComponent()}
            {bundle.getLinkElements()}
            {bundle.getStyleElements()}

            {helmet.meta.toComponent()}
            {helmet.link.toComponent()}
            {helmet.script.toComponent()}
            {helmet.noscript.toComponent()}
            {isProd && (
                <>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: GTM,
                        }}
                    />
                    {/* 16103 */}
                    <script
                        dangerouslySetInnerHTML={{
                            __html: AFSGO,
                        }}
                    />
                    <style>{`.async-hide { opacity: 0 !important}`}</style>
                    {/* 16103 */}
                </>
            )}
        </head>
        <body>
            {isProd && (
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-PV7HJ4Z"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
            )}
            <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
            <script
                dangerouslySetInnerHTML={{
                    __html: Object.keys(window).reduce(
                        (out, key) => (out += `window.${key}=${JSON.stringify(window[key])};`),
                        ''
                    ),
                }}
            />
            {bundle.getScriptElements()}
            {isProd && (
                <script
                    dangerouslySetInnerHTML={{
                        __html: LIVETEX,
                    }}
                />
            )}
        </body>
    </html>
);
