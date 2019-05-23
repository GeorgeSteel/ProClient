import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import { UPDATE_PRODUCT_MUTATION } from '../../queries/Products';

const initialState = {
    name: '',
    price: '',
    stock: ''
}

class FormUpdateProduct extends Component {
    state = {
        ...this.props.product.getProduct
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

    updateProductForm = (e, updateProduct) => {
        e.preventDefault();

        updateProduct().then(data => {
            this.cleanState();
        });
    }


    render() {
        const { name, price, stock } = this.state,
                { id } = this.props,
                input = {
                    id,
                    name,
                    price: Number(price),
                    stock: Number(stock)
                };
        return (
            <Mutation 
                mutation={ UPDATE_PRODUCT_MUTATION } 
                variables={{input}} 
                key={ id }
                onCompleted={ () => this.props.refetch().then(() => {
                    this.props.history.push('/productos');
                }) }
            >
                {(updateProduct, { loading, error, data }) => {       
                return(     
                    <form
                        className="col-md-8"
                        onSubmit={ e => this.updateProductForm(e, updateProduct)}
                    >
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input 
                                onChange={this.handleChange}
                                type="text"
                                name="name" 
                                className="form-control" 
                                placeholder="Nombre del Producto"
                                value={ name }
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <div className="input-group-text">$</div>
                                </div>
                                <input 
                                    onChange={this.handleChange}
                                    type="number" 
                                    name="price" 
                                    className="form-control" 
                                    placeholder="Precio del Producto"
                                    value={ price }
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Stock:</label>
                            <input 
                                onChange={this.handleChange}
                                type="number" 
                                name="stock" 
                                className="form-control" 
                                placeholder="Stock del Producto" 
                                value={ stock }
                            />
                        </div>
                        <button 
                            disabled={ this.validateForm() }
                            type="submit" 
                            className="btn btn-success float-right">
                                    Guardar Cambios
                        </button>
                    </form>
                );
                }}
            </Mutation>
        )
    }
}

export default withRouter(FormUpdateProduct);