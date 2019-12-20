import React, { Component, Fragment } from 'react';

import { withRouter, Redirect } from 'react-router-dom';

import Failed from '../Alerts/Failed';

import { Mutation } from 'react-apollo';
import { AUTH_USER_MUTATION } from '../../queries/Users';

const initialState = {
    user : '',
    password: ''
}

class Login extends Component {
    state = {
        ...initialState
    }

     actualizarState = e => {
         const { name, value } = e.target;

        this.setState({
            [name] : value
        })
     }


    limpiarState = () => {
        this.setState({...initialState});
    }

    iniciarSesion = (e, authUser) => {
        e.preventDefault();

        authUser().then(async ({ data }) => {
            sessionStorage.setItem('token', data.authUser.token);

            await this.props.refetch();

            this.limpiarState();

            this.props.history.push('/panel');
        }).catch(err => {
            console.error(err);
        });
    }

    validarForm = () => {
        const { user, password } = this.state;
        const noValido = !user || !password;
        return noValido;
    }

    logOut = (session) => {
        if (session) return <Redirect to="/panel"/>;
    }
    render() { 

        const { user, password } = this.state;

        return ( 
            <Fragment>
                { this.logOut(sessionStorage.getItem('token')) }
                <h1 className="text-center mb-5">Iniciar Sesión</h1>
                <div className="row  justify-content-center">

                    <Mutation 
                        mutation={ AUTH_USER_MUTATION }
                        variables={{ user, password }}    
                    >
                    {( authUser, {loading, error, data}) => {

                        return (
                            
                            <form 
                                onSubmit={ e => this.iniciarSesion(e, authUser) } 
                                className="col-md-8"
                            >

                            { (error) ? <Failed message={ error.message } /> : null }                            

                            <div className="form-group">
                                <label>Usuario</label>
                                <input 
                                    onChange={this.actualizarState} 
                                    value={user}
                                    type="text" 
                                    name="user" 
                                    className="form-control" 
                                    placeholder="Nombre Usuario" 
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                    onChange={this.actualizarState} 
                                    value={password}
                                    type="password" 
                                    name="password" 
                                    className="form-control" 
                                    placeholder="Password"
                                />
                            </div>

                            <button 
                                disabled={ 
                                    loading || this.validarForm()
                                }
                                type="submit" 
                                className="btn btn-success float-right">
                                    Iniciar Sesión
                            </button>
                            
                        </form>
                        )     
                    }}
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}
 
export default withRouter(Login);