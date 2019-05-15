import express from 'express';
// graphql
import graphqlHTTP from 'express-graphql';
import schema from './schema';
// Resolvers
import resolvers from './resolvers';

const app = express();

app.get('/', (req, res) => {
    res.send('OK');
});

app.use('/graphql', graphqlHTTP({
    // Schema
    schema,
    // resolver pass like rootValue
    rootValue: resolvers,
    // use graphiql
    graphiql: true
}));

app.listen(4000, () => console.log('Server Running!!!'));