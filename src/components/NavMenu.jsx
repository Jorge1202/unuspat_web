import React from 'react';
import { Link } from 'react-router-dom';
import './styles/NavMenu.scss';


const ADMIN = [
    {name: 'HeadHunters', link:'headhunters'},
    {name: 'Registro de HeadHunter ', link:'formHH'},
    {name: 'Administradores', link:'administradores'},
    {name: 'Registro Admin', link:'formAdmin'},
];
const HH = [
    {name: 'Doctores', link:'doctores'},
    {name: 'Agenda', link:'agenda-hh'},
    {name: 'Registro de Prospecto', link:'formDoc'},
];
const DOC = [
    {name: 'Home Doctor', link:'doctor'},
    {name: '', link:''},
]
            
const NavMenu = () => {

    let usuario = 2;
    const items = (usuario == 1) ? ADMIN : (usuario == 2) ? HH : (usuario == 3) ? DOC : [];

    return (
        <nav className="NavMenu">
            <ul className="nav navbar-nav w-100 ps-1 text-center ul-menu">
                {
                    items.map(item => {
                        return (
                            <li className="nav-item">
                                <Link className="nav-link" to={`/${item.link}`}> {item.name} </Link>
                            </li>
                        )
                    })
                }
                <li className="nav-item">
                    <Link className="nav-link" to={`/login`}> Cerrar sesión </Link>
                </li>
            </ul>
        </nav>
    );
};



export default NavMenu;