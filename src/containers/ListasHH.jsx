import React, { useState, useEffect } from 'react';
import Contenedor from '../components/Contenedor';
import Mensaje from '../components/Mensaje';
import Link from '../components/Link';
import Table from '../components/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Modal from '../components/Modal';
import DatosUser from '../components/DatosUser';
import Load from '../components/Load'
import Alert from '../components/Alert';

import fechas from '../assets/js/fechas';
import Fetch from '../assets/js/fetch';
import '../components/styles/Dropdown.css'
import './styles/ListData.css';

let dataCuentas = [
    {
        id:1,
        nombre: 'nombre',
        cedula: 'telefono',
        idEstatusUsuario:1,
        EstatusRegistro:1,
        dateCreate:'email@email.com',
    },
];

const ListHH = () => {

    const [sowload, setSowload] = useState(false);
    const [alert, setShowAlert] = useState({ show: false, mesagge: '', color: '' });
    const [lista, setLista] = useState([]);
    const [ItemDropdoun, setItemDropdoun] = useState([
        {id:1,text:"Informacion", url:"Informacion"},
        {id:2,text:"Activar", url:"Activar"}, //mostrar cuando estatuusuario sea 3 y se modifica el estatusUsuario a 4
        // {id:3,text:"Desactivar", url:"Desactivar"}
    ]);
    const [estado, setEstado] = useState({ done: true, success: true, mensaje: '' });

    useEffect(async () => {
        await getDataList();
    },[]);

    const getDataList = () => {
        setEstado({
            done: false
        });
        Fetch.GET({ url: 'user/headhunter' })
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
            debugger
            let url = window.location.hash.split('?')[1];
            let accion = url.split('/')[0];
            accion = accion.toLocaleLowerCase()

            if(accion === 'informacion'){
                handleClickUpdate();
            } else if(accion === 'desactivar'){
                handleClickDelete();
            } else if(accion === 'activar'){
                handleClickActive(item);
            } else if(accion === 'estatus'){
                // console.log('Estatus');
            }
        },500);
    }
    
    const handleClickUpdate = ()=>{
        console.log('editar');
        
    }
    
    const handleClickActive = async (item)=>{
        console.log('Activar');
        setEstado({
            cargando: true,
        });
        
        debugger
        Fetch.POST({
            url: 'user/headhunter/aceptar',
            obj: {idUsuario: item.id}
        })
        .then(async data =>{
            if(!data.error && data.status === 200){
                
                await getDataList();
                setShowAlert({ show: true, mesagge: data.body, color: `success` });
                setTimeout(() => {
                    setShowAlert({ show: false });
                }, 3000);
            } else {
                setEstado({
                    done: true,
                    success: true,
                    items: data.body
                });

                setShowAlert({ show: true, mesagge: data.body, color: `warning` });
                setTimeout(() => {
                    setShowAlert({ show: false });
                }, 3000);
            }
            setEstado({
                done: true,
                success: true,
                cargando: false,
            });
        }).catch((error) => {
            console.warn(error);
            setEstado({
                done: true,
            })
        }).finally(()=>{
        })
    
    }
    
    const handleClickDelete = ()=>{
        console.log('eliminar');
    }


    if (estado.done) {
        return (
            <React.Fragment>
                <Alert visible={alert.show} color={alert.color}>{alert.mesagge}</Alert>
                <Load show={sowload}/>
            {
                lista.length != 0 && estado.success ? (
                    <Contenedor title="Headhunters">
                        <div className='seccionBtn'>
                            <div className="btn-group">
                                <Link link="/formHH" clases="btn btn-secondary">Nuevo</Link>
                            </div>
                        </div>
                        <Table listThead={['Nombre', 'Correo', 'Estatus', 'Fecha de registro', '']}>
                            {
                                    lista.map(item =>
                                        <tr key={item.id}>
                                            <td>{item.nombre} {item.apellidoPaterno}</td>
                                            <td>{item.email}</td>
                                            <td>{item.tipo}</td>
                                            <td>{fechas.local(item.dateCreate, 8) }</td>
                                            {/* <td>{item.dateCreate}</td> */}
                                             <td>
                                                <DropdownButton id="dropdown-basic-button" title="" variant="principal">
                                                    {
                                                        ItemDropdoun.map(itemDown => 
                                                            <Dropdown.Item key={itemDown.id} href={`/#/headhunters?${itemDown.url}`}  disabled={item.idEstatusUsuario!=3 && itemDown.id == 2}>
                                                                {
                                                                    itemDown.id == 1 &&
                                                                    <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='lg' >
                                                                        <DatosUser  id={item.id} typeUser={item.idTipoUsuario}/> 
                                                                    </Modal>   
                                                                }
                                                                {
                                                                    itemDown.id == 2 && item.idEstatusUsuario!=4 &&
                                                                    <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Activar">
                                                                        <div className='text-center'>Al activar se le dará aceso al sistema <strong>UNUSPAT</strong></div>
                                                                        <div className='text-center'>¿Aún deseas activar a <strong>{item.nombre}</strong>?</div>
                                                                    </Modal>
                                                                }
                                                                {
                                                                    itemDown.id == 3 &&
                                                                    <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Desactivar">
                                                                        <div className='text-center'>Al desactivar al usuario ya no tendrá acceso a UNUSPAT </div>
                                                                        <div className='text-center'>¿Queres DESACTIVAR a <strong>{item.nombre}</strong>?</div>
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
                        <div className="text-center">
                            <Link link="/formHH" clases="btn btn-secondary">Nuevo</Link>
                        </div>
                    </Contenedor>
                )
            }
            </React.Fragment>
        );
    } else {
        return (
            <Contenedor>
                <Mensaje icono="arrow-clockwise" mensaje="Cargando contenidos..." />
            </Contenedor>
        );
    }
};

export default ListHH;

