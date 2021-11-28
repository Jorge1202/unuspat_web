import React from 'react';
import { useHistory } from 'react-router-dom';
import ContainerLog from '../containers/ContainerLog';
import Boton from '../components/Boton';
import './styles/Login.css'

const Recovery = () => {
    let history = useHistory();

    const Redirect = ()=>{
        history.push('/login');
    }
    return (
        <ContainerLog title="Recuperar contraseña">
            <form className="row contform">
                <div className="col-12">
                    <input name="username" type="text" className="form-control" placeholder="Correo electronico" id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        Ingresa el usuario.
                    </div>
                </div>
                <div className="col-12 text-center mt-5">
                    <p><Boton type="submit" color="btn btn_principal" texto="Enviar" /></p>
                    <p className="recoveryPass" onClick={Redirect}>Ir al login</p>
                </div>
            </form>
        </ContainerLog>
    );
};

export default Recovery;