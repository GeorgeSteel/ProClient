import React, { Component, Fragment } from 'react';

import { NEW_CLIENT_MUTATION } from '../../queries/Clients';
import { Mutation } from 'react-apollo';

export default class NewClient extends Component {
    state = {
        client: {
            name: '',
            lastname: '',
            company: '',
            age: '',
            type: '',
            phone: ''
        },
        emails: [],
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
        const { error } = this.state,
            { id } = this.props.session;
        let res = (error) ? <p className="alert alert-danger p-3 text-center">Todos los campos son requeridos</p> : null;
        return (
            <Fragment>
                <h2 className="text-center">Agregar un Cliente</h2>
                { res }
                <div className="row justify-content-center">
                    <Mutation 
                        mutation={ NEW_CLIENT_MUTATION }
                        onCompleted={ () => this.props.history.push('/clientes') }
                    >
                    { createClient => (
                        <form className="col-md-8 m-3" onSubmit={ (e) => {
                            e.preventDefault();
                    
                            const { name, lastname, company, age, type, phone } = this.state.client;
                            const { emails } = this.state;
                            
                            if(name === '' || lastname === '' || company === '' || age === '' || type === '' || phone === '') {
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
                                type,
                                seller: id,
                                phone
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
