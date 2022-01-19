import React, {useState, useEffect} from 'react';
import './styles//Menu.scss'
import Link from '../components/Link';
import NavMenu from '../components/NavMenu';

import imgAdmin from '../assets/media/img/Equipo-unuspat.png';
import imgHH from '../assets/media/img/Headhunter.png';
import imgM from '../assets/media/img/Medico.png';

// localStorage.setItem('_T_U', '2');

const Menu = ({menuResponsive = false}) => {
    
    const [user, setUser] = useState('0');
    const [dataUser, setDataUser] = useState('');
    const [imagen, setMenu] = useState('');
    useEffect(() => {
        setUser(localStorage.getItem('_T_U'));
        let obj = JSON.parse(localStorage.getItem('_iu'));
        setDataUser(`${obj.nombre} ${obj.apellidoPaterno}`);
        setMenu((user === '1' || user === '2') ? imgAdmin : (user === '3') ? imgHH : imgM);
    });

    return (
        <React.Fragment>
            <div className="Menu">
                <div className="Menu_contfoto">
                    <div className="Menu_foto">
                        <img src={imagen} alt="Mi perfil"/>
                        <div className="Menu_nombre">
                            <Link clase="nav-link" link="/perfil"><h4>{dataUser}</h4></Link>
                        </div>
                    </div>
                </div>
                <NavMenu/>
            </div>

            <div className={`contMenuResponsive ${menuResponsive ? 'activeMenu' : ''} `}>
                <div className="Menu_contfoto">
                    <div className="Menu_foto">
                        <img src={imagen} alt="Mi perfil"/>
                        <div className="Menu_nombre">
                            <Link clase="nav-link" link="/perfil"><h4>{dataUser}</h4></Link>
                        </div>
                    </div>
                </div>
                <NavMenu pc={false} />
            </div>
        </React.Fragment>
    );
 
};

export default Menu;