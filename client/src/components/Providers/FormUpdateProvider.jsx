import React, { Component } from "react";
import { UPDATE_PROVIDER_MUTATION } from '../../queries/Providers';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class FormUpdate extends Component {
    state = {
        provider: this.props.provider,
        emails: this.props.provider.emails
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
        const { name, lastname, company, phone } = this.state.provider;

        return (
            <Mutation 
                mutation={ UPDATE_PROVIDER_MUTATION }
                onCompleted={ () => this.props.refetch().then(() => {
                    this.props.history.push('/proveedores');
                }) }
            >
                { updateProvider => (         
                <form className="col-md-8 m-3" onSubmit={ e => {
                    e.preventDefault();

                    const { id, name, lastname, company, phone } = this.state.provider;

                    const input = {
                        id,
                        name, 
                        lastname,
                        company,
                        phone,
                        emails: this.state.emails
                    };

                    updateProvider({
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
                                defaultValue={ name }
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
                                defaultValue={ lastname }
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
                                defaultValue={ company }
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
                                defaultValue={ phone }
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
                                        defaultValue={input.email}
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
                    <button type="submit" className="btn btn-success float-right">Editar Proveedor</button>
                </form>
                ) }  
            </Mutation>
        );
    }
}

export default withRouter(FormUpdate);
