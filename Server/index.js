import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

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
                // throw new Error(error);
            }
        }
    },
    introspection: true
});

server.applyMiddleware({app});

// app.use(express.static('build'));
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
// });

const PORT = process.env.PORT || 4000;

app.listen({ port: PORT }, () => console.log(`Server running on: http://localhost:4000${server.graphqlPath}`));