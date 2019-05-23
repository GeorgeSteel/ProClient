import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import { Query } from 'react-apollo';
import { Mutation } from 'react-apollo';

import { GET_PRODUCTS_QUERY } from '../../queries/Products';
import { DELETE_PRODUCTS_MUTATION } from '../../queries/Products';

import Success from '../Alerts/Success';
import Pagination from '../Pagination';

export default class Products extends Component {
    limit = 10;

    state = {
        alert: {
            show: false,
            message: ''
        },
        pagination: {
            offset: 0,
            currentPage: 1
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
        return (
            <Fragment>
                <h1 className="text-center mb-5">
                    Productos
                </h1>

                { alert }

                <Query query={ GET_PRODUCTS_QUERY } pollInterval={1000} variables={{ limit: this.limit, offset: this.state.pagination.offset }}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error ${error.message}`;

                    return(
                        <Fragment>
                            <table className="table">
                                <thead>
                                    <tr className="table-primary">
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Stock</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { data.getProducts.map(product => {
                                        const { id } = product;

                                        return(
                                        <tr key={ id }>
                                            <td>{ product.name }</td>
                                            <td>$ { product.price }</td>
                                            <td>{ product.stock }</td>
                                            <td>
                                                <Link 
                                                    to={`producto/editar/${id}`} 
                                                    className="btn btn-success mr-2"
                                                >Editar Producto
                                                </Link>
                                                <Mutation 
                                                    mutation={ DELETE_PRODUCTS_MUTATION }
                                                    onCompleted={(data) => {
                                                        this.setState({
                                                            alert: {
                                                                show: true,
                                                                message: data.deleteProduct
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
                                                    {deleteProduct => (
                                                        <button 
                                                            onClick={() => {
                                                                if (window.confirm('¿Seguro que deseas eliminar el producto?')) {
                                                                    deleteProduct({
                                                                        variables: { id }
                                                                    });
                                                                }
                                                            }}
                                                            type="button" 
                                                            className="btn btn-danger"
                                                        >&times; Eliminar
                                                        </button>                                                    
                                                    )}
                                                </Mutation>
                                            </td>
                                        </tr>
                                        );
                                    }) }
                                </tbody>
                            </table>
                            <Pagination
                                pagination={ this.state.pagination }
                                total={ data.totalProducts }
                                previousPage={ this.previousPage }
                                nextPage={ this.nextPage }
                                limit={ this.limit }
                            />
                        </Fragment>
                    );
                }}
                </Query>
            </Fragment>
        )
    }
}
