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

export const GET_SINGLE_USER_QUERY = gql`
  query getSingleUser($id: ID) {
    getSingleUser(id: $id){
      id
      user
      name
      rol
    }
  }
`;


export const GET_USERS_QUERY = gql`
  query getUsers($limit: Int, $offset: Int) {
    getUsers(limit: $limit, offset: $offset){
      id
      user
      name
      rol
    }
    totalUsers
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UserInput) {
    updateUser(input: $input){
        id
        user
        name
        rol
    }
  }
`;