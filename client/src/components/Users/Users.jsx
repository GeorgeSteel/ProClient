import React, { Fragment, Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import { GET_USERS_QUERY, DELETE_USER_MUTATION } from '../../queries/Users';

import Pagination from '../Pagination';
import Loader from '../Layout/Loader';
import Success from '../Alerts/Success';

export default class Users extends Component {    
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

    rol = rol => {
        if (rol === 'ADMINISTRADOR') {
            return <span className="badge badge-pill badge-warning">{ rol }</span>;
        } else if (rol === 'VENDEDOR') {
            return <span className="badge badge-pill badge-primary">{ rol }</span>
        }
    }

    render() {
        const { alert: { show, message } } = this.state,
                alert = (show) ? <Success message={ message } /> : null,
                useRol = this.props.session.rol,
                redirect = (useRol !== 'ADMINISTRADOR') ? <Redirect to="/panel"/> : null;
        return(
            <Query 
                query={ GET_USERS_QUERY } 
                pollInterval={1000} 
                variables={{ limit: this.limit, offset: this.state.pagination.offset }}
            >
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return <Loader/>;
                    if(error) return `Error ${error.message}`;

                    return(
                        <Fragment>
                            { redirect }
                            <h2 className="text-center">Lista de Usuarios</h2>

                            { alert }

                            <ul className="list-group mt-4 col-8 m-auto">
                                { data.getUsers.map(user => {
                                    const { id } = user;
                                    return(
                                        <li key={ id } className="list-group-item">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-md-6 d-flex justify-content-between align-items-center">
                                                    { user.name }  { this.rol(user.rol) }
                                                </div>
                                                <div className="col-md-6 d-flex justify-content-end">
                                                    
                                                    <Mutation 
                                                        mutation={ DELETE_USER_MUTATION }
                                                        onCompleted={(data) => {
                                                            this.setState({
                                                                alert: {
                                                                    show: true,
                                                                    message: data.deleteUser
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
                                                        {deleteProject => (
                                                            <button 
                                                                type="button" 
                                                                className="btn btn-danger d-block d-md-inline-block mr-2"
                                                                onClick={ () => {
                                                                    if (window.confirm('¿Seguro que deseas eliminar este usuario?')) {
                                                                        deleteProject({
                                                                            variables: { id }
                                                                        });
                                                                    }
                                                                } }
                                                            >&times; Eliminar
                                                            </button>
                                                        )}
                                                    </Mutation>
                                                    <Link 
                                                        to={`/usuario/editar/${user.id}`} 
                                                        className="btn btn-success d-block d-md-inline-block"
                                                    >Editar Usuario
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    );                            
                                }) }
                            </ul>
                            <Pagination
                                pagination={ this.state.pagination }
                                total={ data.totalUsers }
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