import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Client{
        id: ID
        name: String
        lastname: String
        company: String
        emails: [Emails]
        age: Int
        type: ClientType
        orders: [Order]
    }
    type Emails {
        email: String
    }
    type Order {
        product: String
        price: Float
    }
    """ Gives a category of the client """
    enum ClientType {
        BASIC
        PREMIUM
    }
    type Query {
        getClient(id: ID): Client
    }
    input OrderInput {
        product: String!
        price: Float!
    }
    input EmailsInput {
        email: String!
    }
    """ Fields for new clients """
    input ClientInput {
        id: ID
        name: String!
        lastname: String!
        company: String!
        emails: [EmailsInput]!
        age: Int!
        type: ClientType!
        orders: [OrderInput]!
    }
    """ Mutations for create clients """
    type Mutation {
        # Resolver's name, input with data and return data
        """ Allow you to create new clients """
        createClient(input: ClientInput) : Client 
    }
`);

export default schema;