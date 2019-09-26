import React, { useState } from 'react';
import PropTypes from 'prop-types';

const initialState = {
    notifications: [],
};

const AppContext = React.createContext([initialState, () => {}]);

const AppProvider = ({ children, initialStore = {} }) => {
    const [state, setState] = useState({ ...initialState, ...initialStore });

    return <AppContext.Provider value={[state, setState]}>{children}</AppContext.Provider>;
};

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { AppContext, AppProvider };
