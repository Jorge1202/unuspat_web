import React from 'react';
import './styles/title.css';

const title = ({title, subtitulo}) => {
    return (
        <div className='titlePrincipal'>
            <h2><strong>{title}</strong></h2>
            <p>{subtitulo}</p>
        </div>
    );
};

export default title;