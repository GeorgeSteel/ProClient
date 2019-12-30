import gql from 'graphql-tag';

export const PROVIDERS_QUERY = gql`    
  query getProviders($limit: Int, $offset: Int, $seller: String) {
    getProviders(limit: $limit, offset: $offset, seller: $seller){
      id
      name
      lastname
      company
    }
    totalProviders(seller: $seller)
  }`;

export const GET_PROVIDER_QUERY = gql`
  query getProvider($id: ID) {
    getProvider(id: $id) {
      id
      company
      name
      lastname
      phone
      emails{
        email
      }
    }
  }`;

export const NEW_PROVIDER_MUTATION = gql`
  mutation createProvider($input: ProviderInput){
    createProvider(input: $input){
      id
      name
      lastname
      company
      emails {
        email
      }
    }
  }
`;

export const UPDATE_PROVIDER_MUTATION = gql`
  mutation updateProvider($input: ProviderInput) {
    updateProvider(input: $input) {
    	id
      company
      name
      lastname
      emails{
        email
      }
    }
  }`;

export const DELETE_PROVIDER_MUTATION = gql`
  mutation deleteProvider($id: ID!) {
    deleteProvider(id: $id) 
}`;