import React from 'react';
import { Link } from 'react-router-dom'

const Barra = props => {

    return (  
        <header className="app-header">
            <p className="nombre-usuario"> <span>Bienvenido </span> al CPanel</p>
            <nav className="nav-principal">
                <Link to={'/'} className="btn btn-white cerrar-sesion">
                    Volver al inicio
                </Link>
            </nav>
            
        </header>
    );
}
 
export default Barra;