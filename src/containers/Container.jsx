import React, { useState } from 'react';
import './styles/Container.css';
import Menu from '../containers/Menu';


const Container = ({ children }) => {

    return (
        <div className="Container fondo">
            <div className="Container_menu">
               <Menu/>
            </div>
            <div className="Container_content">
                {children }
            </div>
        </div>
    );
};

export default Container;