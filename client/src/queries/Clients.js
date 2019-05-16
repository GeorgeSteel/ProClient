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
  }
`;