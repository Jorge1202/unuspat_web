import React from 'react';
import './styles/Boton.scss'

const Boton = ({type, color, texto}) => <button type={type} className={`fs-5 ${color}`} type="submit">{texto}</button>;
export default Boton;