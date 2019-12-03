import React, { Fragment } from 'react';

import { Query } from 'react-apollo';
import { ORDERS_QUERY } from '../../queries/Orders';

import Loader from '../Layout/Loader';
import Order from './Order';

const ProviderOrders = ({ match: { params: { id } } }) => {
    const provider = id;
    return (
        <Fragment>
            <h1 className="text-center my-2">
                Pedidos al Proveedor
            </h1>

            <div className="row">
                <Query query={ ORDERS_QUERY } variables={{ provider }} pollInterval={ 1000 }>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return <Loader/>;
                    if(error) return `Error ${error.message}`;
                    
                    return(
                        data.getOrders.map(order => (
                            <Order 
                                key={ order.id }
                                order={ order }
                                provider={ provider }
                            />
                        ))
                    );
                }}
                </Query>
            </div>
        </Fragment>
    );
};

export default ProviderOrders;