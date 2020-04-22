import React from 'react';
import serialize from 'serialize-javascript';

const isProd = process.env.NODE_ENV === 'production';

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
            {helmet.style.toComponent()}
        </head>
        <body>
            <div id="root" dangerouslySetInnerHTML={{ __html: html }} />
            <script
                dangerouslySetInnerHTML={{
                    __html: Object.keys(window).reduce(
                        (out, key) => (out += `window.${key}=${serialize(window[key], { isJSON: true })};`),
                        ''
                    ),
                }}
            />
            {bundle.getScriptElements()}
        </body>
    </html>
);
