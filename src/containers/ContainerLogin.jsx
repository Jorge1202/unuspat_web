import React from 'react';
import './styles/ContainerLog.scss'

import fondo from '../assets/media/img/bg-login.png';
import img from '../assets/media/img/login2-logo.png';
import logo from '../assets/media/logo/logo-blanco.png';

const ContainerLog = ({title, children}) => {

    return (
        <div className="ContainerLog" style={{ backgroundImage: `url(${fondo})`}}>
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-4 imgContainer"  style={{ backgroundImage: `url(${img})`}}></div>

                        <div className="col-md-12 col-lg-8 form">
                            <div className="form__inputs">
                                <div className="form__inputs-input">
                                    <div className="logoB">
                                        <img src={logo} alt="unuspat"/>
                                    </div>
                                    <div className="title">{title}</div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContainerLog;