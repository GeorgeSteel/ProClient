import React, { Fragment } from 'react';

import { Query } from 'react-apollo';
import { GET_CLIENT_QUERY } from '../../queries/Clients';

const DataClient = ({ id }) => {
    return (
        <Fragment>
            <h2 className="text-center mb-3">
                Resumen de Cliente
            </h2>
            <Query query={ GET_CLIENT_QUERY } variables={{ id }} pollInterval={1000}>
                {({ loading, error, data, startPolling, stopPolling }) => {
                    if(loading) return 'Loading...';
                    if(error) return `Error ${error.message}`;

                    const { name, lastname, age, emails, company, type } = data.getClient;

                    return(
                        <ul className="list-unstyled my-5">
                            <li className="border font-weight-bold p-2">
                                Nombre: <span className="font-weight-normal">{ name }</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Apellido: <span className="font-weight-normal">{ lastname }</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Edad: <span className="font-weight-normal">{ age }</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Emails: <br/>
                                <span className="font-weight-normal">{ emails.map(email => ` ${email.email} `) }</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Empresa: <span className="font-weight-normal">{ company }</span>
                            </li>
                            <li className="border font-weight-bold p-2">
                                Tipo: <span className="font-weight-normal">{ type }</span>
                            </li>
                        </ul>
                    );
                }}    

            </Query>
        </Fragment>
    );
};

export default DataClient;