import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import ContainerLog from '../containers/ContainerLogin';
import Boton from '../components/Boton';
import Fetch from '../assets/js/fetch';

import './styles/Login.css'

const Code = () => {
    let history = useHistory();
    let idAuth = localStorage.getItem('idAuth');
    const [code, setCode] = useState({ codigo: '', idAuth: idAuth });
    const [estado, setEstado] = useState({ done: false, success: false, mensaje: '' });

    const Redirect = ()=>{
        history.push('/login');
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setCode({ ...code, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        let objFetch = {
            url: 'auth/autentication',
            obj: code,
        }
        Fetch.POST(objFetch)
            .then(data => {
                console.log(data);
                if (!data.error && data.status === 200) {

                    localStorage.setItem('_T_U', data.body.user.idTipoUsuario);
                    localStorage.setItem('_iu', JSON.stringify(data.body.user));
                    localStorage.setItem(data.body.idAuth, data.body.session_token);
                    
                    if (data.body.dispositivo) {
                        localStorage.setItem('navegador', data.body.dispositivo);
                    }

                    history.push('/perfil');

                } else {
                    let valores = {
                        done: data.error,
                        mensaje: data.body
                    };
                    setEstado(valores);
                }
            }).catch((e) => {
                console.log(e);
                this.setState({
                    done: true,
                })
            })
    }

    return (
        <ContainerLog title="Código de autenticación">
            <form onSubmit={handleSubmit} className="row contform">
                <div className="col-12">
                    <p className="text-center mensaje-error fs-5">Se le ha enviado por correo electrónico un código para autenticar su cuenta. <br/>Ingresalo aquí.</p>
                </div>
                <div className="col-12">
                    <input value={code.codigo} name="codigo"  onChange={handleChange}type="text" className="form-control" placeholder="Código" id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        Ingresa el código.
                    </div>
                </div>
                {
                    estado.done ? <p className="text-center mensaje-error fs-5">{estado.mensaje}</p> : <p></p>
                }
                <div className="col-12 text-center mt-5">
                    <p>
                        {
                            estado.cargando
                                ?   <Boton type="button" clases="btn_principal" disabled={true}> 
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="visually-hidden">Loading...</span>
                                    </Boton> 
                                :   <Boton type="submit" clases="btn_principal" texto="Ingresar"> Enviar</Boton>
                        }
                        
                    </p>
                    <p className="recoveryPass" onClick={Redirect}>Ir al login</p>
                </div>
            </form>
        </ContainerLog>
    );
};

export default Code;