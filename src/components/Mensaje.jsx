import React from 'react';
import './styles/Mensaje.scss'

const mensaje = ({children, icono, mensaje }) => {
    return (
        <div className="mensaje">
            <i className={`bi bi-${icono}`}></i>
            <p className="fs-2 text">{mensaje}</p>
            <p>{children}</p>
        </div>
    );
};

export default mensaje;