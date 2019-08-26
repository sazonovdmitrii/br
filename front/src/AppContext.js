import React, { useState } from 'react';
import PropTypes from 'prop-types';
import hardtack from 'hardtack';
import { createClient } from 'lib/apollo';

const initialStore = {
    currency: 'Руб.',
    notifications: [],
};
const AppContext = React.createContext([initialStore, () => {}]);

const AppProvider = ({ children }) => {
    const token = hardtack.get('token');
    const client = createClient({ token });

    const [state, setState] = useState({
        ...initialStore,
        client,
    });

    return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
