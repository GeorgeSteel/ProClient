import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import Header from './components/Layout/Header';
import Clients from './components/Clients/Clients';
import NewClient from './components/Clients/NewClient';
import UpdateClient from './components/Clients/UpdateClient';
import NewProduct from './components/Products/NewProduct';
import Products from './components/Products/Products';
import UpdateProduct from './components/Products/UpdateProduct';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={ client }>
        <Router>
          <Fragment>
            <Header/>
            <div className="container">
              <Switch>
                <Route exact path="/clientes" component={ Clients }/>
                <Route exact path="/cliente/nuevo" component={ NewClient }/>
                <Route exact path="/cliente/editar/:id" component={ UpdateClient }/>
                <Route exact path="/producto/nuevo" component={ NewProduct }/>
                <Route exact path="/productos" component={ Products }/>
                <Route exact path="/producto/editar/:id" component={ UpdateProduct }/>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}
