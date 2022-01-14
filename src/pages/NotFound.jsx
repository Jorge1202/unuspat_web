import React from 'react'
import './styles/NotFound.scss'
import error404 from '../assets/media/img/404_error3.svg';

export default function NotFound() {
    return (
        <div className='NotFound'>
            <section className='NotFound_seccion'>
                <div className='NotFound_text'>
                    <h1><strong>Hmmm!</strong></h1>
                    <h1>No encontramos lo que buscabas.</h1>
                </div>
                <img src={error404} alt="Error 404"/>
            </section>
            
        </div>
    )
}
