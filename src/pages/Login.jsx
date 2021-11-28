import React from 'react';
import { useHistory } from 'react-router-dom';
import ContainerLog from '../containers/ContainerLog';
import Boton from '../components/Boton';
import './styles/Login.css'

const Login = () => {
    let history = useHistory();
    // const frmLogin = { username:'', password:''};
  
    const Redirect = ()=>{
        history.push('/recovery');
    }
    return (
        <ContainerLog title="Iniciar sesión">
            <form className="row contform">
                <div className="col-12">
                    {/* <label for="validationServer03" className="form-label">City</label> */}
                    <input name="username" type="text" className="form-control" placeholder="Usuario" id="validationServer03" aria-describedby="validationServer03Feedback" required />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        Ingresa el usuario.
                    </div>
                </div>
                <div className="col-12">
                    {/* <label for="validationServer03" className="form-label">City</label> */}
                    <input  name="password"  type="password" className="form-control " placeholder="Contraseña" id="validationServer04" aria-describedby="validationServer03Feedback" required />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        Ingresa la contraseña.
                    </div>
                </div>
                {/* {
                    estado.done ? <p className="text-center mensaje-error fs-5">{estado.mensaje}</p> : <p></p>
                } */}
                <div className="col-12 text-center mt-5">.
                    <p>
                        {/* {
                            estado.cargando
                                ?   <Boton type="submit" color="btn btn_principal" texto="Ingresar"> 
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        <span className="visually-hidden">Cargando...</span>
                                    </Boton> 
                                :   <Boton type="submit" color="btn btn_principal" texto="Ingresar" /> 
                        } */}
                        <p><Boton type="submit" color="btn btn_principal" texto="Ingresar" /></p>
                    </p>
                    <p className="recoveryPass" onClick={Redirect}>Olvidé mi contraseña</p>
                </div>
            </form>
        </ContainerLog>
    );
};

export default Login;