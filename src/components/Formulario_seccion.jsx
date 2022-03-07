import React from 'react';

const Formulario_seccion = ({children, title}) => {
    return (
        <div className='Formulario_seccion'>
            <div className='seccion_title'>
                {title}
            </div>
            <div className='seccion_container'>
                {children}
            </div>
        </div>
    );
};

export default Formulario_seccion;