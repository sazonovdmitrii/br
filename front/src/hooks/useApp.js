import { useState, useContext, useReducer, useEffect } from 'react';
import hardtack from 'hardtack';
import nanoid from 'nanoid';

import { createClient } from 'lib/apollo';
import { AppContext } from 'AppContext';

const useApp = () => {
    const [state, setState] = useContext(AppContext);

    useEffect(() => {
        if (state.notifications.length > state.maxNotifications) {
            const notifications = state.notifications.slice(-state.maxNotifications);

            setState(prevState => ({
                ...prevState,
                notifications,
            }));
        }
    }, [setState, state.notifications, state.maxNotifications]);

    const init = token => {
        const session = hardtack.get('session_key');
        const client = createClient({ token, session });

        setState(prevState => ({
            ...prevState,
            client,
        }));

        return client;
    };

    const login = token => {
        if (!token) return;

        const date = new Date();
        const currentYear = date.getFullYear();

        date.setFullYear(currentYear + 1);
        hardtack.set('token', token, {
            path: '/',
            expires: date.toUTCString(),
        });

        const client = init(token);
        client.writeData({ data: { isLoggedIn: true } });
    };

    const logout = () => {
        hardtack.remove('token', { path: '/' });

        const client = init();
        client.writeData({ data: { isLoggedIn: false } });
    };

    const createNotification = (notification = null) => {
        setState(prevState => ({
            ...prevState,
            notifications: [...prevState.notifications, { ...notification, id: nanoid() }],
        }));
    };

    const removeNotification = id => {
        setState(prevState => ({
            ...prevState,
            notifications: prevState.notifications.filter(item => item.id !== id),
        }));
    };

    return {
        init,
        logout,
        login,
        createNotification,
        removeNotification,
        notifications: state.notifications,
        client: state.client,
    };
};

export default useApp;
