import React, { Component, Fragment } from 'react';

import { NEW_CLIENT_MUTATION } from '../queries/Clients';
import { Mutation } from 'react-apollo';

export default class NewClient extends Component {
    state = {
        client: {
            name: '',
            lastname: '',
            company: '',
            age: '',
            emails: [],
            type: ''
        },
        error: false
    };

    handleChange = e => {
        this.setState({
            client: {
                ...this.state.client,
                [e.target.name]: e.target.value
            }
        });
    }

    newEmail = () => {
        this.setState({
            client:{
                ...this.state.client,
                emails: this.state.client.emails.concat([{ email: '' }])
            }
        });
    }

    readEmail = i => e => {
        const newEmail = this.state.client.emails.map((email, index) => {
            if (i !== index) return email;
            return {
                ...email,
                email: e.target.value
            }
        });
        this.setState({
            client: {
                ...this.state.client,
                emails: newEmail
            }
        });
    }

    deleteEmail = i => () => {
        this.setState({
            client:{
                emails: this.state.client.emails.filter((email, index) => i !== index)
            }
        })
    }

    render() {
        const { error } = this.state;
        let res = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son requeridos</p> : null;
        return (
            <Fragment>
                <h2 className="text-center">Agregar Cliente</h2>
                { res }
                <div className="row justify-content-center">
                    <Mutation 
                        mutation={ NEW_CLIENT_MUTATION }
                        onCompleted={ () => this.props.history.push('/') }
                    >
                    { createClient => (
                        <form className="col-md-8 m-3" onSubmit={ (e) => {
                            e.preventDefault();
                    
                            const { name, lastname, company, emails, age, type } = this.state.client;
                            
                            if(name === '' || lastname === '' || company === '' || age === '' || type === '') {
                                this.setState({
                                    error: true
                                });
                                return;
                            } 
                                
                            this.setState({
                                error: false
                            });   
                            
                            const input = {
                                name,
                                lastname,
                                company,
                                emails,
                                age: Number(age),
                                type
                            };
                    
                            createClient({
                                variables: { input }
                            });
                        }}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Nombre</label>
                                    <input 
                                        type="text" 
                                        name="name"
                                        className="form-control" 
                                        placeholder="Nombre"
                                        onChange={ this.handleChange }
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Apellido</label>
                                    <input 
                                        type="text" 
                                        name="lastname"
                                        className="form-control" 
                                        placeholder="Apellido"
                                        onChange={ this.handleChange }
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-12">
                                    <label>Empresa</label>
                                    <input 
                                        type="text" 
                                        name="company"
                                        className="form-control" 
                                        placeholder="Empresa"
                                        onChange={ this.handleChange }
                                    />
                                </div>
                                { this.state.client.emails.map((input, idx) => (
                                    <div key={ idx } className="form-group col-md-12">
                                        <label>Email: { idx + 1 }:</label>
                                        <div className="input-group">
                                            <input 
                                                type="email"
                                                placeholder="Email"
                                                className="form-control"
                                                onChange={ this.readEmail(idx) }
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    type="button"
                                                    className="btn btn-danger"
                                                    onClick={ this.deleteEmail(idx) }
                                                > &times; Eliminar
                                                </button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                ))}
                                <div className="form-group d-flex justify-content-center col-md-12">
                                    <button 
                                        type="button"
                                        className="btn btn-warning"
                                        onClick={ this.newEmail }
                                    > + Agregar Email
                                    </button>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label>Edad</label>
                                    <input 
                                        type="text" 
                                        name="age" 
                                        className="form-control" 
                                        placeholder="Edad"
                                        onChange={ this.handleChange }
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Tipo Cliente</label>  
                                    <select className="form-control" name="type" onChange={ this.handleChange }>
                                        <option value="">Elegir...</option>
                                        <option value="PREMIUM">PREMIUM</option>
                                        <option value="BASICO">BASICO</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success float-right">Agregar Cliente</button>
                        </form>
                    ) }
                    </Mutation>
                </div>            
            </Fragment>
        );
    }
}
