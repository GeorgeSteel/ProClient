import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import { CLIENTS_QUERY, DELETE_CLIENT_MUTATION } from '../../queries/Clients';

import Pagination from '../Pagination';
import Success from '../Alerts/Success';

export default class Clients extends Component {    
    limit = 10;

    state = {
        pagination: {
            offset: 0,
            currentPage: 1
        },
        alert: {
            show: false,
            message: ''
        }
    }

    previousPage = () => {
        this.setState({
            pagination: {
                offset: this.state.pagination.offset - this.limit,
                currentPage: this.state.pagination.currentPage - 1
            }
        });
    }

    nextPage = () => {
        this.setState({
            pagination: {
                offset: this.state.pagination.offset + this.limit,
                currentPage: this.state.pagination.currentPage + 1
            }
        });
    }

    render() {
        const { alert: { show, message } } = this.state,
                alert = (show) ? <Success message={ message } /> : null;
        return(
            <Query query={ CLIENTS_QUERY } pollInterval={1000} variables={{ limit: this.limit, offset: this.state.pagination.offset }}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error ${error.message}`;

                    return(
                        <Fragment>
                            <h2 className="text-center">Lista Clientes</h2>

                            { alert }

                            <ul className="list-group mt-4">
                                { data.getClients.map(client => {
                                    const { id } = client;
                                    return(
                                        <li key={ id } className="list-group-item">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-md-6 d-flex justify-content-between align-items-center">
                                                    { client.name } { client.lastname } - { client.company }
                                                </div>
                                                <div className="col-md-6 d-flex justify-content-end">
                                                    <Link 
                                                        to={`/pedido/nuevo/${id}`}
                                                        className="btn btn-warning d-block d-md-inline-block mr-2"
                                                    >&#43; Nuevo Pedido
                                                    </Link>
                                                    <Link 
                                                        to={`/pedidos/${id}`}
                                                        className="btn btn-info d-block d-md-inline-block mr-2"
                                                    >Ver Pedidos
                                                    </Link>
                                                    <Mutation 
                                                        mutation={ DELETE_CLIENT_MUTATION }
                                                        onCompleted={(data) => {
                                                            this.setState({
                                                                alert: {
                                                                    show: true,
                                                                    message: data.deleteClient
                                                                }
                                                            }, () => {
                                                                setTimeout(() => {
                                                                    this.setState({
                                                                        alert: {
                                                                            show: false,
                                                                            message: ''
                                                                        }
                                                                    })
                                                                }, 3000);
                                                            });
                                                        }}    
                                                    >
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
                            <Pagination
                                pagination={ this.state.pagination }
                                total={ data.totalClients }
                                previousPage={ this.previousPage }
                                nextPage={ this.nextPage }
                                limit={ this.limit }
                            />
                        </Fragment>
                    );
                }}
            </Query>
        );
    }
}