import React, { Component, Fragment } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';
import Summary from './Summary';
import GenerateOrder from './GenerateOrder';
import Failed from '../Alerts/Failed';

export default class OrderContent extends Component {
    state = {
        products: [],
        total: 0,
        name: ''
    }

    handleChange = products => {
        this.setState({ products });
    }

    handleName = e => {
        this.setState({
            ...this.state.name,
            name: e.target.value
        });   
    }

    updateTotal = () => {
        const products = this.state.products;

        if (products.length === 0) {
            this.setState({ total: 0 });
            return;
        }

        let total = 0;

        products.map(product => total += (product.quantity * product.price));

        this.setState({ total });
    }

    updateQuantity = (quantity, idx) => {
        const products = this.state.products;
        
        products[idx].quantity = Number(quantity);

        this.setState({ products }, () => this.updateTotal());
    }
    
    updateLimit = (limit, idx) => {
        const products = this.state.products;
        
        products[idx].limit = Number(limit);

        this.setState({ products });
    }

    deleteProduct = id => {
        const products = this.state.products;

        const remaining = products.filter(product => product.id !== id);

        this.setState({ products: remaining }, () => this.updateTotal());
    }


    render() {
        const products = this.state.products,                    
            generateBtn = (products.length !== 0) ? <GenerateOrder name={ this.state.name } idSeller={this.props.idSeller} products={this.state} idClient={this.props.id} refetch={this.props.refetch} /> : null,
            message = (this.state.total < 0) ? <Failed message="Las cantidades no pueden ser negativas" /> : null;
        return (
            <Fragment>
                <h2 className="text-center mb-5">
                    Seleccionar Artículos
                </h2>
                { message }
                <Select
                    closeMenuOnSelect={false}
                    components={makeAnimated()}
                    isMulti
                    options={ this.props.products }
                    placeholder={'Seleccionar Productos'}
                    getOptionValue={(options) => options.id}
                    getOptionLabel={(options) => options.name}
                    onChange={ this.handleChange }
                    value={ this.state.products }
                    onMenuOpen={ () => this.props.refetch() }
                />
                           
                <input 
                    requred
                    type="text" 
                    name="name" 
                    className="mt-2 form-control" 
                    placeholder="Nombre del proyecto"
                    onChange={ this.handleName }
                />
                <Summary
                    products={ this.state.products }
                    updateQuantity={ this.updateQuantity }
                    updateLimit={ this.updateLimit }
                    deleteProduct={ this.deleteProduct }
                />
                <p className="font-weight-bold float-right mt-5">
                    Total:
                    <span className="font-weight-normal"> ${ this.state.total }</span>
                </p>
                { generateBtn }
            </Fragment>
        )
    }
}
