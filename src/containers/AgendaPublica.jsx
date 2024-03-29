import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../assets/media/logo/logo-color.png';
import ColumContainer from '../components/ColumContainer';
import './styles/AgendaPublic.scss';
import Fetch from '../assets/js/fetch';
import Calendar from 'react-calendar';
import Boton from '../components/Boton';
import MessageSuccess from '../components/messageSuccess';
import Alert from '../components/Alert';
import 'react-calendar/dist/Calendar.css';


const AgendaPublica = () => {
    let history = useHistory();
    useEffect(() => {
        ValidUser();
    },[]);
    const [value, onChange] = useState(new Date());
    const [fecha, setFecha] = useState('');
    const [alert, setShowAlert] = useState({ show: false, mesagge: '', color: '' });
    const [hora, setHora] = useState({horaFin: "",horaInicio: "", idHora: 0});
    const [usuario, setUser] = useState({});
    const [horas, setHoras] = useState([]);
    const [status, setStatus] = useState({ done: true, success: true, mensaje: 'mensaje' });
    const [estado,setEstado] = useState({ cargando:false, success:false});

    const ValidUser = () => {
        Fetch.GET({
            url: `agenda?id=${location.hash.split('?')[1]}`,
        })
        .then(async data => {
            if(!data.error && data.status === 200){
                await setUser(data.body);
                await carga(data.body.userCreate);
            }else{
                history.push('error404');
            }
        }).catch((error) => {
            console.warn(error);
        });
    }

    const carga = (reclutador) => {
        
        setFecha(new Date().toDateString());
        let fecha = new Date().constructor()
        if(fecha.includes('Sat') || fecha.includes('Sun')){
            setHoras([]);

        } else {
            Fetch.GET({
                url: `agenda/hours?reclutador=${reclutador}&fecha=${new Date().toISOString()}`,
            })
            .then(data => {
                if(!data.error && data.status === 200){
                    setHoras(data.body)
                } else {
                    console.log(data);
                }

            }).catch((error) => {
                console.warn(error);
            });
        
        }
    }

    const handleChange = (e) => {
        onChange(e);
        setFecha(new Date(e).toDateString())
        let fecha = e.toString();
        setHora({horaFin: "",horaInicio: "", idHora: 0})
        if(fecha.includes('Sat') || fecha.includes('Sun')){
            setHoras([]);
        } else {
            Fetch.GET({
                url: `agenda/hours?reclutador=${usuario.userCreate}&fecha=${new Date(e).toISOString()}`,
            })
            .then(data => {
                if(!data.error && data.status === 200){
                    setHoras(data.body);
                } else {
                    console.log(data);
                }
            }).catch((error) => {
                console.warn(error);
            });
        }
    }

    const handleClick_selectHora = (idhora) => {

        let hora = {
            idHora: idhora.id,
            EndTime: idhora.EndTime,
            StartTime: idhora.StartTime, 
        }
        setHora(hora)
    }

    const handleClick = async () => {
        setEstado({cargando:true})
        if(hora.idHora != 0){
            let datos = {...usuario, ...hora};
            datos.Date = new Date(fecha).toJSON().split('T')[0];
            await Fetch.POST({
                url: `agenda/meeting`,
                obj: datos
            })
            .then(data => {
                debugger
                if(!data.error && data.status === 200){

                    setStatus({ done: false, success: true, mensaje: data.body });

                }  else {
                    setStatus({ done: false, success: false, mensaje: data.body });
                }
            }).catch((error) => {
                console.warn(error);
            });
        } else {
            setShowAlert({ show: true, mensaje:'Selecciona una hora', color: `warning` });
            setTimeout(() => {
                setShowAlert({ show: false });
            }, 3000);
        }
    }
    
    return (
        <>
            <Alert visible={alert.show} color={alert.color}>{alert.mesagge}</Alert>
            {
                status.done ?
                    <div className='AgendaPublica'>
                        <div className='agenda__body'>
                            <div className='row h-100'>
                                <ColumContainer m="3" x="4">
                                    <div className='agenga__contlogo mb-5' >
                                        <img src={logo} alt="unuspat"/>
                                    </div>
                                    <div className='nameDoctor'>Dr. {usuario.nombre} {usuario.apellidoPaterno}</div>
                                    <h3 className='agenda__motivo'>Presentación</h3>
                                    <div className='agenda__ time'>
                                        <div className='agenda_icono'><i className="bi bi-clock-fill"></i></div>   
                                        <div className='agenda_text'>30 min</div>
                                    </div>    
                                    <div className='agenda__'>
                                        <div className='agenda_icono'>
                                            <i className="bi bi-camera-video-fill"></i>
                                        </div> 
                                        <div className='agenda_text'>Encuentre el momento que mejor se adapte a sus necesidades para obtener más información sobre <strong>UNUSPAT</strong>. </div>
                                    </div>    
                                </ColumContainer>
                                <ColumContainer m="9" x="8" x_class='h-100'>
                                    <div className='row'>
                                        <ColumContainer m="12" x="12">
                                            <div className='agenda_text'>Selecciona fecha y hora</div> 
                                        </ColumContainer>
                                    </div>
                                    <div className='row h-100'>
                                        <ColumContainer m="8" x="8" >
                                            <div className='agenda__calendario text-end h-100'>
                                                <Calendar
                                                    onChange={handleChange}
                                                    value={value}
                                                    minDate={new Date()}
                                                />
                                                {
                                                    hora.idHora != 0 
                                                    ? estado.cargando
                                                        ?   <Boton type="button" clases="btn_principal mt-5" disabled={true}> 
                                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                                <span className="visually-hidden">Loading...</span>
                                                            </Boton> 
                                                        :   <Boton handleClick={()=>{handleClick()}} clases="btn_principal mt-5" texto="Ingresar"> Confirmar fecha</Boton>
                                                    : <></>
                                                }
                                            </div>
                                        </ColumContainer>
                                        <ColumContainer m="4" x="4" x_class='h-100'>
                                            <div>{fecha} {hora.idHora !=0 ? `/ ${hora.StartTime} - ${hora.EndTime}` : ''}</div>
                                            <div className='agenda__Horas'>
                                                {   
                                                    horas.length != 0 ?
                                                        horas.map((item, i) =>
                                                            <div key={i} className={`horas text ${hora.idHora==item.id?'active' :''}`} onClick={(e)=>{handleClick_selectHora(item, e)}}>
                                                                {item.StartTime} - {item.EndTime}
                                                            </div>
                                                        )
                                                    :
                                                        <div className="horas text">
                                                            Sin horas
                                                        </div>
                                                }
                                            </div>
                                        </ColumContainer>
                                    </div>
                                </ColumContainer>
                            </div>
                        </div>
                    </div>
                :
                <MessageSuccess status={status.success} message={status.mensaje}>
                    <Boton type="button" clases="btn_principal" texto="Ingresar" handleClick={()=>{history.push('/');}}> Ir a UNUSPAT</Boton>
                </MessageSuccess> 
            }
        </>
    );
};

export default AgendaPublica;