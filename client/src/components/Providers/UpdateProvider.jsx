import React, { Component, Fragment } from 'react';
import { GET_PROVIDER_QUERY } from '../../queries/Providers';
import { Query } from 'react-apollo';
import FormUpdate from './FormUpdateProvider';

export default class UpdateProvider extends Component {
  render() {
    // tomar el ID del cliente a editar
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <h2 className="text-center">
          Editar Proveedor
        </h2>
        <div className="row justify-content-center">
          <Query query={ GET_PROVIDER_QUERY } variables={ {id} }>
            { ({ loading, error, data, refetch }) => {
              if(loading) return 'Loading...';
              if(error) return `Error ${error.message}`;
              return(
                <FormUpdate
                  provider={ data.getProvider }
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
