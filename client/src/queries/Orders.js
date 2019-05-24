import gql from 'graphql-tag';

export const NEW_ORDER_MUTATION = gql`
    mutation addOrder($input: OrderInput) {
        addOrder(input: $input){
            id
        }
    }
`;