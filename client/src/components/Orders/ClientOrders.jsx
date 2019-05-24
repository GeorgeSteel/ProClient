import React, { Fragment } from 'react';

const ClientOrders = ({ match: { params: { id } } }) => {
    console.log(id);
    return (
        <Fragment>
            <h1 className="text-center my-2">
                Pedidos del Cliente
            </h1>

            <div className="row">

            </div>
        </Fragment>
    );
};

export default ClientOrders;