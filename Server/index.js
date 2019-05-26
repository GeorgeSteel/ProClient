import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// graphql
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

dotenv.config({ path: 'variables.env' });

const app = express();
const server = new ApolloServer({ 
    typeDefs, 
    resolvers, 
    context: async({ req }) => {
        const token = req.headers['authorization'];

        if (token !== 'null') {
            try {
                const currentUser = await jwt.verify(token, process.env.SECRET);

                req.currentUser = currentUser;

                return{
                    currentUser
                };
                
            } catch (error) {
                throw new Error(error);
            }
        }
    }
});

server.applyMiddleware({app});

app.listen({ port: 4000 }, () => console.log(`Server running on: http://localhost:4000${server.graphqlPath}`));