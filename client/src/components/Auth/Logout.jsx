import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const logout = (client, history) => {
    sessionStorage.removeItem('token', '');
    client.resetStore();
    history.push('/login');
}

const Logout = ({ history }) => (
    <ApolloConsumer>
        { client => {
            return(
                <button 
                    className="btn btn-light ml-md-2 mt-2 mt-md-0 ml-2" 
                    onClick={ () => logout(client, history) }
                >
                    Cerrar Sesión
                </button>
            );
        } }
    </ApolloConsumer>
);

export default withRouter(Logout);