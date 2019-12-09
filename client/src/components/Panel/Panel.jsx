import React, { Fragment } from 'react';
import TopClients from './TopClients';
// import TopSellers from './TopSellers';

const Panel = () => {
    return (
        <Fragment>
            <h1 className="text-center my-5">Top 10 Clientes</h1>
            <div className="row justify-content-center">
                <TopClients/>
            </div>
            {/* <h1 className="text-center my-5">Top 10 Vendedores</h1> */}
            {/* <div className="row justify-content-center">
                <TopSellers/>
            </div> */}
        </Fragment>
    );
};

export default Panel;