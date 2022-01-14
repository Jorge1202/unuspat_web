import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import ContainerLog from '../containers/ContainerLogin';
import Boton from '../components/Boton';
import './styles/Login.css'

const Recovery = () => {
    let history = useHistory();
    const [recovery,setRecovery] = useState({ email:''});
    const [estado,setEstado] = useState({ done:false, cargando:false, mensaje:''});

    const Redirect = ()=>{
        history.push('/login');
    }

    const handleChange = e => { 
        const {name,value} = e.target;
        setRecovery({...recovery,[name]:value}); 
    };

    const handleSubmit = e =>{
        e.preventDefault();

        setEstado({
            cargando: true,
        });
    }

    return (
        <ContainerLog title="Recuperar contraseña">
            <form onSubmit={handleSubmit} className="row contform">
                <div className="col-12">
                    <input value={recovery.email} name="email"  onChange={handleChange}type="text" className="form-control" placeholder="Correo electronico" id="validationServer03" aria-describedby="validationServer03Feedback" required/>
                    <div id="validationServer03Feedback" className="invalid-feedback">
                        Ingresa el usuario.
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
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        <span class="visually-hidden">Loading...</span>
                                    </Boton> 
                                :   <Boton type="submit" clases="btn_principal" texto="Ingresar"> Ingresar</Boton>
                        }
                        
                    </p>
                    <p className="recoveryPass" onClick={Redirect}>Ir al login</p>
                </div>
            </form>
        </ContainerLog>
    );
};

export default Recovery;