import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import NotFound from 'routes/NotFound';

import Loader from 'components/Loader';
import ErrorMessage from 'components/Error';

const withQuery = ({ query, ...opts }) => Component => {
    const { data = {}, loading, error } = useQuery(query, opts);

    if (loading) return <Loader />;
    if (error) {
        return (
            <>
                <NotFound />
                <ErrorMessage error={error} />
            </>
        );
    }
    const newData = Object.values(data).reduce((obj, item) => {
        return { ...obj, ...item };
    }, {});

    return <Component {...newData} />;
};

export default withQuery;
