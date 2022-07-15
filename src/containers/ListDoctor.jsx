import React, { useState, useEffect } from 'react';
import Contenedor from '../components/Contenedor';
import Mensaje from '../components/Mensaje';
import Link from '../components/Link';
import Table from '../components/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Modal from '../components/Modal';
import ContLineTime from '../components/contLineTime';
import ProsessLine from '../components/ProsessLine';
import DatosUser from '../components/DatosUser';
import ViewFormulario from './ViewFormulario';
import fechas from '../assets/js/fechas';

import Fetch from '../assets/js/fetch';
import '../components/styles/Dropdown.css'
import './styles/ListData.css';

const ListDoctor = () => {
    const [user, setUser] = useState('0');
    const [lista, setLista] = useState([]);
    // const [ItemDropdoun, setItemDropdoun] = useState(["Activar","Estatus","Modificar", "Eliminar"]);
    const [ItemDropdoun, setItemDropdoun] = useState([
        {id:2,text:"Informacion", url:"Informacion"},
        {id:1,text:"Estatus", url:"Estatus"},
        {id:7,text:"Datos medico", url:"Formato"},
        {id:3,text:"Activar", url:"Activar"}, //mostrar al estatusRegistro sea 4 y se modifica el estatusUsuario a 3
        {id:6,text:"Desactivar", url:"Desactivar"},
        {id:4,text:"Enviar contrato", url:"presentacion"}, //mostrar al estar en estatusRegistro 2 se pasa a estatusRegistro 3 y se envia formulario 
        {id:5,text:"Proyeccion Financiera", url:"proyeccion-financiera"}, //mostrar al estar en estatusRegistro 2 se pasa a estatusRegistro 3 y se envia formulario 
    ]);
    const [estado, setEstado] = useState({ done: true, success: true, mensaje: '' });

    useEffect(async () => {
        await getDataList();
        // await getPruebaCorreo();
    },[]);

    useEffect(() => {
        setUser(localStorage.getItem('_T_U'));
    });
    
    const getPruebaCorreo = () => {
        Fetch.GET({ url: 'user/doctores/pruebaCorreo' })
        .then(data=>{
            if(!data.error && data.status === 200){

            } 
        }).catch((e) => {
          
        })
    }

    const getDataList = async () => {
        setEstado({
            done: false
        });

        await Fetch.GET({ url: 'user/doctores' })
        .then(data=>{
            if(!data.error && data.status === 200){
                setLista(data.body);
                setEstado({
                    done: true,
                    success: true,
                });

            } else {
                setEstado({
                    done: true,
                    success: true,
                    items: data.body
                });
            }
        }).catch((e) => {
            setEstado({
                done: true,
            })
        })
    }

    const getAction = (item, e) => {
        setTimeout(() => {
            let url = window.location.hash.split('?')[1];
            let accion = url.split('/')[0];

            if(accion === 'Informacion'){
                handleClickUpdate();
            } else if(accion === 'Desactivar'){
                handleClickDelete(item);
            } else if(accion === 'Activar'){
                handleClickActive(item);
            } else if(accion === 'Estatus'){
                handleClickStatus(item);
            } else if(accion === 'presentacion'){
                handleClickProceso_presentacion(item);
            } else if(accion === 'proyeccion-financiera'){
                handleClickProceso_pFinanciera(item);
            } else if(accion === 'Formato'){
                handleClickFormato(item);
            }

        },500);
    }

    const handleClickUpdate = ()=>{
        console.log('editar');
    }

    const handleClickDelete = async (item)=>{
        console.log('eliminar');
    }
    
    const handleClickActive = async (item)=>{
        console.log('Activar');
        setEstado({
            cargando: true,
        });
    
        await Fetch.POST({
            url: 'user/doctores/aceptar',
            obj: {idUsuario: item.idUsuario}
        })
        .then(async data =>{
            if(!data.error && data.status === 200){
                
                await getDataList();
            } else {
                setEstado({
                    done: true,
                    success: true,
                    items: data.body
                });
            }
            setEstado({
                done: true,
                success: true,
                cargando: false,
            });
        }).catch((e) => {
            setEstado({
                done: true,
            })
        })
        
    }
    
    const handleClickStatus = (item)=>{
        console.log('Estatus');
    }

    const handleClickFormato = (item)=>{
        console.log('Formato');
    }

    const handleClickProceso_presentacion = async (item)=>{

        setEstado({
            done: false
        });
        await Fetch.PUT({ url: 'user/doctores/presentacion', obj: item })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setEstado({
                    done: true,
                    success: true,
                });
                await getDataList();

            } else {
                setEstado({
                    done: true,
                    success: true,
                    items: data.body
                });
            }
        }).catch((error) => {
            console.warn(error);
            setEstado({
                done: true,
            })
        });
        
    }

    const handleClickProceso_pFinanciera = async (item)=>{
        console.log(item);
        console.log('handleClickProceso_pFinanciera');
        
        setEstado({
            done: false
        });
        await Fetch.PUT({ url: 'user/doctores/presentacionFinanciera', obj: item })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setEstado({
                    done: true,
                    success: true,
                });
                await getDataList();

            } else {
                setEstado({
                    done: true,
                    success: true,
                    items: data.body
                });
            }
        }).catch((error) => {
            console.warn(error);
            setEstado({
                done: true,
            })
        });
    }

    if (estado.done) {
        return (
            lista.length != 0 && estado.success ? (
                <Contenedor title="Doctores">
                    <div className='seccionBtn'>
                        {
                            user == 3 &&
                                <div className="btn-group">
                                    <Link link="/formDoc" clases="btn btn-secondary">Nuevo</Link>
                                </div>
                        } 
                    </div>
                    <Table listThead={['Nombre', 'Cédula', 'Estatus', 'Fecha de registro', '']}>
                        {
                                lista.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.nombre}</td>
                                        <td>{item.cedula}</td>
                                        <td className='tdEstatus'>
                                            {/* estatus de registro  */}
                                            <ProsessLine status={item.idEstatusRegistro}/> 
                                        </td>
                                        <td>{fechas.local(item.dateCreate, 8) }</td>
                                         <td>
                                         <DropdownButton id="dropdown-basic-button" title="" variant="principal">
                                                {
                                                    ItemDropdoun.map(itemDown => 
                                                        <Dropdown.Item key={itemDown.id} href={`/#/doctores?${itemDown.url}`}  disabled={item.idEstatusRegistro!=4 && itemDown.id == 3}>
                                                            {   itemDown.id == 1 &&
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='xl' >                                                                                
                                                                    <ContLineTime item={item}/>
                                                                </Modal>
                                                            }
                                                            {
                                                                itemDown.id == 2 &&
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='lg' >
                                                                    <DatosUser  id={item.idUsuario} typeUser={item.idTipoUsuario}/>
                                                                </Modal>   
                                                            }
                                                            {
                                                                itemDown.id == 6 &&
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Desactivar">
                                                                    <div className='text-center'>Al desactivar al usuario ya no tendrá acceso a UNUSPAT </div>
                                                                    <div className='text-center'>¿Queres DESACTIVAR a <strong>{item.nombre}</strong>?</div>
                                                                </Modal>
                                                            } 
                                                            {
                                                                itemDown.id == 3 && item.idEstatusUsuario !=4 && item.idEstatusRegistro==4 &&
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Activar">
                                                                    <div className='text-center'>Al activar se le dará aceso al sistema <strong>UNUSPAT</strong></div>
                                                                    <div className='text-center'>¿Aún deseas activar a <strong>{item.nombre}</strong>?</div>
                                                                </Modal>
                                                            }
                                                            {
                                                                itemDown.id == 4 && item.idEstatusRegistro==2 &&
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Aceptar">
                                                                    <div className='text-center'>¿Le has impartido la  <strong>PRESENTACIÓN</strong> al prospecto?</div>
                                                                    <div className='text-center'>Al aceptar se le hará llegar el CONTRATO por correo.</div>
                                                                    <div className='text-center'><strong>¿Quíeres seguir con el proceso?</strong></div>
                                                                </Modal>
                                                            }
                                                            {
                                                                itemDown.id == 5 && item.idEstatusRegistro==3 && item.statusFormulario==1 &&
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Sí">
                                                                    <div className='text-center'>Has presentado la <strong>PROYECCIÓN FINANCIERA</strong> al prospecto</div>
                                                                    <div className='text-center'>¿Quíeres pasar al siguiente proceso?</div>
                                                                </Modal>
                                                            }
                                                            {
                                                                itemDown.id == 7 && item.statusFormulario==1 &&
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='lg' >
                                                                    <ViewFormulario idUser={item.idUsuario}/>
                                                                </Modal>   
                                                            }   
                                                        </Dropdown.Item>
                                                    )
                                                }
                                            </DropdownButton>
                                        </td>
                                    </tr>
                                )
                            }
                    </Table>

                    
                </Contenedor>
            ) : (
                <Contenedor>
                    <Mensaje icono="emoji-frown" mensaje="No se encontraron registros..." />
                    {
                        user == 3 &&
                            <div className="text-center">
                                <Link link="/formDoc" clases="btn btn-secondary">Nuevo</Link>
                            </div>
                    }
                </Contenedor>
            )
        );
    } else {
        return (
            <Contenedor>
                <Mensaje icono="arrow-clockwise" mensaje="Cargando contenidos..." />
            </Contenedor>
        );
    }
};

export default ListDoctor;



/**
 *        // ?   <Formulario Data={item} title={item.nombre.toLocaleUpperCase()} namebtn='Guardar' edicion={true}/>
 */