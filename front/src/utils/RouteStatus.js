import React from 'react';
import { Route } from 'react-router-dom';

const RouteStatus = props => (
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

export default RouteStatus;
