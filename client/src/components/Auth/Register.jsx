import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';

import Failed from '../Alerts/Failed';

import { Mutation } from 'react-apollo';
import { NEW_USER_MUTATION } from '../../queries/Users';

const initialState = {
    user: '',
    password: '',
    repeatPassword: ''
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
        const { user, password, repeatPassword } = this.state,
            noValid = !user || !password || password !== repeatPassword;

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
        const { user, password, repeatPassword } = this.state;

        return (
            <Fragment>
                <h1 className="text-center mb-5">Nuevo Usuario</h1>
                <div className="row justify-content-center">
                    <Mutation mutation={ NEW_USER_MUTATION } variables={{ user, password }}>
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
                                    </div>
                                    <div className="form-group">
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
                                    <div className="form-group">
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