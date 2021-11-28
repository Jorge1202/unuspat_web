import React from 'react';
import './styles//Menu.scss'
import NavMenu from '../components/NavMenu';

// import imgAdmin from '../assets/media/img/Equipo-unuspat.png';
// import imgHH from '../assets/media/img/Headhunter.png';
// import imgM from '../assets/media/img/Medico.png';

// let tu = localStorage.getItem('tipoUser')
// let tu = '1'
// if(tu === '1' || tu === '2'){
//     imgPerfil = imgAdmin;
// }else if(tu === '3'){
//     imgPerfil = imgHH;
// } else if(tu === '4'){
//     imgPerfil = imgM;
// }

const Menu = () => {
    return (
        <div className="Menu">
            <div className="Menu_contfoto">
                <div className="Menu_foto">
                    {/* <img src={menu.imgPerfil} alt="Mi perfil"/> */}
                </div>
            </div>
            <NavMenu/>
        </div>
    );
};

export default Menu;