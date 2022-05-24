import React, { useState, useEffect } from 'react';
import Contenedor from '../components/Contenedor';
import Mensaje from '../components/Mensaje';
import Link from '../components/Link';
import Table from '../components/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Modal from '../components/Modal';
import DatosUser from '../components/DatosUser';
// import Formulario from '../containers/FormAdmin';

import fechas from '../assets/js/fechas';
import Fetch from '../assets/js/fetch';
import '../components/styles/Dropdown.css'
import './styles/ListData.css';

let dataCuentas = [
    {
        id:1,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:2,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:4,
        dateCreate:'email@email.com',
        idEstatusUsuario: 2,
    },
    {
        id:3,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:5,
        dateCreate:'email@email.com',
        idEstatusUsuario: 3,
    },
    {
        id:4,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 4,
    },
    {
        id:5,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 5,
    },
    {
        id:6,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:7,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:8,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:9,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:10,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:11,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:12,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:13,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:14,
        nombre: 'nombre',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
    {
        id:15,
        nombre: 'nombre 12',
        cedula: 'telefono',
        Estado:1,
        dateCreate:'email@email.com',
        idEstatusUsuario: 1,
    },
];

const ListAdmin = () => {
    const [lista, setLista] = useState([]);
    // const [ItemDropdoun, setItemDropdoun] = useState(["Modificar", "Eliminar"]);
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
        console.log('get ListAdmin');

        setEstado({
            done: false
        });

        Fetch.GET({ url: 'user/admin' })
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

    const getAction = () => {
        setTimeout(() => {
            let url = window.location.hash.split('?')[1];
            let accion = url.split('/')[0];

            if(accion === 'Modificar'){
                handleClickUpdate();
            } else if(accion === 'Eliminar'){
                handleClickDelete();
            } else if(accion === 'Activar'){
                handleClickActive();
            } else if(accion === 'Estatus'){
                console.log('Estatus');
            }
        },500);
    }
    
    const handleClickUpdate = ()=>{
        console.log('editar');
        
    }
    
    const handleClickActive = ()=>{
        console.log('Activar');
        
    }
    
    const handleClickDelete = ()=>{
        console.log('eliminar');

    }


    if (estado.done) {
        return (
            lista.length != 0 && estado.success ? (
                <Contenedor title="Administradores">
                    <div className='seccionBtn'>
                        <div className="btn-group">
                            <Link link="/formAdmin" clases="btn btn-secondary">Nuevo</Link>
                        </div>
                    </div>
                    <Table listThead={['Nombre', 'Correo', 'Tipo de usuario', 'Fecha de registro', '']}>
                        {
                            lista.map(item =>
                                <tr key={item.id}>
                                    <td>{item.nombre} {item.apellidoPaterno}</td>
                                    <td>{item.email}</td>
                                    <td>{item.idTipoUsuario == 1 ? 'Admin principal' : 'Administrador'}</td>
                                    <td>{fechas.local(item.dateCreate, 8) }</td>
                                    <td>
                                        <DropdownButton id="dropdown-basic-button" title="" variant="principal">
                                            {
                                                ItemDropdoun.map(itemDown => 
                                                    <Dropdown.Item key={itemDown.id} href={`/#/administradores?${itemDown.url}`}  disabled={item.idEstatusUsuario!=3 && itemDown.id == 2}>
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
                        <Link link="/formadmin" clases="btn btn-secondary">Nuevo</Link>
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

export default ListAdmin;