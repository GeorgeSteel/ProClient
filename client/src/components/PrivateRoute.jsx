import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import decode from 'jwt-decode';

const isTokenExpired = (token) => {
    try {
        const decoded = decode(token);
        if (decoded.exp < Date.now() / 1000) {
            localStorage.removeItem('token', '');
            window.location.reload();
            // props.history.push('/login');
        }
    }
    catch (err) {
        return false;
    }
}

const PrivateRoute = ({ component: Component, session, ...rest }) => {
    const token = localStorage.getItem('token');
    return (
        <Route 
            {...rest}
            render={ props => 
                (token) ? (
                    isTokenExpired(token),             
                    <Component {...props} session={ session }/>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
