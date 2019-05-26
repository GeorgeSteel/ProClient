import React, { Component, Fragment } from 'react';
import { withRouter, Redirect } from 'react-router-dom';

import Failed from '../Alerts/Failed';

import { Mutation } from 'react-apollo';
import { NEW_USER_MUTATION } from '../../queries/Users';

const initialState = {
    user: '',
    password: '',
    repeatPassword: '',
    name: '',
    rol: ''
};

class Register extends Component {
    state = {
        ...initialState
    }

    handleChange = e => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    validateForm = () => {
        const { user, password, repeatPassword, name, rol } = this.state,
            noValid = !user || !name || !rol || !password || password !== repeatPassword;

        return noValid;
    }

    cleanState = () => {
        this.setState({ ...initialState });
    }

    createRegistry = (e, createUser) => {
        e.preventDefault();

        createUser().then((data) => {
            this.cleanState();
            this.props.history.push('/login')
        }).catch((err) => {
            console.error(err);
        });
    }

    render() {
        const { user, password, repeatPassword, name, rol } = this.state,
            useRol = this.props.session.rol,
            redirect = (useRol !== 'ADMINISTRADOR') ? <Redirect to="/clientes"/> : null;

        return (
            <Fragment>
                { redirect }
                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row justify-content-center">
                    <Mutation 
                        mutation={ NEW_USER_MUTATION } 
                        variables={{ user, password, name, rol }}
                    >
                        {(createUser, { loading, error, data }) => {
                            return(
                                <form 
                                    className="col-md-8"
                                    onSubmit={ e => this.createRegistry(e, createUser) }
                                >

                                    { (error) ? <Failed message={ error.message } /> : null }
                                    <div className="form-group">
                                        <label>Usuario</label>
                                        <input 
                                            type="text" 
                                            name="user" 
                                            className="form-control" 
                                            placeholder="Nombre Usuario" 
                                            onChange={ this.handleChange }
                                            value={ user }
                                        />
                                        <small className="form-text text-muted">
                                            (Sin espacios, ni caracteres especiales)
                                        </small>
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            className="form-control" 
                                            placeholder="Nombre Completo" 
                                            onChange={ this.handleChange }
                                            value={ name }
                                        />
                                        <small className="form-text text-muted">
                                            (Agrega el nombre completo con apellidos)
                                        </small>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label>Password</label>
                                            <input 
                                                type="password" 
                                                name="password" 
                                                className="form-control" 
                                                placeholder="Password"
                                                onChange={ this.handleChange }
                                                value={ password }
                                            />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label>Repetir Password</label>
                                            <input 
                                                type="password" 
                                                name="repeatPassword" 
                                                className="form-control" 
                                                placeholder="Repetir Password" 
                                                onChange={ this.handleChange }
                                                value={ repeatPassword }
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Rol:</label>
                                        <select 
                                            name="rol" 
                                            className="form-control" 
                                            value={ rol }
                                            onChange={ this.handleChange }
                                        >
                                            <option defaultValue>Elegir:</option>
                                            <option value="ADMINISTRADOR">Administrador</option>
                                            <option value="VENDEDOR">Vendedor</option>
                                        </select>
                                    </div>

                                    <button 
                                        disabled={ loading || this.validateForm() }
                                        type="submit" 
                                        className="btn btn-success float-right">
                                            Crear Usuario
                                    </button>
                                </form>
                            );
                        }}
                        
                    </Mutation>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Register);