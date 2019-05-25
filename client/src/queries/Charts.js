import gql from 'graphql-tag';

  export const TOP_CLIENTS_QUERY = gql`
    query topClients {
        topClients{
            total
            client{
                name
            }
        }
    }
`;