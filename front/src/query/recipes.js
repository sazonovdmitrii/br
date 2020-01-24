import gql from 'graphql-tag';

const GET_RECIPES = gql`
    query user {
        user {
            recipes {
                id
                recipe
                customer
            }
        }
    }
`;

export default GET_RECIPES;
