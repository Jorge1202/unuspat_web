import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ContainerLog from '../containers/ContainerLogin';
import Boton from '../components/Boton';

import Fetch from '../assets/js/fetch';
import Funciones from '../assets/js/Funciones';
import './styles/Login.css'

const Login = () => {
    let history = useHistory();
    const [login,setlogin] = useState({ username:'', password:''});
    const [estado,setEstado] = useState({ done:false, cargando:false, mensaje:'Mensaje 1'});
    
    useEffect(()=>{
        validLogin_ON()
    },[]);

    const validLogin_ON = async () => {
        console.log('Valid login open');
        if(localStorage.getItem(localStorage.getItem('idAuth')) && localStorage.getItem('_T_U')){
            let objFetch = {
                url: `auth/validLogin_ON/?idAuth=${localStorage.getItem('idAuth')}`
            }
            await Fetch.GET(objFetch)
            .then(data=>{
                debugger
                if(!data.error && data.status === 200){
                    localStorage.setItem('_iu', JSON.stringify(data.body.user));
                    history.push('/perfil');
                } 
            }).catch((e) => {
                console.log(e);
            });
        } 
    }

    const Redirect = ()=>{
        history.push('/recovery');
    }

    const handleChange = e => { 
        const {name,value} = e.target;
        setlogin({...login,[name]:value}); 
    };

    async function handleSubmit (e){
        e.preventDefault();

        setEstado({
            cargando: true,
        });

        let objFetch = {
            url: 'auth/login',
            obj: login,
        }
        Fetch.POST(objFetch)
        .then(data=>{
            if(!data){
                setEstado({
                    done: true,
                    mensaje: 'Problemas de conexión'
                });
            } else if(!data.error && data.status === 200){
                if(data.body.session_token){
                    setEstado({
                        cargando: false,
                    });
                    // acceso a plataforma
                    Funciones.addLocationStorage_login(data);                  
                    history.push('/perfil');

                } else{
                    //nuevo dispositivo, debe autenticar el dispositivo
                    localStorage.setItem('idAuth', data.body.idAuth);
                    setEstado({
                        done: true,
                        mensaje: data.body.mensaje
                    });
                    history.push('/code');
                }

            } else {
                console.log(data);
                setEstado({
                    done: true,
                    mensaje: data.body
                });
            }
        })
    }
    
    return (
        <ContainerLog title="Bienvenido a Unuspat">
            <form onSubmit={handleSubmit} className="row contform">
                <div className="col-12">
                    {/* <label for="validationServer03" className="form-label">City</label> */}
                    <input value={login.username} name="username"  onChange={handleChange} type="text" className="form-control" placeholder="Usuario" id="validationServer03" aria-describedby="validationServer03Feedback" required />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        Ingresa el usuario.
                    </div>
                </div>
                <div className="col-12">
                    {/* <label for="validationServer03" className="form-label">City</label> */}
                    <input value={login.password} name="password" onChange={handleChange} type="password" className="form-control " placeholder="Contraseña" id="validationServer04" aria-describedby="validationServer03Feedback" required />
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        Ingresa la contraseña.
                    </div>
                </div>
                {
                    estado.done ? <p className="text-center mensaje-error fs-5">{estado.mensaje}</p> : <p></p>
                }
                <div className="col-12 text-center mt-5">.
                    <p>
                        {
                            estado.cargando
                                ?   <Boton type="button" clases="btn_principal" disabled={true}> 
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span className="visually-hidden">Loading...</span>
                                    </Boton> 
                                :   <Boton type="submit" clases="btn_principal" texto="Ingresar"> Ingresar</Boton>
                        }
                        
                    </p>
                    <p className="recoveryPass" onClick={Redirect}>Olvidé mi contraseña</p>
                </div>
            </form>
        </ContainerLog>
    );
};

export default Login;