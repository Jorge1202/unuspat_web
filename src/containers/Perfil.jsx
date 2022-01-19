import React, { useState, useEffect } from 'react';
import Contenedor from '../components/Contenedor';
import ColumContainer from '../components/ColumContainer';
import DatosUser from '../components/DatosUser';

import './styles/Perfil.scss'
import imgAdmin from '../assets/media/img/Equipo-unuspat.png';
import imgHH from '../assets/media/img/Headhunter.png';
import imgM from '../assets/media/img/Medico.png';

const Perfil = () => {

    const [user, setUser] = useState('0');
    const [dataUser, setDataUser] = useState(JSON.parse(localStorage.getItem('_iu')));
    const [imagen, setImagen] = useState('');
    
    useEffect(() => {
        setUser(localStorage.getItem('_T_U'));
        setImagen((user === '1' || user === '2') ? imgAdmin : (user === '3') ? imgHH : imgM);
    });

    useEffect(() => {
        setDataUser(JSON.parse(localStorage.getItem('_iu')))
    }, []);




    return (
        <Contenedor title="Mi perfil">
            <div className='row profile'>
                <ColumContainer m="4" x="3" >
                    <div className="card">
                        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                            <img src={imagen} alt="Profile" className="rounded-circle" />
                            <h2>{dataUser.nombre} {dataUser.apellidoPaterno}</h2>
                            <h3>{dataUser.tipoUsuario.tipo}</h3>
                            {/* <div className="social-links mt-2">
                                <a href="#" className="twitter"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
                            </div> */}
                        </div>
                    </div>
                </ColumContainer>

                <ColumContainer m="8" x="9">

                    <div className="card" >
                        <div className="card-body pt-3">
                            <DatosUser  id={dataUser.id} typeUser={dataUser.idTipoUsuario} perfil='perfil'/> 
                        </div>
                    </div>

                </ColumContainer>
            </div>
        </Contenedor>
    );
};

export default Perfil;