import React from 'react';
import './styles/Contenedor.css';
import Title from './Title';

const Contenedor = ({children, title}) => {
    return (
        <div className='Contenedor h-100'>
            <Title title={title} />
            {children}
        </div>
    );
};

export default Contenedor;