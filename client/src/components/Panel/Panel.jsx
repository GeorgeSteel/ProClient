import React, { Fragment } from 'react';
import TopClients from './TopClients';

const Panel = () => {
    return (
        <Fragment>
            <h1 className="text-center my-5">Top 10 Clientes</h1>
            <div className="row justify-content-center">
                <TopClients/>
            </div>
        </Fragment>
    );
};

export default Panel;