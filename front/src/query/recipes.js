import gql from 'graphql-tag';

const GET_RECIPES = gql`
    {
        user {
            recipes {
                id
                recipe
            }
        }
    }
`;

export default GET_RECIPES;
