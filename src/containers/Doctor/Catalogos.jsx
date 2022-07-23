import React, { useState, useEffect } from 'react';
import Contenedor from '../../components/Contenedor';
import Load from '../../components/Load'
import Alert from '../../components/Alert';
import Fetch from '../../assets/js/fetch';
import fechas from '../../assets/js/fechas';

import Input from '../../components/Input';
import Boton from '../../components/Boton';
import Link from '../../components/Link';
import Table from '../../components/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Modal from '../../components/Modal';
import Modat_V2 from '../../components/Modal_V2'

import '../styles/Catalogos.scss';

const Catalogos = () => {

    const [sowload, setSowload] = useState(false);
    const [alert, setShowAlert] = useState({ show: false, mesagge: '', color: '' });
    const [Vista, setVista] = useState(1);  //1 Puesto - 2 proveedores

    useEffect(() => {
        getUrlVista();
    });

    const getUrlVista = () => {
        let _vista = location.hash.includes('tipoproveedor')
        if(_vista){
            setVista(2)
        } else {
            setVista(1)
        }
    }

    const handleAlert = (mensaje, color)=>{
        setShowAlert({ show: true, mesagge: mensaje, color: color });
        setTimeout(() => {
            setShowAlert({ show: false });
        }, 3000);
    }

    return (
        <Contenedor title={`Catálogo ${Vista == 1 ? 'puestos' : 'tipo proveedor'}`}>
            <Alert visible={alert.show} color={alert.color}>{alert.mesagge}</Alert>
            <Load show={sowload}/>
            <div className='seccionMenu'>
                <ul className="nav nav-tabs w-100">
                    <li className="nav-item">
                        <Link handleClick={()=>{setVista(1)}} link="/catalogos-puestos" clases={`nav-link ${Vista == 1 ? 'active' : ''}`}>Puestos</Link>
                    </li>
                    <li className="nav-item">
                        <Link handleClick={()=>{setVista(2)}} link="/catalogos-tipoproveedor" clases={`nav-link ${Vista == 2 ? 'active' : ''}`}>Tipo proveedores</Link>
                    </li>
                </ul>
            </div>
            {
                Vista==1 && 
                <VistaPuesto handleload={(show)=>{setSowload(show)}} handleAlert={(mensaje, color)=>{handleAlert(mensaje, color)}}/>            
            }
            {
                Vista == 2 &&
                <VistaProveedores handleload={(show)=>{setSowload(show)}} handleAlert={(mensaje, color)=>{handleAlert(mensaje, color)}}/>
            }
        </Contenedor>
    );
};

export default Catalogos;

