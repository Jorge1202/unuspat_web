import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import ColumContainer from '../components/ColumContainer';
import Boton from '../components/Boton';

import FormularioDoctor from '../components/FormularioDoctor';
import MessageSuccess from '../components/messageSuccess';
import Fetch from '../assets/js/fetch';
import logo from '@img/logo/logo-color.png';

import './styles/Formulario.scss';

const Formulario = () => {
    let history = useHistory();
    const [estado, setEstado] = useState({ done: true, success: true, mensaje: '' });
    const [doctor,setdoctor] = useState({});
    const [consulta,setconsulta] = useState({});
    const [consultorio,setconsultorio] = useState({});
    const [usuario, setUser] = useState({nombre:''});

    useEffect(() => {
        ValidUser();
    },[]);

    const handleChangeDoctor = e => { 
        const {name,value} = e.target;
        setdoctor({...doctor,[name]:value}); 
    };
    const handleChangeConsulta = e => { 
        if(e.target.type == "checkbox"){
            const {name,checked} = e.target;
            setconsulta({...consulta,[name]:checked}); 
        } else{
            const {name,value} = e.target;
            setconsulta({...consulta,[name]:value}); 
        }
    };
    const handleChangeConsultorio = e => { 
        if(e.target.type == "checkbox"){
            const {name,checked} = e.target;
            setconsultorio({...consultorio,[name]:checked}); 
        } else{
            const {name,value} = e.target;
            setconsultorio({...consultorio,[name]:value}); 
        } 
    };

    const ValidUser = () => {
        Fetch.GET({
            url: `user/doctores/verifyUser?id=${location.hash.split('?')[1]}`,
        })
        .then(async data => {
            if(!data.error && data.status === 200){
                setUser(data.body.usuarios[0])
                setdoctor(data.body.doctor[0])
            }else{
                history.push('error404');
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    async function handleSubmit (e){
        e.preventDefault();

        let datos ={
            doctor: doctor,
            consulta: consulta,
            consultorio: consultorio,
            usuario: usuario
        }
        console.log(datos);
        await Fetch.POST({
            url: `user/doctores/formulario`,
            obj: datos
        }).then(data =>{
            console.log(data);
            if(!data.error && data.status === 200){
                setEstado({
                    done: false,
                    success: true,
                    mensaje: 'Se ha guardado su registro con éxito'
                })
            }else{
                setEstado({
                    estado: false,
                    success: false,
                    mensaje: 'Se ha producido error al guardar los datos'
                })
                console.log(data);
            }
        }).catch(e =>{
            console.log(e);
        })
    }

    return ( 
        estado.done ?
            <div className='Formulario row'>
                <ColumContainer m='10' x='7' x_class='Formulario_colum'>
                    <form onSubmit={handleSubmit}>
                        <div className='Formulario__container'>
                            <div className='row'>
                                <ColumContainer m='12' x='12'>
                                    <img src={logo} alt="unuspat" className='Formulario_logo'/>
                                </ColumContainer>
                            </div>
                            
                            <FormularioDoctor 
                                usuario={usuario} 
                                doctor={doctor} 
                                consulta={consulta} 
                                consultorio={consultorio} 
                                handleChangeDoctor={(e)=>{handleChangeDoctor(e)}} 
                                handleChangeConsultorio={(e)=>{handleChangeConsultorio(e)}} 
                                handleChangeConsulta={(e)=>{handleChangeConsulta(e)}}/>

                            <div className='button-submit'>
                                <Boton type="submit" clases="btn_principal" texto="Ingresar"> Enviar formulario</Boton>
                            </div>
                        </div>
                    </form>
                </ColumContainer>
            </div>
        : 
        <MessageSuccess status={estado.success} message={estado.mensaje}>
            <Boton type="button" clases="btn_principal" texto="Ingresar" handleClick={()=>{history.push('/');}}> Ir a UNUSPAT</Boton>
        </MessageSuccess>        
    );
};

export default Formulario;