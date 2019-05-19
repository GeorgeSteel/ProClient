import React, { Component, Fragment } from 'react';
import { GET_CLIENT_QUERY } from '../queries/Clients';
import { Query } from 'react-apollo';
import FormUpdate from './FormUpdateClient';

export default class UpdateClient extends Component {
  render() {
    // tomar el ID del cliente a editar
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <h2 className="text-center">
          Editar Cliente
        </h2>
        <div className="row justify-content-center">
          <Query query={ GET_CLIENT_QUERY } variables={ {id} }>
            { ({ loading, error, data, refetch }) => {
              if(loading) return 'Loading...';
              if(error) return `Error ${error.message}`;
              return(
                <FormUpdate
                  client={ data.getClient }
                  refetch={ refetch }
                />
              );
            } }
          </Query>
        </div>
      </Fragment>
    );
  }
}
