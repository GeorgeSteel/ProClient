import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

import { Query, Mutation } from 'react-apollo';
import { PROJECTS_QUERY, DELETE_PROJECT_MUTATION } from '../../queries/Projects';

import Pagination from '../Pagination';
import Loader from '../Layout/Loader';
import Success from '../Alerts/Success';

export default class ProjectOrders extends Component {    
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

    status = status => {
        if (status === 'CANCELADO') {
            return <span className="badge badge-pill badge-danger">{ status }</span>;
        } else if (status === 'PENDIENTE') {
            return <span className="badge badge-pill badge-warning">{ status }</span>;                                            
        } else if (status === 'COMPLETADO') {
            return <span className="badge badge-pill badge-success">{ status }</span>
        }
    }

    render() {
        const { alert: { show, message } } = this.state,
                alert = (show) ? <Success message={ message } /> : null;
        let id = this.props.match.params.id;

        return(
            <Query 
                query={ PROJECTS_QUERY } 
                pollInterval={1000} 
                variables={{ limit: this.limit, offset: this.state.pagination.offset, client: id }}
            >
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return <Loader/>;
                    if(error) return `Error ${error.message}`;

                    return(
                        <Fragment>
                            <h2 className="text-center">Lista de Proyectos del Cliente</h2>

                            { alert }

                            <ul className="list-group mt-4">
                                { data.getProjects.map(project => {
                                    const { id } = project;
                                    return(
                                        <li key={ id } className="list-group-item">
                                            <div className="row justify-content-between align-items-center">
                                                <div className="col-md-6 d-flex justify-content-between align-items-center">
                                                    { project.name }  { this.status(project.status) }
                                                </div>
                                                <div className="col-md-6 d-flex justify-content-end">
                                                    
                                                    <Mutation 
                                                        mutation={ DELETE_PROJECT_MUTATION }
                                                        onCompleted={(data) => {
                                                            this.setState({
                                                                alert: {
                                                                    show: true,
                                                                    message: data.deleteProject
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
                                                                    if (window.confirm('¿Seguro que deseas eliminar este proyecto?')) {
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
                                                        to={`/proyecto/editar/${project.id}`} 
                                                        className="btn btn-success d-block d-md-inline-block"
                                                    >Editar Proyecto
                                                    </Link>
                                                </div>
                                            </div>
                                        </li>
                                    );                            
                                }) }
                            </ul>
                            <Pagination
                                pagination={ this.state.pagination }
                                total={ data.totalProjects }
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