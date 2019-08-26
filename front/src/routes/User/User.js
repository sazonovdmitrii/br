import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router';
import { Helmet } from 'react-helmet';

import Nav from 'components/Nav';

import AddressBook from 'routes/AddressBook';
import NotFound from 'routes/NotFound';
import Orders from 'routes/Orders';
import Personal from 'routes/Personal';
import Register from 'routes/Register';
import RemindPassword from 'routes/RemindPassword';
import Security from 'routes/Security';
import LogIn from 'routes/LogIn';

const routes = [
    { path: '/account/register', component: Register },
    { path: '/account/login', component: LogIn },
    { path: '/account/remind-password', component: RemindPassword },
    { component: NotFound },
];

const loggedInRoutes = [
    { path: '/account/addresses', component: AddressBook },
    { path: '/account/orders', component: Orders },
    { path: '/account/profile', component: Personal },
    { path: '/account/security', component: Security },
    { path: '/account/prescription', component: null },
];

const getTitle = (params = '') => {
    switch (params) {
        case 'profile':
            return 'Персональные данные';
        case 'addresses':
            return 'Адреса';
        case 'security':
            return 'How do I reset my password?';
        case 'orders':
            return 'Мои заказы';
        case 'prescription':
            return 'Рецепты';
        default:
            return 'Личный кабинет';
    }
};

const User = ({
    match: {
        params: { slug },
    },
    isLoggedIn,
}) => {
    const titleBySlug = getTitle(slug);
    const [title, setTitle] = useState(titleBySlug);

    useEffect(() => {
        setTitle(titleBySlug);
    }, [slug, titleBySlug]);

    if (!isLoggedIn) {
        return (
            <Switch>
                {routes.map(({ component, path }, index) => (
                    <Route key={index} path={path} component={component} exact />
                ))}
            </Switch>
        );
    }

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <div className={styles.header}>
                <Title>{title}</Title>
            </div>
            <Switch>
                {loggedInRoutes.map(({ component, path }, index) => (
                    <Route key={index} path={path} component={component} exact />
                ))}
            </Switch>
        </>
    );
};

User.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    match: PropTypes.shape({
        isExact: PropTypes.bool,
    }).isRequired,
};

export default withRouter(User);
