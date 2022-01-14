import React from 'react';
import './styles/Contenedor.css';
import Title from './Title';

const Contenedor = ({children, title}) => {
    return (
        <div className='Contenedor'>
            <Title title={title} />
            {children}
        </div>
    );
};

export default Contenedor;