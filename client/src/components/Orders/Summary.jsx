import React, { Fragment } from 'react';
import Product from './Product';

const Summary = ({ products, updateQuantity, deleteProduct }) => {
    if(products.length === 0) return null;
    return (
        <Fragment>
            <h2 className="text-center my-5">
                Resumen y Cantidades
            </h2>
            <table className="table">
                <thead className="bg-success text-light">
                    <tr className="font-weight-bold">
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { products.map((product, idx) => (
                        <Product
                            key={ product.id }
                            id={ product.id }
                            product={ product }
                            index={ idx }
                            updateQuantity={ updateQuantity }
                            deleteProduct={ deleteProduct }
                        />
                    )) }
                </tbody>
            </table>
        </Fragment>
    );
};

export default Summary;