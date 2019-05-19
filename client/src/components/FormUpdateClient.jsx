import React, { Component } from "react";
import { UPDATE_CLIENT_MUTATION } from '../queries/Clients';
import { Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

class FormUpdate extends Component {
    state = {
        client: this.props.client
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
        const { emails, name, lastname, company, type, age } = this.state.client;

        return (
            <Mutation 
                mutation={ UPDATE_CLIENT_MUTATION }
                onCompleted={ () => this.props.refetch().then(() => {
                    this.props.history.push('/');
                }) }
            >
                { updateClient => (         
                <form className="col-md-8 m-3" onSubmit={ e => {
                    e.preventDefault();

                    const { id, name, lastname, age, company, type, emails } = this.state.client;
                    const input = {
                        id,
                        name, 
                        lastname,
                        age: Number(age),
                        company,
                        type,
                        emails
                    };

                    updateClient({
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
                        <div className="form-group col-md-12">
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
                        { emails.map((input, idx) => (
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
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label>Edad</label>
                            <input 
                                type="text" 
                                name="age" 
                                className="form-control" 
                                placeholder="Edad"
                                onChange={ this.handleChange }
                                defaultValue={ age }
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Tipo Cliente</label>  
                            <select 
                                className="form-control" name="type" 
                                onChange={ this.handleChange }
                                defaultValue={ type }
                                >
                                <option value="">Elegir...</option>
                                <option value="PREMIUM">PREMIUM</option>
                                <option value="BASICO">BASICO</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success float-right">Editar Cliente</button>
                </form>
                ) }  
            </Mutation>
        );
    }
}

export default withRouter(FormUpdate);
