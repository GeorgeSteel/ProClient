import React, { Component, Fragment } from 'react'

import { Query } from 'react-apollo';
import { GET_PRODUCTS_QUERY } from '../../queries/Products';

import DataClient from './DataClient';
import Loader from '../Layout/Loader';
import OrderContent from './OrderContent';

export default class NewOrder extends Component {
    render() {
        const { id } = this.props.match.params,
            idSeller = this.props.session.id;
        return (
            <Fragment>
                <h1 className="text-center">
                    Pedidos
                </h1>
                <div className="row">
                    <div className="col-md-3">
                        <DataClient
                            id={ id }
                        />
                    </div>
                    <div className="col-md-9">
                        <Query query={ GET_PRODUCTS_QUERY } variables={{ stock: true }}>
                        {({ loading, error, data, refetch, startPolling, stopPolling }) => {
                            if(loading) return <Loader/>;
                            if(error) return `Error ${error.message}`;

                            return(
                                <OrderContent
                                    id={ id }
                                    products={ data.getProducts }
                                    refetch={ refetch }
                                    idSeller={ idSeller }
                                />
                            );
                        }}
                        </Query>
                    </div>
                </div>
            </Fragment>
        )
    }
}
