import React, { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import { CLIENTS_QUERY, DELETE_CLIENT_MUTATION } from '../queries/Clients';
import { Link } from 'react-router-dom';

const Clients = () => (
    <Query query={ CLIENTS_QUERY } pollInterval={1000}>
        {({ loading, error, data, startPolling, stopPolling }) => {
            if(loading) return 'Loading...';
            if(error) return `Error ${error.message}`;

            return(
                <Fragment>
                    <h2 className="text-center">Lista Clientes</h2>
                    <ul className="list-group mt-4">
                        { data.getClients.map(client => {
                            const { id } = client;
                            return(
                                <li key={ client.id } className="list-group-item">
                                    <div className="row justify-content-between align-items-center">
                                        <div className="col-md-8 d-flex justify-content-between align-items-center">
                                            { client.name } { client.lastname } - { client.company }
                                        </div>
                                        <div className="col-md-4 d-flex justify-content-end">
                                            <Mutation mutation={ DELETE_CLIENT_MUTATION }>
                                                {deleteClient => (
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-danger d-block d-md-inline-block mr-2"
                                                        onClick={ () => {
                                                            if (window.confirm('¿Seguro que deseas eliminar este cliente?')) {
                                                                deleteClient({
                                                                    variables: { id }
                                                                });
                                                            }
                                                        } }
                                                    >&times; Eliminar
                                                    </button>
                                                )}
                                            </Mutation>
                                            <Link 
                                                to={`/cliente/editar/${client.id}`} 
                                                className="btn btn-success d-block d-md-inline-block"
                                            >Editar Cliente
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            );                            
                        }) }
                    </ul>
                </Fragment>
            );
        }}
    </Query>
);

export default Clients;