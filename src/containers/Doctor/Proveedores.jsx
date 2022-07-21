import React, { useState, useEffect } from 'react';
import Contenedor from '../../components/Contenedor';
import Link from '../../components/Link';
import Table from '../../components/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Modal from '../../components/Modal';

import '../styles/ListData.css';

const Proveedores = () => {
    const [ItemDropdoun, setItemDropdoun] = useState([
        {id:1,text:"Informacion", url:"Informacion"},
        {id:2,text:"Activar", url:"Activar"}, //mostrar cuando estatuusuario sea 3 y se modifica el estatusUsuario a 4
        {id:3,text:"Desactivar", url:"desactivar"}
    ]);

    const getAction = (accion) => {
        setTimeout(() => {
            accion = accion.toLocaleLowerCase()

            if(accion === 'modificar'){
                handleClickUpdate();
            } else if(accion === 'desactivar'){
                handleClickDelete();
            } else if(accion === 'activar'){
                handleClickActive();
            } else if(accion === 'estatus'){
                // console.log('Estatus');
            }
        },500);
    }

    return (
        <Contenedor title='Proveedores'>
            <div className='seccionBtn'>
                <div className="btn-group">
                    <Link link="/formAdmin" clases="btn btn-secondary">Nuevo</Link>
                </div>
            </div>
            <Table listThead={['Nombre', 'Correo', 'Tipo proveedor', 'Fecha de registro', '']}>
                <tr >
                    <td>nombre completo</td>
                    <td>correo</td>
                    <td>tipo usuario</td>
                    <td>fecha</td>
                    <td>
                        <DropdownButton id="dropdown-basic-button" title="" variant="principal">
                            {
                                ItemDropdoun.map(itemDown => 
                                    <Dropdown.Item key={itemDown.id} >
                                        {
                                            itemDown.id == 1 &&
                                            <Modal handleClick={()=> {getAction(itemDown.text)}} nameBtn={itemDown.text}  title={itemDown.text} size='lg' >
                                                datos
                                            </Modal>   
                                        }
                                        {
                                            itemDown.id == 2 &&
                                            <Modal handleClick={()=> {getAction(itemDown.text)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Activar">
                                                <div className='text-center'>Al activar se le dará aceso al sistema <strong>UNUSPAT</strong></div>
                                                <div className='text-center'>¿Aún deseas activar a <strong>nombre</strong>?</div>
                                            </Modal>
                                        }
                                        {
                                            itemDown.id == 3 &&
                                            <Modal handleClick={()=> {getAction(itemDown.text)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Des">
                                                {/* {`¿Está seguro de que desea eliminar el registro de ${item.nombre.toLocaleUpperCase()}?`} */}
                                                {`¿Está seguro de que desea eliminar el registro de nombre?`}
                                            </Modal>
                                        }      
                                    </Dropdown.Item>
                                )
                            }
                        </DropdownButton>
                    </td>
                </tr>    
            </Table>
        </Contenedor>
    );
};

export default Proveedores;