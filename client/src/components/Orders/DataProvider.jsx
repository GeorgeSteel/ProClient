import React, { Fragment } from 'react';

import { Query } from 'react-apollo';
import { GET_PROVIDER_QUERY } from '../../queries/Providers';

const DataProvider = ({ id }) => {
    return (
        <Fragment>
            <h2 className="text-center mb-3">
                Resumen del Proveedor
            </h2>
            <Query query={ GET_PROVIDER_QUERY } variables={{ id }} pollInterval={1000}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error ${error.message}`;

                    const { name, lastname, emails, company, phone } = data.getProvider;

                    return(
                        <ul className="list-unstyled my-5">
                            <li className="border font-weight-bold p-2">
                                Nombre: <span className="font-weight-normal">{ name }</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Apellido: <span className="font-weight-normal">{ lastname }</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Teléfono: <span className="font-weight-normal">{ phone }</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Emails: <br/>
                                <span className="font-weight-normal">{ emails.map(email => ` ${email.email} `) }</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Empresa: <span className="font-weight-normal">{ company }</span>
                            </li>
                        </ul>
                    );
                }}    

            </Query>
        </Fragment>
    );
};

export default DataProvider;