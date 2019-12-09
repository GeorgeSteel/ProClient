import React, { Component, Fragment } from 'react';

export default class UpdateProduct extends Component {
    limit = React.createRef();
    render() {
        const { product } = this.props;
        // console.log(product);
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
                            if (Number(e.target.value) > this.limit.current.value) {
                                e.target.value = this.limit.current.value;
                            }                                
                            
                            this.props.updateQuantity(e.target.value, this.props.index);
                        } }
                        value={ product.quantity }
                    />
                </td>
                <td>
                    <input 
                        disabled
                        min="1"
                        type="number" 
                        className="form-control"
                        ref={ this.limit }
                        onChange={ e => {
                            if (e.target.value > product.stock) {
                                e.target.value = product.stock;
                            }

                            this.props.updateLimit(e.target.value, this.props.index);
                        } }
                        value={ product.limit }
                    />
                </td>
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
