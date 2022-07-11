import React from 'react';
import './styles/Load.scss';

const Load = ({show=false}) => {
    return(
        show &&
        <div className='contenedorLoad centerL'>
            <div className="spinner-border sizeLoad" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    )
}
export default Load; 