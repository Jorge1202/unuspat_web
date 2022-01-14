import React from 'react';
import './styles/Boton.scss'

const Boton = ({children, type="button", clases, disabled=false, handleClick = ()=>{}}) => <button onClick={handleClick} type={type} className={`btn ${clases}`} disabled={disabled}>{children}</button>;
export default Boton;