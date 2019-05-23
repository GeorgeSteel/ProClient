import React, { Component, Fragment } from 'react'

export default class Product extends Component {
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
                            type="number" 
                            className="form-control"
                            onChange={ e => this.props.updateQuantity(e.target.value, this.props.index) }
                        />
                    </td>
                    <td>
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
