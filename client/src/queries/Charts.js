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
export const TOP_PROVIDERS_QUERY = gql`
    query topProviders {
        topProviders{
            total
            provider{
                name
            }
        }
    }
`;
export const TOP_SELLERS_QUERY = gql`
    query topSellers {
        topSellers{
            total
            seller{
                id
                user
                name
                rol
            }
        }
    }
`;

