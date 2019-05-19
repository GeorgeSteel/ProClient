import gql from 'graphql-tag';

export const CLIENTS_QUERY = gql`{
    
  getClients{
    id
    name
    lastname
    company
  }

}`;

export const NEW_CLIENT_MUTATION = gql`
  mutation createClient($input: ClientInput) {
    createClient(input: $input) {
      id
      name
      lastname
      age
    }
  }`;

export const GET_CLIENT_QUERY = gql`
  query getClient($id: ID) {
    getClient(id: $id) {
      id
      company
      name
      lastname
      age
      type
      emails{
        email
      }
    }
  }`;

export const UPDATE_CLIENT_MUTATION = gql`
  mutation updateClient($input: ClientInput) {
    updateClient(input: $input) {
    	id
      company
      name
      lastname
      age
      type
      emails{
        email
      }
    }
  }`;

export const DELETE_CLIENT_MUTATION = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(id: $id) 
}`;