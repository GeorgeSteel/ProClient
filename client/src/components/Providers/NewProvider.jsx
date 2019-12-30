import React, { Component, Fragment } from 'react';

import { NEW_PROVIDER_MUTATION } from '../../queries/Providers';
import { Mutation } from 'react-apollo';

export default class NewProvider extends Component {
    state = {
        provider: {
            name: '',
            lastname: '',
            company: '',
            phone: ''
        },
        emails: [],
        error: false
    };

    handleChange = e => {
        this.setState({
            provider: {
                ...this.state.provider,
                [e.target.name]: e.target.value
            }
        });
    }

    newEmail = () => {
        this.setState({            
            emails: this.state.emails.concat([{ email: '' }])            
        });
    }

    readEmail = i => e => {
        const newEmail = this.state.emails.map((email, index) => {
            if (i !== index) return email;
            return {
                ...email,
                email: e.target.value
            }
        });
        this.setState({
            emails: newEmail            
        });
    }

    deleteEmail = i => () => {
        this.setState({
            emails: this.state.emails.filter((email, index) => i !== index)
        });
    }

    render() {
        const { error } = this.state;
        let res = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son requeridos</p> : null;
        return (
            <Fragment>
                <h2 className="text-center">Agregar un Proveedor</h2>
                { res }
                <div className="row justify-content-center">
                    <Mutation 
                        mutation={ NEW_PROVIDER_MUTATION }
                        onCompleted={ () => this.props.history.push('/proveedores') }
                    >
                    { createProvider => (
                        <form className="col-md-8 m-3" onSubmit={ (e) => {
                            e.preventDefault();
                    
                            const { name, lastname, company, phone } = this.state.provider;
                            const { emails } = this.state;
                            
                            if(name === '' || lastname === '' || company === '' || phone === '') {
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
                                phone
                            };
                    
                            createProvider({
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
                                <div className="form-group col-md-8">
                                    <label>Empresa</label>
                                    <input 
                                        type="text" 
                                        name="company"
                                        className="form-control" 
                                        placeholder="Empresa"
                                        onChange={ this.handleChange }
                                    />
                                </div>
                                <div className="form-group col-md-4">
                                    <label>Teléfono</label>
                                    <input 
                                        type="tel" 
                                        name="phone"
                                        className="form-control" 
                                        placeholder="Teléfono"
                                        onChange={ this.handleChange }
                                    />
                                </div>                                
                            </div>
                            <div className="form-row">
                                { this.state.emails.map((input, idx) => (
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
                            <button type="submit" className="btn btn-success float-right">Agregar Proveedor</button>
                        </form>
                    ) }
                    </Mutation>
                </div>
            </Fragment>
        );
    }
}
