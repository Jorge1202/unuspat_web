import React, { useState, useEffect } from 'react';
import Contenedor from '../components/Contenedor';
import Mensaje from '../components/Mensaje';
import Link from '../components/Link';
import Table from '../components/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Modal from '../components/Modal';
import Itemlinetime from '../components/itemlinetime';
import ProsessLine from '../components/ProsessLine';
import DatosUser from '../components/DatosUser';
// import Formulario from '../containers/FormDoctor';

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

let estatusData = [
    {"id":1,"estatus":"Registro","comentario":null,"fecha":"28 de diciembre de 2021","idlineTime":1,"idDoctor":1,"activo":true}
    ,{"id":2,"estatus":"Agenda","comentario":null,"fecha":null,"idlineTime":null,"idDoctor":{"url":"estatusProspecto/1"},"activo":false}
    ,{"id":3,"estatus":"Presentación","comentario":null,"fecha":null,"idlineTime":null,"idDoctor":{"url":"estatusProspecto/1"},"activo":false}
    ,{"id":4,"estatus":"Proyección financiera","comentario":null,"fecha":null,"idlineTime":null,"idDoctor":{"url":"estatusProspecto/1"},"activo":false}
];

const ListDoctor = () => {
    const [lista, setLista] = useState([]);
    const [ItemDropdoun, setItemDropdoun] = useState(["Activar","Estatus","Modificar", "Eliminar"]);
    const [estado, setEstado] = useState({ done: true, success: true, mensaje: '' });

    const [linetime, setEstatus] = useState({ data:estatusData});

    useEffect(async () => {
        await getDataList();
    },[]);

    const getDataList = () => {
        console.log('get ListDoctor');
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
                <Contenedor title="Doctores">
                    <div className='seccionBtn'>
                        <div className="btn-group">
                            <Link link="/formDoc" clases="btn btn-secondary">Nuevo</Link>
                        </div>
                    </div>
                    <Table listThead={['Nombre', 'Cédula', 'Estatus', 'Fecha de registro', '']}>
                        {
                                lista.map(item =>
                                    <tr key={item.id}>
                                        <td>{item.nombre}</td>
                                        <td>{item.cedula}</td>
                                        <td className='tdEstatus'>
                                            {/* estatus de registro  */}
                                            <ProsessLine status={item.EstatusRegistro}/> 
                                        </td>
                                        <td>{item.dateCreate}</td>
                                         <td>
                                            <DropdownButton id="dropdown-basic-button" title="" variant="principal">
                                                {
                                                    ItemDropdoun.map(itemDown => 
                                                        itemDown == 'Activar' 
                                                        ?   item.idEstatusUsuario<=4
                                                            ? <Dropdown.Item key={itemDown}  href={`/#/doctores?${itemDown}/user=${item.id}`} disabled={item.idEstatusUsuario!=4}>
                                                                <Modal handleClick={getAction} nameBtn={itemDown}  title={itemDown} size='md' namebtnSave='Activar'>
                                                                    <div className='text-center'>Al activar se le dará aceso al sistema <strong>UNUSPAT</strong></div>
                                                                    <div className='text-center'>¿Aún deseas activar a <strong>{item.nombre}</strong>?</div>
                                                                </Modal>
                                                            </Dropdown.Item> : ''

                                                        :   <Dropdown.Item key={itemDown} href={`/#/doctores?${itemDown}/user=${item.id}`}>
                                                                <Modal handleClick={getAction} nameBtn={itemDown}  title={itemDown} size={itemDown == 'Estatus' ? 'xl': itemDown == 'Modificar' ? 'lg': 'md'} namebtnSave={itemDown == 'Eliminar' ? 'Eliminar':''}>
                                                                    {
                                                                        itemDown == 'Modificar'  ?
                                                                            <DatosUser userShow='4' Data={item}/> 
                                                                 
                                                                        :itemDown == 'Eliminar' 
                                                                        ?   `¿Está seguro de que desea eliminar el registro de ${item.nombre.toLocaleUpperCase()}?`
                                                                        :   <div id={item.id} className="contlineTime" >
                                                                                {
                                                                                    linetime.data.map((i) => {
                                                                                    return <Itemlinetime data={i}/>
                                                                                    })
                                                                                }
                                                                            </div>
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
                    <div className="text-center">
                        <Link link="/formDoc" clases="btn btn-secondary">Nuevo</Link>
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

export default ListDoctor;

/**
 *        // ?   <Formulario Data={item} title={item.nombre.toLocaleUpperCase()} namebtn='Guardar' edicion={true}/>
 */