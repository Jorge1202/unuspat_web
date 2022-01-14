import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.css';
import logo from '../assets/media/logo/logo-color.png';
import video from '../assets/media/video/medics.mp4';

export default function Home () {
    return (
        <div className="Home">
            <header className="Home-header">
                <nav>
                    <div className="Home-cont-logo">
                        <img src={logo} className="Home-logo"  alt="Mi perfil"/>
                    </div>
                    <div className="Home-cont-btn">
                        <Link className="Home-link fs-5 btn btn_principal" to="/login" rel="noopener noreferrer"> Ingresar </Link>
                    </div>
                </nav>

                <div className="Home-cont-video">
                    <video className='videoTag' autoPlay loop muted>
                        <source src={video} type='video/mp4' />
                    </video>
                </div>

            </header>
        </div>
    )
}
