import React from 'react';

import { Mutation } from 'react-apollo';
import { UPDATE_PROJECT_MUTATION } from '../../queries/Projects';

import { withRouter } from 'react-router-dom';

const UpdateOrderBTN = ({ products: { products, total, projectName, status }, idClient, idProject, history, refetch, idSeller, name, original }) => {    
    let disabled, difference = true;
    products.forEach((product, idx) => {
        if (difference && product.id === original[idx].id && product.quantity === original[idx].quantity) {
            disabled = true;
        }
        else {
            disabled = false;
            difference = false;
        }
    });
    return (
        <Mutation 
            mutation={ UPDATE_PROJECT_MUTATION } 
            // onCompleted={ () => history.push('/clientes') }
            onCompleted={ () => refetch().then(() => {
                history.push(`/proyectos/${idClient}`);
            }) }
        >
            { updateProject => (
            <button disabled={ disabled } type="button" className="btn btn-lg btn-info mt-4" onClick={ e => {
                let rest = [];
                const items = products.map(({ name, price, stock, ...object }) => object);

                items.forEach((item, idx) => {
                    if (item.id === original[idx].id) {
                        rest.push(item.quantity - original[idx].quantity);
                    }
                });

                const input = { 
                    id: idProject, 
                    name: projectName, 
                    client: idClient, 
                    seller: idSeller, 
                    items, 
                    total, 
                    status,
                    rest
                };                  
                        
                updateProject({ variables: { input } });
            } }>
                Editar Proyecto
            </button>
            ) }
        </Mutation>
    );
};

export default withRouter(UpdateOrderBTN);