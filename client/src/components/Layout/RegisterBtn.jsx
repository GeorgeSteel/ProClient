import React from 'react';
import { Link } from 'react-router-dom';

const RegisterBtn = ({ session: { rol } }) => {
    if (rol !== 'ADMINISTRADOR') return null;
    return (
        // <Link 
        //     to='/registro'
        //     className="btn btn-warning ml-md-2 mt-2 mt-md-0"
        // >
        //     Crear Usuario
        // </Link>
        <li className="nav-item dropdown ml-4">
            <button 
                className="nav-link dropdown-toggle btn btn-block btn-warning"
                data-toggle="dropdown"
            >Usuarios
            </button>
            <div className="dropdown-menu" aria-labelledby="navegacion">
                <Link to="/usuarios" className="dropdown-item">Ver Usuarios</Link>
                <Link to="/registro" className="dropdown-item">Crear Usuario</Link>
            </div>
        </li>
    );
};

export default RegisterBtn;