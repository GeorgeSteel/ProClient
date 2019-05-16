import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { CLIENTS_QUERY } from '../queries/Clients';
import { Link } from 'react-router-dom';

const Clients = () => (
    <Query query={ CLIENTS_QUERY }>
        {({ loading, error, data }) => {
            if(loading) return 'Loading...';
            if(error) return `Error ${error.message}`;

            return(
                <Fragment>
                    <h2 className="text-center">Lista Clientes</h2>
                    <ul className="list-group mt-4">
                        { data.getClients.map(client => (
                            <li key={ client.id } className="list-group-item">
                                <div className="row justify-content-between align-items-center">
                                    <div className="col-md-8 d-flex justify-content-between align-items-center">
                                        { client.name } { client.lastname } - { client.company }
                                    </div>
                                    <div className="col-md-4 d-flex justify-content-end">
                                        <Link to={`/cliente/editar/${client.id}`} className="btn btn-success d-block d-md-inline-block">Editar Cliente</Link>
                                    </div>
                                </div>
                            </li>
                        )) }
                    </ul>
                </Fragment>
            );
        }}
    </Query>
);

export default Clients;