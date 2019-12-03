import React from 'react';

import { Mutation } from 'react-apollo';
import { NEW_ORDER_MUTATION } from '../../queries/Orders';

import { withRouter } from 'react-router-dom';

const GenerateOrder = ({ order: { products, total }, idProvider, history, refetch, idSeller }) => {    
    const disabled = (!products || total <= 0);
    return (
        <Mutation 
            mutation={ NEW_ORDER_MUTATION } 
            // onCompleted={ () => history.push('/clientes') }
            onCompleted={ () => refetch().then(() => {
                history.push('/proveedores');
            }) }
        >
            { addOrder => (
            <button disabled={ disabled } type="button" className="btn btn-lg btn-info mt-4" onClick={ e => {
                const order = products.map(({ name, price, stock, ...object }) => object),
                        input = { order, total, provider: idProvider, seller: idSeller };
                
                addOrder({ variables: { input } });
            } }>
                Guardar Pedido
            </button>
            ) }
        </Mutation>
    );
};

export default withRouter(GenerateOrder);