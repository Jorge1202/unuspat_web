import React, { useState } from 'react';
import './styles/Container.scss';
import Menu from '../containers/Menu';

import fondo from '../assets/media/img/bg-login.png';

const Container = ({ children }) => {

    const [estadoMenu, setEstadoMenu] = useState(false);

    return (
        <div className="Container fondo" style={{ backgroundImage: `url(${fondo})`}}>
            <div  className={`Container_menu ${estadoMenu ? 'activeMenu' : ''} `}>
               <Menu menuResponsive={estadoMenu}/>
            </div>
           
            <div className={`Container_content ${estadoMenu ? 'activeMenu' : ''} `}>
                <header>
                    <div className={`menuBtn ${estadoMenu ? 'activeMenu' : ''} `} onClick={() => setEstadoMenu(!estadoMenu)}>
                        <span className="lines"></span>
                    </div>
                    <div className='nameTitle'>Unuspat</div>
                </header>
                {children }
            </div>
        </div>
    );
};

export default Container;