import React, { Component, Fragment } from 'react';

import { NEW_PRODUCT_MUTATION } from '../../queries/Products';
import { Mutation } from 'react-apollo';

const initialState = {
    name: '',
    price: '',
    stock: ''
}

export default class NewProduct extends Component {
    state = {
        ...initialState
    }

    cleanState = () => {
        this.setState({
            ...initialState
        });
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    validateForm = () => {
        const { name, price, stock } = this.state,
                noValid = !name || !price || !stock;
                
        return noValid;
    }

    createNewProduct = (e, addProduct) => {
        e.preventDefault();

        addProduct().then(data => {
            this.cleanState();
            this.props.history.push('/productos');
        });
    }

    render() {
        const { name, price, stock } = this.state,
                input = {
                    name,
                    price: Number(price),
                    stock: Number(stock)
                }
        return (
            <Fragment>
            <h1 className="text-center mb-5">
                Nuevo Producto
            </h1>
            <div className="row justify-content-center">
                <Mutation mutation={ NEW_PRODUCT_MUTATION } variables={{input}}>
                {(addProduct, {loading, error, data}) => {
                    return(
                    <form 
                        className="col-md-8"
                        onSubmit={ e => this.createNewProduct(e, addProduct) }
                    >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                type="text"
                                name="name" 
                                className="form-control" 
                                placeholder="Nombre del Producto"
                                onChange={ this.handleChange }
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input 
                                    type="number" 
                                    name="price" 
                                    className="form-control" 
                                    placeholder="Precio del Producto"
                                    onChange={ this.handleChange }
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="Stock del Producto" 
                                onChange={ this.handleChange }
                            />
                        </div>
                        <button 
                            disabled={ this.validateForm() }
                            type="submit" 
                            className="btn btn-success float-right">
                                Crear Producto
                        </button>
                    </form>
                    )
                }}                    
                </Mutation>                
            </div>
            </Fragment>
        )
    }
}
