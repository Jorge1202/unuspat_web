import React, { useState, useEffect } from 'react';
import Contenedor from '../components/Contenedor';
import ColumContainer from '../components/ColumContainer';
import DatosUser from '../components/DatosUser';
import Fetch from '../assets/js/fetch';

import './styles/Perfil.scss'
import imgAdmin from '../assets/media/img/Equipo-unuspat.png';
import imgHH from '../assets/media/img/Headhunter.png';
import imgM from '../assets/media/img/Medico.png';


let objAgregar = {
    "nombre": '',
    "telefono": '',
    "email": '',
    "profesion": '',
    "rfc": '',
    "curp": '',
    "despacho": '',
    "marca": '',
    "paginaWeb": '',
    "telefonoOficina": '',
    "estado": '',
    "direccion": '',
    // "razonSocial": body.razonSocial,
    // "genero": body.genero,
    // "apellidoPaterno": body.apellidoPaterno,
    // "apellidoMaterno": body.apellidoMaterno,
    // "correoRecuperacion": body.correoRecuperacion,
}


const Perfil = () => {

    const [user, setUser] = useState('0');
    const [dataUser, setDataUser] = useState({});
    const [imagen, setImagen] = useState('');
    useEffect(() => {
        const callmethodApi = async () =>{
            await handleGET();
        }
        callmethodApi();
    },[]);

    useEffect(() => {
        setUser(localStorage.getItem('_T_U'));
        setImagen((user === '1' || user === '2') ? imgAdmin : (user === '3') ? imgHH : imgM);
    });


    async function handleGET (){

        // setEstado({
        //     cargando: true,
        // });


        let objFetch = {
            url: 'user/perfil?id=5M7Wght5AXalwDQ85qah3&tipo=1',
        }
        Fetch.GET(objFetch)
        .then(data=>{
            if(!data.error && data.status === 200){
                const marcasFinal = {...data.body.user, ...data.body.direcciones};
                localStorage.setItem('_n', `${data.body.user.nombre} ${data.body.user.apellidoPaterno}`);
                setDataUser(marcasFinal);
            } else {
                // setEstado({
                //     done: true,
                //     mensaje: data.body
                // });
            }
        }).catch((e) => {

            // setEstado({
            //     done: false,
            //     mensaje: 'Error interno'
            // });

        });

    }

    return (
        <Contenedor title="Mi perfil">
            <div className='row profile'>
                <ColumContainer m="4" x="3" >
                    <div className="card">
                        <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                            <img src={imagen} alt="Profile" className="rounded-circle" />
                            <h2>{dataUser.nombre} {dataUser.apellidoPaterno}</h2>
                            <h3>{dataUser.idTipoUsuario}</h3>
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
                            <DatosUser userShow={user} Data={dataUser} perfil='perfil'/> 
                        </div>
                    </div>

                </ColumContainer>
            </div>
        </Contenedor>
    );
};

export default Perfil;