const VistaPuesto = ({handleload, handleAlert}) => {
    const [ItemDropdoun, setItemDropdoun] = useState([
        {id:1,text:"Editar", url:"Editar"},
        {id:2,text:"Activar", url:"Activar"}, //mostrar cuando estatuusuario sea 3 y se modifica el estatusUsuario a 4
        {id:3,text:"Desactivar", url:"desactivar"}
    ]);
    const [modalRegistro, setmodalRegistro] = useState(false);
    const [modalRegistroEdit, setmodalRegistroEdit] = useState(false);
    const [registro, setRegistro] = useState({puesto:''});
    const [listPuestos, setlistPuestos] = useState([]);

    useEffect(() => {
        getLista();
    },[]); 

    //#region handleChange
    const handleChangePerson = e => {
        const { name, value } = e.target;
        setRegistro({ ...registro, [name]: value });
    };
    //#endregion

    //#region Accion Dropdown
    const getAction = (accion, item = {}) => {
        accion = accion.toLocaleLowerCase()
       if(accion === 'desactivar'){
            item.status = 0
            handleEditarStatus(item);
        } else if(accion === 'activar'){
            item.status = 1
            handleEditarStatus(item);
        } 
    }
    //#endregion

    //#region Get lista
    const getLista = async () => {
        // handleload(true)
        await Fetch.GET({
            url: `puesto`
            })
            .then(data=>{
                if(!data.error && data.status === 200){
                    setlistPuestos(data.body)
                } else {
                    handleAlert(data.body, `info`)
                }
            }).catch((e) => {
                console.log(e);
            }).finally(()=>{
            // setSowload(false)
            // handleload(false)
            })
    }
    //#endregion

    //#region Guardar nuevo
    const handleShowModalNuevo = () => {
        setRegistro({puesto:'', descripcion:''});
        setmodalRegistro(true)
        
    }
    const handleCloseModalNuevo = () => {
        setmodalRegistro(false)
    }

    const handleClickModalSave = async () => {
        handleload(true)
        await Fetch.POST({
            url: `user/doctores/puestos`,
            obj: registro
            })
            .then(data=>{
                if(!data.error && data.status === 200){
                    getLista()
                    handleAlert(data.body, `success`)
                    handleCloseModalNuevo()
                } else {
                    handleAlert(data.body, `info`)
                }
            }).catch((e) => {
                let valores = {
                    done: true,
                    form: false,
                    success: false,
                    mensaje: 'Error 500',
                };
                setEstado(valores);
            }).finally(()=>{
            // setSowload(false)
            handleload(false)
            })
    }
    //#endregion

    //#region Editar Registro
    const handleClickEdit = (item) =>{
        setRegistro(item)
        setmodalRegistroEdit(true)
    }
    const handleCloseModalEdit = () => {
        setmodalRegistroEdit(false)
    }

    const handleEditarRegistro = async () => {
        handleload(true)
        await Fetch.PUT({
            url: `puesto`,
            obj: registro
            })
            .then((data)=>{
                if(!data.error && data.status === 200){
                    getLista()
                    handleAlert(data.body, `success`)
                    handleCloseModalEdit()
                } else {
                    handleAlert(data.body, `info`)
                }
            }).catch((e) => {

            }).finally(()=>{
            // setSowload(false)
            handleload(false)
            })
    }

    const handleEditarStatus = async (item) => {
        handleload(true)
        await Fetch.PUT({
            url: `puesto`,
            obj: item
            })
            .then((data)=>{
                if(!data.error && data.status === 200){
                    getLista()
                    handleAlert(data.body, `success`)
                } else {
                    handleAlert(data.body, `info`)
                }
            }).catch((e) => {

            }).finally(()=>{
            // setSowload(false)
            handleload(false)
            })
    }
    //#endregion
    
    return (
        <>
        <div className='seccionBtn'>
            <div className="btn-group">
                <Boton handleClick={handleShowModalNuevo} clases="btn-secondary">Nuevo</Boton>
                <Modat_V2 form={true} title='Agregar puesto' show={modalRegistro} size="md" handleClick={handleClickModalSave} handleClose={handleCloseModalNuevo} btnNameAccion="Guardar">
                    <Input valor={registro.puesto} name='puesto' handleChange={handleChangePerson} label='Puesto' required={true} />
                    <Input textarea={true} valor={registro.descripcion} name='descripcion' handleChange={handleChangePerson} label='Descripcion' />
                </Modat_V2>
            </div>
        </div>

        <Table listThead={[ 'Puesto', 'Status', 'Fecha creacion', '']} clases="catalogo">
            {
                listPuestos.map(item=>
                    <tr key={item.id}>
                        {
                            item.puestoBase == 1 ? 
                            <td>{item.puesto}</td>
                            :
                            <td onClick={()=>{handleClickEdit(item)}} className="link">{item.puesto}</td>
                        } 
                        <td>{item.status == 1 ? 'Activo': 'Inactivo'}</td>
                        <td>{fechas.local(item.dateCreate, 8) }</td>
                        <td>
                            {
                                item.puestoBase == 1 ? 
                                <>Puesto base</>
                                :
                                <DropdownButton id="dropdown-basic-button" title="" variant="principal">
                                    {
                                        ItemDropdoun.map(itemDown => 
                                            <Dropdown.Item key={itemDown.id} >
                                                {
                                                    itemDown.id == 1 &&
                                                    <div  onClick={()=>{handleClickEdit(item)}} >{itemDown.text}</div>
                                                }
                                                {
                                                    itemDown.id == 2 && item.status == 0 &&
                                                    <Modal handleClick={()=> {getAction(itemDown.text, item)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Activar">    
                                                        <div className='text-center'>¿Quieres activar el tipo de puesto?</div>
                                                    </Modal>
                                                }
                                                {
                                                    itemDown.id == 3 && item.status == 1 &&
                                                    <Modal handleClick={()=> {getAction(itemDown.text, item)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Desactivar">
                                                        {`¿Está seguro de que desea desactivar el registro?`}
                                                    </Modal>
                                                }      
                                            </Dropdown.Item>
                                        )
                                    }
                                </DropdownButton>
                            }
                        </td>
                    </tr> 
                )
            }
        </Table>

        <Modat_V2 form={true} title='Editar puesto' show={modalRegistroEdit} size="md" handleClick={handleEditarRegistro} handleClose={handleCloseModalEdit} btnNameAccion="Guardar">
            <Input valor={registro.puesto} name='puesto' handleChange={handleChangePerson} label='Puesto' required={true} />
            <Input textarea={true} valor={registro.descripcion} name='descripcion' handleChange={handleChangePerson} label='Descripcion' />
            <div className='row'>
                <div className="col-lg-6 col-md-6 label ">Modificado por</div>
                <div className="col-lg-6 col-md-6">{registro.userUpdateName} {registro.userUpdateApellido}</div>
            </div>
            <div className='row'>
                <div className="col-lg-6 col-md-6 label ">Fecha de modificación</div>
                <div className="col-lg-6 col-md-6">{!registro.dateUpdate ? '----': fechas.local(registro.dateUpdate, 8)}</div>
            </div>
        </Modat_V2>
    </> 
    );
}

const VistaProveedores = ({handleload, handleAlert}) => {
    const [ItemDropdoun, setItemDropdoun] = useState([
        {id:1,text:"Editar", url:"Editar"},
        {id:2,text:"Activar", url:"Activar"}, //mostrar cuando estatuusuario sea 3 y se modifica el estatusUsuario a 4
        {id:3,text:"Desactivar", url:"desactivar"}
    ]);
    const [modalRegistro, setmodalRegistro] = useState(false);
    const [modalRegistroEdit, setmodalRegistroEdit] = useState(false);
    const [registro, setRegistro] = useState({});
    const [listProveedores, setlistProveedores] = useState([]);

    useEffect(() => {
        getLista();
    },[]); 

    //#region handleChange
    const handleChangePerson = e => {
        const { name, value } = e.target;
        setRegistro({ ...registro, [name]: value });
    };
    //#endregion

    //#region Accion Dropdown
    const getAction = (accion, item = {}) => {
        accion = accion.toLocaleLowerCase()
       if(accion === 'desactivar'){
            item.status = 0
            handleEditarStatus(item);
        } else if(accion === 'activar'){
            item.status = 1
            handleEditarStatus(item);
        } 
    }
    //#endregion

    //#region Get lista
    const getLista = async () => {
        // handleload(true)
        await Fetch.GET({
            url: `tipoProveedor`
            })
            .then(data=>{
                if(!data.error && data.status === 200){
                    setlistProveedores(data.body)
                } else {
                    handleAlert(data.body, `info`)
                }
            }).catch((e) => {
               console.log(e);
            }).finally(()=>{
            // setSowload(false)
            // handleload(false)
            })
    }
    //#endregion

    //#region Guardar nuevo
    const handleShowModalNuevo = () => {
        setRegistro({tipo:'', descripcion:''});
        setmodalRegistro(true)
        
    }
    const handleCloseModalNuevo = () => {
        setmodalRegistro(false)
    }

    const handleClickModalSave = async () => {
        handleload(true)
        await Fetch.POST({
            url: `user/doctores/tipoProveedor`,
            obj: registro
            })
            .then(data=>{
                if(!data.error && data.status === 200){
                    getLista()
                    handleAlert(data.body, `success`)
                    handleCloseModalNuevo()
                } else {
                    handleAlert(data.body, `info`)
                }
            }).catch((e) => {
                let valores = {
                    done: true,
                    form: false,
                    success: false,
                    mensaje: 'Error 500',
                };
                setEstado(valores);
            }).finally(()=>{
            // setSowload(false)
            handleload(false)
            })
    }
    //#endregion

    //#region Editar Registro
    const handleClickEdit = (item) =>{
        setRegistro(item)
        setmodalRegistroEdit(true)
    }
    const handleCloseModalEdit = () => {
        setmodalRegistroEdit(false)
    }

    const handleEditarRegistro = async () => {
        handleload(true)
        await Fetch.PUT({
            url: `tipoProveedor`,
            obj: registro
            })
            .then((data)=>{
                if(!data.error && data.status === 200){
                    getLista()
                    handleAlert(data.body, `success`)
                    handleCloseModalEdit()
                } else {
                    handleAlert(data.body, `info`)
                }
            }).catch((e) => {

            }).finally(()=>{
            // setSowload(false)
            handleload(false)
            })
    }

    const handleEditarStatus = async (item) => {
        handleload(true)
        await Fetch.PUT({
            url: `tipoProveedor`,
            obj: item
            })
            .then((data)=>{
                if(!data.error && data.status === 200){
                    getLista()
                    handleAlert(data.body, `success`)
                } else {
                    handleAlert(data.body, `info`)
                }
            }).catch((e) => {

            }).finally(()=>{
            // setSowload(false)
            handleload(false)
            })
    }
    //#endregion
    
    return (
        <>
        <div className='seccionBtn'>
            <div className="btn-group">
                <Boton handleClick={handleShowModalNuevo} clases="btn-secondary">Nuevo</Boton>
                <Modat_V2 form={true} title='Agregar puesto' show={modalRegistro} size="md" handleClick={handleClickModalSave} handleClose={handleCloseModalNuevo} btnNameAccion="Guardar">
                    <Input valor={registro.tipo} name='tipo' handleChange={handleChangePerson} label='Tipo proveedor' required={true} />
                    <Input textarea={true} valor={registro.descripcion} name='descripcion' handleChange={handleChangePerson} label='Descripcion' />
                </Modat_V2>
            </div>
        </div>

        <Table listThead={[ 'Tipo', 'Status', 'Fecha creacion', '']} clases="catalogo">
            {
                listProveedores.map(item=>
                    <tr key={item.id}>
                        {
                            item.tipoBase == 1 ? 
                            <td>{item.tipo}</td>
                            :
                            <td onClick={()=>{handleClickEdit(item)}} className="link">{item.tipo}</td>
                        }
                        <td>{item.status == 1 ? 'Activo': 'Inactivo'}</td>
                        <td>{fechas.local(item.dateCreate, 8) }</td>
                        <td>
                            {
                                item.tipoBase == 1 ? 
                                <>Tipo proveedor base</>
                                :
                                <DropdownButton id="dropdown-basic-button" title="" variant="principal">
                                    {
                                        ItemDropdoun.map(itemDown => 
                                            <Dropdown.Item key={itemDown.id} >
                                                {
                                                    itemDown.id == 1 &&
                                                    <div  onClick={()=>{handleClickEdit(item)}} >{itemDown.text}</div>
                                                }
                                                {
                                                    itemDown.id == 2 && item.status == 0 &&
                                                    <Modal handleClick={()=> {getAction(itemDown.text, item)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Activar">    
                                                        <div className='text-center'>¿Quieres activar el tipo de puesto?</div>
                                                    </Modal>
                                                }
                                                {
                                                    itemDown.id == 3 && item.status == 1 &&
                                                    <Modal handleClick={()=> {getAction(itemDown.text, item)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Desactivar">
                                                        {`¿Está seguro de que desea desactivar el registro?`}
                                                    </Modal>
                                                }      
                                            </Dropdown.Item>
                                        )
                                    }
                                </DropdownButton>
                            }
                        </td>
                    </tr> 
                )
            }
        </Table>

        <Modat_V2 form={true} title='Editar puesto' show={modalRegistroEdit} size="md" handleClick={handleEditarRegistro} handleClose={handleCloseModalEdit} btnNameAccion="Guardar">
            <Input valor={registro.tipo} name='tipo' handleChange={handleChangePerson} label='Tipo proveedor' required={true} />
            <Input textarea={true} valor={registro.descripcion} name='descripcion' handleChange={handleChangePerson} label='Descripcion' />
            <div className='row'>
                <div className="col-lg-6 col-md-6 label ">Modificado por</div>
                <div className="col-lg-6 col-md-6">{registro.userUpdateName} {registro.userUpdateApellido}</div>
            </div>
            <div className='row'>
                <div className="col-lg-6 col-md-6 label ">Fecha de modificación</div>
                <div className="col-lg-6 col-md-6">{!registro.dateUpdate ? '----': fechas.local(registro.dateUpdate, 8)}</div>
            </div>
        </Modat_V2>
    </> 
    );
}

