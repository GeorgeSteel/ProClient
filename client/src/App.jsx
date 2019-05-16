import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Components
import Header from './components/Header';
import Clients from './components/Clients';
import NewClient from './components/NewClient';
import UpdateClient from './components/UpdateClient';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
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
                <Route exact path="/" component={Clients}/>
                <Route exact path="/cliente/nuevo" component={NewClient}/>
                <Route exact path="/cliente/editar/:id" component={UpdateClient}/>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    )
  }
}
