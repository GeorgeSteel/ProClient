import React from 'react';

import { Mutation } from 'react-apollo';
import { NEW_PROJECT_MUTATION } from '../../queries/Projects';

import { withRouter } from 'react-router-dom';

const GenerateOrder = ({ products: { products, total }, idClient, history, refetch, idSeller, name }) => {    
    const disabled = (!products || total <= 0);
    return (
        <Mutation 
            mutation={ NEW_PROJECT_MUTATION } 
            // onCompleted={ () => history.push('/clientes') }
            onCompleted={ () => refetch().then(() => {
                history.push('/clientes');
            }) }
        >
            { addProject => (
            <button disabled={ disabled } type="button" className="btn btn-lg btn-info mt-4" onClick={ e => {
                const items = products.map(({ name, price, stock, ...object }) => object),
                        input = { items, total, name, client: idClient, seller: idSeller };
                    addProject({ variables: { input } });
            } }>
                Guardar Proyecto
            </button>
            ) }
        </Mutation>
    );
};

export default withRouter(GenerateOrder);