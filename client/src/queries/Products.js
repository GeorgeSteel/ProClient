import gql from 'graphql-tag';

export const NEW_PRODUCT_MUTATION = gql`
mutation addProduct($input: ProductInput) {
  addProduct(input: $input){
    name
  }
}`;

export const GET_PRODUCTS_QUERY = gql`
  query getProducts($limit: Int, $offset: Int) {
    getProducts(limit: $limit, offset: $offset){
      id
      name
      price
      stock
    }
    totalProducts
  }
`;

export const DELETE_PRODUCTS_MUTATION = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query getProduct($id: ID!) {
    getProduct(id: $id){
      name
      price
      stock
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation updateProduct($input: ProductInput) {
    updateProduct(input: $input){
      id
      name
      price
      stock
    }
  }
`;

