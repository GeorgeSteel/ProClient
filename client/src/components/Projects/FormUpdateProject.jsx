import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import UpdateSummary from './UpdateSummary';
import UpdateOrderBTN from './UpdateOrderBTN';
import Failed from '../Alerts/Failed';
import DataClient from './DataClient';

class FormUpdateProject extends Component {
    state = {
        products: [],
        total: this.props.project.total,
        projectName: this.props.project.name,
        status: this.props.project.status
    }

    componentDidMount() {
        this.setState({
            products: this.compareProducts(this.props.products, this.props.project.items)
        });
    }

    compareProducts = (products, items) => {
        let array = []
        items.forEach(item => {
            array.push(products.filter(product => product.id === item.id));
        });

        let result = items.map(obj => {
            let data = array.flat().find(item => item.id === obj.id);
            return {...obj, ...data }
        });
        return result;
    }

    handleChange = products => {
        this.setState({ products });
    }

    handleName = e => {
        this.setState({
            ...this.state.projectName,
            projectName: e.target.value
        });   
    }
    handleStatus = e => {
        this.setState({
            ...this.state.status,
            status: e.target.value
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
              original = this.props.project.items,                    
              generateBtn = (products.length !== 0) ?   <UpdateOrderBTN 
                                                            name={ this.state.projectName } 
                                                            products={ this.state }
                                                            previousStatus={ this.props.project.status }
                                                            previousName={ this.props.project.name } 
                                                            idSeller={ this.props.project.seller } 
                                                            idClient={ this.props.project.client } 
                                                            idProject={ this.props.project.id } 
                                                            original={ original } 
                                                            refetch={ this.props.refetch } 
                                                        /> : null,
              message = (this.state.total < 0) ? <Failed message="Las cantidades no pueden ser negativas" /> : null;
        return (
            <Fragment>
                <div className="row">
                    <div className="col-3">
                        <DataClient id={this.props.project.client} />
                    </div>
                    <div className="col-9">      
                        { message }
                        <div className="form-group row">
                            <div className="form-group col">
                                <label htmlFor="name">Nombre del Proyecto:</label>
                                <input 
                                    type="text" 
                                    name="name" 
                                    id="name" 
                                    className="mt-2 mr-2 form-control" 
                                    placeholder="Nombre del proyecto"
                                    onChange={ this.handleName }
                                    value={ this.state.projectName }
                                />
                            </div>
                            <div className="form-group col">
                                <label htmlFor="select">Estatus:</label>
                                <select 
                                    className="mt-2 ml-2 form-control"
                                    value={ this.state.status }
                                    id="select"
                                    onChange={ this.handleStatus }
                                >
                                    <option value="COMPLETADO">COMPLETADO</option>
                                    <option value="PENDIENTE">PENDIENTE</option>
                                    <option value="CANCELADO">CANCELADO</option>
                                </select>
                            </div>
                            
                        </div>
                        <UpdateSummary
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
                    </div>
                </div>       
            </Fragment>
        )
    }
}


export default withRouter(FormUpdateProject);