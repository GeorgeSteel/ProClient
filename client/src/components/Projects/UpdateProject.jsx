import React, { Component,Fragment } from 'react';

import { Query } from 'react-apollo';
import { GET_PROJECT_QUERY } from '../../queries/Projects';
import FormUpdateProject from './FormUpdateProject';

export default class UpdateProject extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <h2 className="text-center">
          Editar Proyecto
        </h2>
        <div className="row justify-content-center">
          <div className="col-md-12">
            <Query query={ GET_PROJECT_QUERY } variables={ { id } }>
              { ({ loading, error, data, refetch }) => {
                if(loading) return 'Loading...';
                if(error) return `Error ${error.message}`;
                // console.log(data.getProducts);
                return(
                  <FormUpdateProject
                    project={ data.getProject }
                    products={ data.getProducts }
                    refetch={ refetch }
                  />            
                );
              } }
            </Query>
          </div>
        </div>
      </Fragment>
    )
  }
}
