import React from 'react';

import { Mutation } from 'react-apollo';
import { NEW_ORDER_MUTATION } from '../../queries/Orders';

import { withRouter } from 'react-router-dom';

const GenerateOrder = ({ order: { products, total }, idClient, history, refetch }) => {    
    const disabled = (!products || total <= 0);
    return (
        <Mutation 
            mutation={ NEW_ORDER_MUTATION } 
            // onCompleted={ () => history.push('/clientes') }
            onCompleted={ () => refetch().then(() => {
                history.push('/clientes');
            }) }
        >
            { addOrder => (
            <button disabled={disabled} type="button" className="btn btn-lg btn-info mt-4" onClick={ e => {
                const order = products.map(({ name, price, stock, ...object }) => object),
                        input = { order, total, client: idClient };
                
                addOrder({ variables: { input } });
            } }>
                Generar Pedido
            </button>
            ) }
        </Mutation>
    );
};

export default withRouter(GenerateOrder);