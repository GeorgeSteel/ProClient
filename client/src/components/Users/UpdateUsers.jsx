import React, { Component, Fragment } from 'react';


import { Query } from 'react-apollo';
import { GET_SINGLE_USER_QUERY } from '../../queries/Users';

import FormUpdateUser from './FormUpdateUser';

export default class UpdateUsers extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <h1 className="text-center">
            Editar Usuario
        </h1>
        <div>
            <Query query={ GET_SINGLE_USER_QUERY } variables={{ id }}>
            {({ loading, error, data, refetch }) => {
                if(loading) return 'Loading...';
                if(error) return `Error ${error.message}`;
                
                return(
                    <FormUpdateUser
                        id={ id }
                        user={ data.getSingleUser }
                        refetch={ refetch }
                        session={ this.props.session.rol }
                    />
                );
            }}
            </Query>
        </div>
      </Fragment>
    )
  }
}
