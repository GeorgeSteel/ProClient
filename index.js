import express from 'express';
// graphql
import graphqlHTTP from 'express-graphql';
import { schema } from './data/schema';

const app = express();

app.get('/', (req, res) => {
    res.send('OK');
});

app.use('/graphql', graphqlHTTP({
    // Schema
    schema,
    // use graphiql
    graphiql: true
}));

app.listen(4000, () => console.log('Server Running!!!'));