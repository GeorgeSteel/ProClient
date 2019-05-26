import React, { Fragment } from 'react';

const SummaryProduct = ({ quantity, product: { name, price } }) => {
    return (
        <Fragment>
            <div className="content-products mb-4 p-4">
                <p className="card-text font-weight-bold">
                    Nombre del Producto:
                    <span className="font-weight-normal"> { name }</span>
                </p>
                <p className="card-text font-weight-bold">
                    Cantidad:
                    <span className="font-weight-normal"> { quantity }</span>
                </p>
                <p className="card-text font-weight-bold">
                    Precio:
                    <span className="font-weight-normal"> ${ price }</span>
                </p>
            </div>
        </Fragment>
    );
};

export default SummaryProduct;