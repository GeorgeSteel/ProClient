import gql from 'graphql-tag';

export const NEW_USER_MUTATION = gql`
    mutation createUser($user: String!, $password: String!, $name: String!, $rol: String!) {
        createUser(user: $user, password: $password, name: $name, rol: $rol)
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
            id
            user
            name
            rol
        }
    }    
`;
