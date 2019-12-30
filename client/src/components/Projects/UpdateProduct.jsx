import React, { Component, Fragment } from 'react';

export default class UpdateProduct extends Component {
    state = {
        updateLimit: Number(this.props.product.limit - this.props.product.quantity)
    };

    render() {
        const { product } = this.props;
        return (
            <Fragment>
              <tr>
                <td>{ product.name }</td>
                <td>${ product.price }</td>
                <td>{ product.stock }</td>
                <td>
                    <input 
                        min="1"
                        type="number" 
                        className="form-control"
                        onChange={ e => {
                            if (Number(e.target.value) > product.limit) {
                                e.target.value = product.limit;
                            }
                            
                            this.setState({
                                updateLimit: product.limit - e.target.value
                            });
                            
                            this.props.updateQuantity(e.target.value, this.props.index);
                        } }
                        value={ product.quantity }
                    />
                </td>
                <td>{ this.state.updateLimit }</td>
                <td>{ product.limit }</td>
                <td className="col-2">
                    <button
                        type="button"
                        className="btn btn-danger font-weight-bold"
                        onClick={ e => this.props.deleteProduct(product.id) }
                    >&times; Eliminar
                    </button>
                </td>
              </tr>
            </Fragment>
        )
    }
}
