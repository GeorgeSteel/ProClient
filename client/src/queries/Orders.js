import gql from 'graphql-tag';

export const NEW_ORDER_MUTATION = gql`
    mutation addOrder($input: OrderInput) {
        addOrder(input: $input){
            id
        }
    }
`;

export const UPDATE_STATUS_MUTATION = gql`
    mutation updateStatus($input: OrderInput) {
        updateStatus(input: $input)
    }
`;

export const ORDERS_QUERY = gql`
    query getOrders($client: String) {
        getOrders(client: $client){
            id
            total
            date
            status
            order{
                id
                quantity
            }
        }
    }
`;