import React, { useState, useEffect } from 'react';
import Contenedor from '../components/Contenedor';
import Mensaje from '../components/Mensaje';
import Link from '../components/Link';
import Table from '../components/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Modal from '../components/Modal';
// import Itemlinetime from '../components/itemlinetime';
import ContLineTime from '../components/contLineTime';
import ProsessLine from '../components/ProsessLine';
import DatosUser from '../components/DatosUser';
// import Formulario from '../containers/FormDoctor';

import Fetch from '../assets/js/fetch';
import '../components/styles/Dropdown.css'
import './styles/ListData.css';



const ListDoctor = () => {
    const [user, setUser] = useState('0');
    const [lista, setLista] = useState([]);
    const [ItemDropdoun, setItemDropdoun] = useState(["Activar","Estatus","Modificar", "Eliminar"]);
    const [estado, setEstado] = useState({ done: true, success: true, mensaje: '' });

    useEffect(async () => {
        await getDataList();
    },[]);

    useEffect(() => {
        setUser(localStorage.getItem('_T_U'));
    });
    
    const getDataList = () => {
        console.log('get ListDoctor');
        setEstado({
            done: false
        });

        Fetch.GET({ url: 'user/doctores' })
        .then(data=>{
            if(!data.error && data.status === 200){
                console.log(data);
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

            if(accion === 'Modificar'){
                handleClickUpdate();
            } else if(accion === 'Eliminar'){
                handleClickDelete(item);
            } else if(accion === 'Activar'){
                handleClickActive(item);
            } else if(accion === 'Estatus'){
                debugger
                handleClickStatus(item);
            }

        },500);
    }

    const handleClickUpdate = ()=>{
        console.log('editar');
        
    }

    const handleClickDelete = async (item)=>{
        console.log('eliminar');
    }
    
    const handleClickActive = (item)=>{
        console.log('Activar');
        console.log(item);
        setEstado({
            cargando: true,
        });
    
        Fetch.POST({
            url: 'user/doctores/aceptar',
            obj: {idUsuario: item.idUsuario}
        })
        .then(async data =>{
            debugger
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
        console.log(item);
        
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
                                            <ProsessLine status={item.EstatusProspecto}/> 
                                        </td>
                                        <td>{item.dateCreate}</td>
                                         <td>
                                            <DropdownButton id="dropdown-basic-button" title="" variant="principal">
                                                {
                                                    ItemDropdoun.map(itemDown => 
                                                        itemDown == 'Activar' 
                                                        ?   item.idEstatusUsuario<=3
                                                            ? <Dropdown.Item key={itemDown}  href={`/#/doctores?${itemDown}`} disabled={item.idEstatusUsuario!=3}>
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown}  title={itemDown} size='md' namebtnSave='Activar'>
                                                                    <div className='text-center'>Al activar se le dará aceso al sistema <strong>UNUSPAT</strong></div>
                                                                    <div className='text-center'>¿Aún deseas activar a <strong>{item.nombre}</strong>?</div>
                                                                </Modal>
                                                            </Dropdown.Item> : ''

                                                        :   <Dropdown.Item key={itemDown} href={`/#/doctores?${itemDown}`}>
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown}  title={itemDown} size={itemDown == 'Estatus' ? 'xl': itemDown == 'Modificar' ? 'lg': 'md'} namebtnSave={itemDown == 'Eliminar' ? 'Eliminar':''}>
                                                                    {
                                                                        itemDown == 'Modificar'  ?
                                                                        <DatosUser  id={item.idUsuario} typeUser={item.idTipoUsuario}/>
                                                                            // <DatosUser userShow='4' Data={item}/> 
                                                                 
                                                                        :itemDown == 'Eliminar' 
                                                                        ?   `¿Está seguro de que desea eliminar el registro de ${item.nombre.toLocaleUpperCase()}?`
                                                                        :   <ContLineTime item={item}/>
                                                                    } 
                                                                </Modal>
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