import gql from 'graphql-tag';

export const NEW_USER_MUTATION = gql`
    mutation createUser($user: String!, $password: String!) {
        createUser(user: $user, password: $password)
    }
`;
export const AUTH_USER_MUTATION = gql`
    mutation authUser($user: String!, $password: String!) {
        authUser(user: $user, password: $password){
            token
        }
    }
`;
export const GET_USER_QUERY = gql`
    query getUser {
        getUser {
            user
        }
    }    
`;
