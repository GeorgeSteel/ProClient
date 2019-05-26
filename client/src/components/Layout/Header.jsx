import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Logout from '../Auth/Logout';
import RegisterBtn from './RegisterBtn';

const Header = ({ session: { getUser } }) => {
    let sessionExists = (getUser) ? <NavAuth session={ getUser }/> : <NavNoAuth/>;
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
            <div className="container">
                { sessionExists }
            </div>
        </nav>
    );
};

const NavNoAuth = () => (
    <h3 className="navbar-brand text-light font-weight-bold">CRM</h3>    
);
const NavAuth = ({ session }) => (
    <Fragment>
        <Link to="/panel" className="navbar-brand text-light font-weight-bold">CRM</Link>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navegacion">
            <ul className="navbar-nav ml-auto text-right">
                <li className="nav-item dropdown mr-md-2 my-2 my-sm-2 my-md-0">
                    <button 
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                    >Clientes
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/clientes" className="dropdown-item">Ver Clientes</Link>
                        <Link to="/cliente/nuevo" className="dropdown-item">Nuevo Cliente</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <button 
                        className="nav-link dropdown-toggle btn btn-block btn-success"
                        data-toggle="dropdown"
                    >Productos
                    </button>
                    <div className="dropdown-menu" aria-labelledby="navegacion">
                        <Link to="/productos" className="dropdown-item">Ver Productos</Link>
                        <Link to="/producto/nuevo" className="dropdown-item">Nuevo Producto</Link>
                    </div>
                </li>
                <RegisterBtn session={ session } />
                <Logout/>
            </ul>
        </div>
    </Fragment>
);

export default Header;