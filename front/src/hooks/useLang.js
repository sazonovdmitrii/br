import gql from 'graphql-tag';

import { useQuery } from '@apollo/react-hooks';

const useLang = () => {
    const {
        data: { lang },
    } = useQuery(
        gql`
            {
                lang @client
            }
        `
    );

    return lang;
};

export default useLang;
