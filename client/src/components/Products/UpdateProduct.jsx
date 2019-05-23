import React, { Component, Fragment } from 'react';

import { Query } from 'react-apollo';

import { GET_PRODUCT_QUERY } from '../../queries/Products';
import FormUpdateProduct from './FormUpdateProduct';

export default class UpdateProduct extends Component {
    render() {
        const { id } = this.props.match.params;
        return (
            <Fragment>
                <h1 className="text-center">
                    Editar Producto
                </h1>
                <div className="row justify-content-center">
                    <Query query={ GET_PRODUCT_QUERY } variables={{ id }}>
                    {({ loading, error, data, refetch }) => {
                        if(loading) return 'Loading...';
                        if(error) return `Error ${error.message}`;
                        
                        return(
                            <FormUpdateProduct
                                id={ id }
                                product={ data }
                                refetch={ refetch }
                            />
                        );
                    }}
                    </Query>
                </div>
            </Fragment>
        )
    }
}
