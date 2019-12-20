import React, { Fragment } from 'react';
import UpdateProduct from './UpdateProduct';

const UpdateSummary = ({ updateQuantity, updateLimit, deleteProduct, products }) => {
    // let items = products;
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
                        <th>Limite Actual</th>
                        <th>Limite Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { products.map((product, idx) => (
                        <UpdateProduct
                            key={ product.id }
                            id={ product.id }
                            product={ product }
                            index={ idx }
                            updateQuantity={ updateQuantity }
                            updateLimit={ updateLimit }
                            deleteProduct={ deleteProduct }
                        />
                    )) }
                </tbody>
            </table>
        </Fragment>
    );
};

export default UpdateSummary;