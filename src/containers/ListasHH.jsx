import React, { useState, useEffect } from 'react';
import Contenedor from '../components/Contenedor';
import Mensaje from '../components/Mensaje';
import Link from '../components/Link';
import Table from '../components/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Modal from '../components/Modal';
// import Formulario from '../containers/FormHH';
import DatosUser from '../components/DatosUser';

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
    const [lista, setLista] = useState([]);
    // const [ItemDropdoun, setItemDropdoun] = useState(["Activar","Modificar", "Eliminar"]);
    const [ItemDropdoun, setItemDropdoun] = useState([
        {id:1,text:"Modificar", url:"modificar"},
        {id:2,text:"Activar", url:"activar"}, //mostrar cuando estatuusuario sea 3 y se modifica el estatusUsuario a 4
        {id:3,text:"Eliminar", url:"eliminar"}
    ]);
    const [estado, setEstado] = useState({ done: true, success: true, mensaje: '' });

    useEffect(async () => {
        await getDataList();
    },[]);

    const getDataList = () => {
        console.log('get ListHH');

        setEstado({
            done: false
        });
        Fetch.GET({ url: 'user/headhunter' })
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
            let url = window.location.hash.split('?')[1];
            let accion = url.split('/')[0];

            if(accion === 'Modificar'){
                handleClickUpdate();
            } else if(accion === 'Eliminar'){
                handleClickDelete();
            } else if(accion === 'Activar'){
                handleClickActive(item);
            } else if(accion === 'Estatus'){
                console.log('Estatus');
            }
        },500);
    }
    
    const handleClickUpdate = ()=>{
        console.log('editar');
        
    }
    
    const handleClickActive = async (item)=>{
        console.log('Activar');
        console.log(item);
        
        setEstado({
            cargando: true,
        });

        Fetch.POST({
            url: 'user/headhunter/aceptar',
            obj: {idUsuario: item.id}
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
    
    const handleClickDelete = ()=>{
        console.log('eliminar');

    }


    if (estado.done) {
        return (
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
                                        <td>{item.dateCreate}</td>
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
                                                                <Modal handleClick={(e)=> {getAction(item, e)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Eliminar">
                                                                    {`¿Está seguro de que desea eliminar el registro de ${item.nombre.toLocaleUpperCase()}?`}
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

