import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RootSession } from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    // send token to the server
    fetchOptions:{
      credentials: 'include'
    },
    request: operation => {
      const token = sessionStorage.getItem('token');
      operation.setContext({
        headers: {
          authorization: token
        }
      });
    },
    cache: new InMemoryCache({
      addTypename: false
    }),
    onError: ({networkError, graphQLErrors}) => {
      console.log('graphQLErrors', graphQLErrors);
      console.log('networkError', networkError);
    }
});

ReactDOM.render(
    <ApolloProvider client={ client }>
        <RootSession/>
    </ApolloProvider>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
