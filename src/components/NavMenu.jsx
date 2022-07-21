import React, {useState, useEffect}  from 'react';
import { useHistory } from 'react-router-dom';
import './styles/NavMenu.scss';
import Link from '../components/Link';
import Boton from '../components/Boton';
import Fetch from '../assets/js/fetch';
import Funciones from '../assets/js/Funciones';


const ADMIN_master = [
    {name: 'Administradores', link:'administradores'},
    {name: 'HeadHunters', link:'headhunters'},
    {name: 'Doctores', link:'doctores'},
    {name: 'Agenda', link:'agenda-hh'},
];

const ADMIN = [
    {name: 'Administradores', link:'administradores'},
    {name: 'Nuevo Administador', link:'formAdmin'},
    {name: 'HeadHunters', link:'headhunters'},
    {name: 'Nuevo HeadHunter ', link:'formHH'},
];
const HH = [
    {name: 'Doctores', link:'doctores'},
    {name: 'Nuevo Prospecto', link:'formDoc'},
    {name: 'Agenda', link:'agenda-hh'},
];
const DOC = [
    {name: 'Dashboard', link:'dashboard'},
    {name: 'Ingresos', link:'ingresos'},
    {name: 'Egresos', link:'egresos'},
    {name: 'Agenda', link:'calendario'},
    {name: 'Catálogos', link:'catalogos'},
    {name: 'Colaboradores', link:'colaboradores'},
    {name: 'Proveedores', link:'proveedores'},
    {name: 'Reportes', link:'reportes'},
]
            
const NavMenu = ({pc = true}) => {
    let history = useHistory();
    const [user, setUser] = useState('0');
    useEffect(() => {
        setUser(localStorage.getItem('_T_U'));
    });

    const [itemsMenu, setitemsMenu] = useState(ADMIN);
    const [active, setActive] = useState({activo: false, url:location.href});
    useEffect(() => {
        if(user=="1"){
            setitemsMenu(ADMIN_master);
        } else if(user=="2"){
            setitemsMenu(ADMIN);
        } else if(user=="3"){
            setitemsMenu(HH);
        } else if(user=="4"){
            setitemsMenu(DOC);
        }
    });

    const handleClick = async (e) => {
        e.preventDefault();
        let objFetch = {
            url: `auth/logout`,
        }

        await Fetch.PUT(objFetch)
        .then(async data =>{
            if(!data.error && data.status === 200){
                Funciones.deleteSession()
                history.push('/login');
            } 
        }).catch((error) => {
            console.warn(error);
        });
    }

    if(pc){
        return (
            <nav className="NavMenu">
                <ul className="nav navbar-nav w-100 ps-1 ul-menu">
                    {
                        itemsMenu.map((item, i) => {
                            return (
                                <li key={i} className={`nav-item ${active.url.includes(item.link) ? 'active' : ''}`} >
                                    <Link clases="nav-link" link={`/${item.link}`}> {item.name} </Link>
                                </li>
                            )
                        })
                    }
                    <li className="nav-item" onClick={handleClick}>
                        <Boton clases="nav-link" > Cerrar sesión </Boton>
                    </li>
                </ul>
            </nav>
        );

    } else {
        return (
            <nav className='menuResponsive'>
                <ul>
                    {
                        itemsMenu.map((item, i) => {
                            return (
                                <li  key={i} className={`${active.url.includes(item.link) ? 'act' : ''}`}>
                                     <Link clase="nav-link" link={`/${item.link}`}> 
                                        {/* <i className="bi bi-alarm-fill"></i> */}
                                        <span>{item.name}</span> 
                                     </Link>
                                </li>
                            )
                        })
                    }
                    <li className="nav-item" onClick={handleClick}>
                        <Link clase="nav-link" link={`/login`}> 
                            {/* <i className="bi bi-alarm-fill"></i> */}
                            <span>Cerrar sesión</span>  
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
};



export default NavMenu;