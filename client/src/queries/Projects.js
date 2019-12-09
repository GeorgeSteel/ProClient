import gql from 'graphql-tag';

export const PROJECTS_QUERY = gql`
    query getProjects($client: String, $limit: Int, $offset: Int) {
        getProjects(client: $client, limit: $limit, offset: $offset){
            id
            name
            total
            date
            status
            items {
                id
                quantity
                limit
            }
        }
        totalProjects(client: $client)
    }
`;

export const GET_PROJECT_QUERY = gql`
    query getProject($id: ID) {
        getProject(id: $id) {
            id
            name
            total
            date
            status
            seller
            client
            items {
                id
                quantity
                limit
            }
        }
        getProducts{
            id
            name
            price
            stock
        }
    }`;

export const NEW_PROJECT_MUTATION = gql`
    mutation addProject($input: ProjectInput) {
      addProject(input: $input){
            id
        }
    }
`;

export const UPDATE_PROJECT_MUTATION = gql`
    mutation updateProject($input: ProjectInput) {
        updateProject(input: $input) {
            id
            name
            total
            date
            status
            items {
                id
                quantity
                limit
            }
        }
    }`;

export const DELETE_PROJECT_MUTATION = gql`
  mutation deleteProject($id: ID!) {
    deleteProject(id: $id) 
}`;