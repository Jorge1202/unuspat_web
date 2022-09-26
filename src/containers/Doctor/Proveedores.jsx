import React, { useState, useEffect } from 'react';
import Contenedor from '../../components/Contenedor';
import Load from '../../components/Load'
import Alert from '../../components/Alert';
import Fetch from '../../assets/js/fetch';
import fechas from '../../assets/js/fechas';

import Link from '../../components/Link';
import Table from '../../components/Table';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import Modal from '../../components/Modal';
import Modat_V2 from '../../components/Modal_V2'
import ColumContainer from '../../components/ColumContainer'
import Input from '../../components/Input';
import Boton from '../../components/Boton';

import '../styles/ListData.css';

const Proveedores = () => {
    const [ItemDropdoun, setItemDropdoun] = useState([
        {id:1,text:"Editar", url:"Editar"},
        // {id:2,text:"Activar", url:"activarLogin"}, //mostrar cuando estatuusuario sea 3 y se modifica el estatusUsuario a 4
        {id:3,text:"Desactivar", url:"desactivar"},
        {id:4,text:"Activar", url:"Activar"}, 
        {id:5,text:"Eliminar", url:"Eliminar"},
    ]);
    const [showload, setShowload] = useState(false);
    const [alert, setShowAlert] = useState({ show: false, mesagge: '', color: '' });
    const [modalRegistro, setmodalRegistro] = useState(false);
    const [modalRegistroEdit, setmodalRegistroEdit] = useState(false);
    const [registro, setRegistro] = useState({puesto:''});
    const [listaProveedores, setlistaProveedores] = useState([]);

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
        if(accion === 'activarlogin'){
            handleActivarLogin(item);
        } else if(accion === 'desactivar'){
            handleDesactivar(item);
        } else if(accion === 'activar'){
            handleActivar(item);
        } else if(accion === 'eliminar'){
            handleEliminar(item);
        } 
    }
    //#endregion

    //#region Get lista
    const getLista = async () => {
        // handleload(true)
        await Fetch.GET({
            url: `user/proveedor`
            })
            .then(data=>{
                if(!data.error && data.status === 200){
                    setlistaProveedores(data.body)
                } else {
                    handleAlert(data.body, `info`)
                }
            }).catch((e) => {
                console.log(e);
            }).finally(()=>{
            // setShowload(false)
            // handleload(false)
            })
    }
    //#endregion

    //#region Validacion y guardar
    const handleClickEdit = (item) =>{
        setRegistro(item)
        setmodalRegistroEdit(true)
    }
    const handleCloseModalEdit = () => {
        setmodalRegistroEdit(false)
    }
    //#endregion

    //#region Eliminar, Activar y Desactivar
    const handleDesactivar = async (item) =>{
        //cambiamos el status de auth y modificamos el idEstatusUsuario
        setShowload(true)
        await Fetch.PUT({
            url: `user/proveedor/desactivar?id=${item.id}`,
            obj: {idUsuario: item.idUsuario}
        })
        .then(async data=>{
            if(!data.error && data.status === 200){
                await getLista()
                handleAlert(data.body, 'success')
            } else {
                handleAlert(data.body, 'warning')
            }
        }).catch((error) => {
            console.warn(error);
        }).finally(() =>{
            setShowload(false)
        })
    }
    const handleActivar = async (item) =>{
        //cambiamos el status de auth y modificamos el idEstatusUsuario
        setShowload(true)
        await Fetch.PUT({
            url: `user/proveedor/activar?id=${item.id}`,
            obj: {idUsuario: item.idUsuario}
        })
        .then(async data=>{
            if(!data.error && data.status === 200){
                await getLista()
                handleAlert(data.body, 'success')
            } else {
                handleAlert(data.body, 'warning')
            }
        }).catch((error) => {
            console.warn(error);
        }).finally(() =>{
            setShowload(false)
        })
    }
    const handleEliminar = async (item) =>{
        //elimina el registro
        setShowload(true)
        await Fetch.DELETE({
            url: `user/proveedor?id=${item.id}`,
            obj: {idUsuario: item.idUsuario}
        })
        .then(async data=>{
            if(!data.error && data.status === 200){
                await getLista()
                handleAlert(data.body, 'success')
            } else {
                handleAlert(data.body, 'warning')
            }
        }).catch((error) => {
            console.warn(error);
        }).finally(() =>{
            setShowload(false)
        })
    }
    //#endregion

    //#region funciones de formulario
    const handleAlert= (mensaje, color) =>{
        setShowAlert({ show: true, mesagge:mensaje, color: color });
        setTimeout(() => {
            setShowAlert({ show: false });
        }, 3000);
    }
    const closeModal= () =>{
        handleCloseModalEdit()
        getLista()
    }

    //#endregion
    
    return (
        <Contenedor title='Proveedores'>
            <Alert visible={alert.show} color={alert.color}>{alert.mesagge}</Alert>
            <Load show={showload}/>
            <div className='seccionBtn'>
                <div className="btn-group">
                    <Link link="/proveedores-registro" clases="btn btn-secondary">Nuevo</Link>
                    {/* <Boton handleClick={handleShowModalNuevo} clases="btn-secondary">Nuevo</Boton> */}
                </div>
            </div>

            <Table listThead={[ 'Nombre', 'Razón social', 'Tipo proveedor', 'Contacto', 'Estatus', 'Fecha creacion', '']}>
                {
                    listaProveedores.map(item=>
                        <tr key={item.id}>
                            {
                                <td onClick={()=>{handleClickEdit(item)}} className="link">{item.nombre_empresa}</td>
                            }
                            <td>{item.razon_social}</td>
                            <td>{item.tipo}</td>
                            <td>{item.nombre} {item.apellidoPaterno}</td>
                            <td>{item.status == 1 ? 'Activo' : 'Inactivo'}</td>
                            <td>{fechas.local(item.dateCreate, 8) }</td>
                            <td>
                                <DropdownButton id="dropdown-basic-button" title="" variant="principal">
                                    {
                                        //idEstatusUsuario
                                        ItemDropdoun.map(itemDown => 
                                            <Dropdown.Item key={itemDown.id} >  
                                                <>
                                                    {
                                                        itemDown.id == 1 &&
                                                        <div  onClick={()=>{handleClickEdit(item)}} >{itemDown.text} </div> 
                                                    }
                                                    {
                                                        itemDown.id == 3 && item.status == 1 &&
                                                        <Modal handleClick={()=> {getAction(itemDown.url, item)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Desactivar">
                                                            <div className='text-center'>¿Quieres desactivar al proveedor <strong>{item.nombre} {item.apellidoPaterno}</strong>?</div>
                                                        </Modal>
                                                    }      
                                                    {
                                                        itemDown.id == 4 && item.status == 0 &&
                                                        <Modal handleClick={()=> {getAction(itemDown.url, item)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Activar">                                             
                                                            <div className='text-center'>¿Quieres activar al proveedor <strong>{item.nombre} {item.apellidoPaterno}</strong>?</div>
                                                        </Modal>
                                                    }   
                                                    {
                                                        itemDown.id == 5 && 
                                                        <Modal handleClick={()=> {getAction(itemDown.url, item)}} nameBtn={itemDown.text}  title={itemDown.text} size='md' namebtnSave="Eliminar">                                               
                                                            <div className='text-center'>¿Estás seguro de eliminar al proveedor <strong>{item.nombre} {item.apellidoPaterno}</strong>?</div>
                                                        </Modal>
                                                    }       
                                                            
                                                </>
                                            </Dropdown.Item>
                                        )
                                    }
                                </DropdownButton>
                            </td>
                        </tr> 
                    )
                }
            </Table>

            <Modat_V2 title='Editar' show={modalRegistroEdit} size="lg" handleClose={handleCloseModalEdit} showFooter={false} >
                
                <FormDataPersonal idProveedor={registro.id} handleAlert={(message, color)=>{handleAlert(message, color)}} showLoad={(load)=>{setShowload(load)}} closeModal={()=>{closeModal()}}/>

                <div className='row'>
                    <div className="col-lg-6 col-md-6 label ">Modificado por</div>
                    <div className="col-lg-6 col-md-6">{registro.userUpdateName} {registro.userUpdateApellido}</div>
                </div>
                <div className='row'>
                    <div className="col-lg-6 col-md-6 label ">Fecha de modificación</div>
                    <div className="col-lg-6 col-md-6">{!registro.dateUpdate ? '----': fechas.local(registro.dateUpdate, 8)}</div>
                </div>
            </Modat_V2>
        </Contenedor>
    );
};

export default Proveedores;


const FormDataPersonal = ({idProveedor, showLoad, handleAlert, closeModal}) => {
    const [registroPerson, setRegistroPerson] = useState({puesto:'DEFAULT', genero:0});
    const [proveedor, setProveedor] = useState({puesto:'DEFAULT', genero:0});
    const [registroAddress, setRegistroAddress] = useState({estado:'DEFAULT', municipio:'DEFAULT', colonia:'DEFAULT'});
    // const [registroJob, setRegistroJob] = useState({});
    
    const [listaPuestos, setlistaPuestos] = useState([]);
    const [listaEstados, setListaEstados] = useState([]);
    const [listaMunicipios, setListaMunicipios] = useState([]);
    const [listaColonias, setListaColonias] = useState([]);

    useEffect(async () => {
        getPuestos();
        await getEstados();
        await getDataUsuario()
    },[]);

    //#region PERSONAL
    const handleChangePerson = e => {
        const { name, value } = e.target;
        setRegistroPerson({ ...registroPerson, [name]: value });
    };
    const handleChangeProveedor = e => {
        const { name, value } = e.target;
        setProveedor({ ...proveedor, [name]: value });
    };
    //#endregion

    //#region  GET data
    const getPuestos= () => {
        //get estados
        Fetch.GET({ url: 'tipoProveedor/tipos' })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setlistaPuestos(data.body);
            }
        }).catch((error) => {
            console.warn(error);
            setEstado({
                done: true,
            })
        });
    };
    const getDataUsuario= async () => {
        //get
        await Fetch.GET({ url: `user/proveedor/informacion?idProveedor=${idProveedor}` })
        .then(async data=>{
            if(!data.error && data.status === 200){

                let direccion = data.body.direccion;
                await getMunicipios(direccion.estado)
                await getColonias(direccion.municipio)

                setRegistroPerson(data.body.usuario)
                setProveedor( data.body.proveedor)   
                setRegistroAddress(direccion)  
            }
        }).catch((error) => {
            console.warn(error);
        });
    };
    //#endregion
    
    //#region ESTADOS MUNICIPIOS Y COLONIAS
    const handleChangeAddress = (e, json = false) => {

        if(json){
          setRegistroAddress(e);
        } else {
          const { name, value } = e.target;
          setRegistroAddress({ ...registroAddress, [name]: value });
        }
    };
    const getEstados = () => {
        //get estados
        Fetch.GET({ url: 'ema/estados' })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setListaEstados(data.body);
            }
        }).catch((error) => {
            console.warn(error);
        });
    };
    const getMunicipios = (id) => {
        //get estados
        Fetch.GET({ url: `ema/municipios?id=${id}` })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setListaMunicipios(data.body)
            }
        }).catch((error) => {
            console.warn(error);
        });
    };
    const getColonias = (id) => {
        //get estados
        Fetch.GET({ url: `ema/colonias?id=${id}` })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setListaColonias(data.body);
            }
        }).catch((error) => {
            console.warn(error);
        });
    };

    const handleChangeEstados = async e => {
        //get municipios
        let id =0
        if(e.target){
            const { value } = e.target;
            setListaColonias([])
            id = value
        } else{
            id = e
        }

        await Fetch.GET({ url: `ema/municipios?id=${id}` })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setListaMunicipios(data.body)

                if(e.target){
                    const { name } = e.target;
                    handleChangeAddress({...registroAddress, 
                        [name]: id, 
                        // municipio:data.body[0].id,
                        municipio:"DEFAULT",
                        colonia: "DEFAULT",
                        codigo_postal:'', 
                        ciudad:''
                    }, true);
                }
                
            }
        }).catch((error) => {
            console.warn(error);
        });
    };
    const handleChangeMunicipios = async e => {
        //get colonias

        let id = 0;
        if(e.target){
            setListaColonias([])
            const { value } = e.target;
            id = value
        } else{
            id = e
        }

        await Fetch.GET({ url: `ema/colonias?id=${id}` })
        .then(async data=>{
            if(!data.error && data.status === 200){

                await setListaColonias(data.body);

                if(e.target){
                    let _data = data.body.find(x=> x.id == data.body[0].id)
                    if(_data){
                        const { name } = e.target;
                        handleChangeAddress({...registroAddress,
                            [name]: id,
                            // colonia: data.body[0].id,
                            // codigo_postal: _data.codigo_postal,
                            // ciudad: _data.ciudad
                            colonia: "DEFAULT",
                            codigo_postal: '',
                            ciudad: ''
                        }, true)
                    }
                }
            }
        }).catch((error) => {
            console.warn(error);
        });
    };
    const handleChangeColonias = (e) => {

        const { name, value } = e.target;
        let data = listaColonias.find(x=> x.id == value)
        if(data){
            handleChangeAddress({...registroAddress,
                [name]: value,
                codigo_postal: data.codigo_postal,
                ciudad: data.ciudad
            }, true)
        }
    };
    //#endregion

    //#region 
    const ValidSubmit = async e => {
        e.preventDefault();

        if(proveedor.tipoProveedor == 'DEFAULT'){
            handleAlert('Selecciona el puesto', 'info')
        } else if(registroAddress.estado == 'DEFAULT'){
            handleAlert('Selecciona el estado', 'info')
        } else if(registroAddress.municipio == 'DEFAULT'){
            handleAlert('Selecciona el municipio', 'info')
        } else if(registroAddress.colonia == 'DEFAULT'){
            handleAlert('Selecciona la colonia', 'info')
        } else {
            handleSubmitEditar()
        }
    }
    
    const handleSubmitEditar = async () => {
        showLoad(true)
        let objeto = {
            person: registroPerson,
            address: registroAddress,
            proveedor: proveedor
        }

        debugger
        await Fetch.PUT({
            url: 'user/proveedor',
            obj: objeto
        })
        .then(data=>{
            if(!data.error && data.status === 200){
                handleAlert(data.body, 'success')
                closeModal(false)
            } else {
                handleAlert(data.body, 'warning')
            }
        }).catch((error) => {
            console.warn(error);
        }).finally(() =>{
            showLoad(false)
        })
    }
    //#endregion
    return (
        <form onSubmit={ValidSubmit}>
            <div> Los campos marcados con * son obligatorios </div>
            {/* datos proveedor */}
            <>
                <div> <strong>Datos de la empresa</strong> </div>
                <div className='row'>
                    <ColumContainer s='12' m='6' x='6'>
                        <div className="row">
                            <div className="mb-3">
                                <label htmlFor="puesto" className="form-label"> *  Tipo proveedor</label>
                                <select value={proveedor.tipoProveedor} name="puesto" onChange={handleChangeProveedor} id="puesto" className="form-select" aria-label="Default select example">
                                    <option value="DEFAULT" disabled>Puesto</option>
                                    {
                                        listaPuestos.map((item) => <option key={item.id} value={item.id}>{item.tipo}</option> )
                                    }
                                </select>
                                {
                                    proveedor.statusPuesto==0 &&
                                    <span className='font9'>Puesto <strong>{proveedor.tipo}</strong> - actualmente inactivo</span>
                                }
                            </div>
                        </div>
                    </ColumContainer>
                </div>
                <div className='row'>
                    <ColumContainer s='12' m='4' x='4'>
                        <Input valor={proveedor.folio} name='folio' handleChange={handleChangeProveedor} label='Identificador' placeholder='P-0000' maxLength="6" required={true} />
                    </ColumContainer>
                    <ColumContainer s='12' m='4' x='4'>
                        <Input valor={proveedor.razon_social} name='razon_social' handleChange={handleChangeProveedor} label='Razón social' required={true}/>
                    </ColumContainer>
                    <ColumContainer s='12' m='4' x='4'>
                        <Input valor={proveedor.nombre_empresa} name='nombre_empresa' handleChange={handleChangeProveedor} label='Nombre empresa' required={true} />
                    </ColumContainer>
                    <ColumContainer s='12' m='4' x='4'>
                        <Input valor={proveedor.rfc} name='rfc' handleChange={handleChangeProveedor} label='RFC' maxLength="13" required={true} />
                    </ColumContainer>
                    <ColumContainer s='12' m='4' x='4'>
                        <Input valor={proveedor.telefono_empresa} name='telefono_empresa' handleChange={handleChangeProveedor} label='Telefono' required={true}/>
                    </ColumContainer>
                    <ColumContainer s='12' m='4' x='4'>
                        <Input valor={proveedor.correo_empresa} name='correo_empresa' type='email' handleChange={handleChangeProveedor} label='Correo electrónico' required={true}/>
                    </ColumContainer>
                </div>
            </>

            <>
                {/* datos personales */}
                <div className='row mt-4'>
                    <div className='line'> <strong>Dirección de la empresa</strong> </div>
                    <ColumContainer s='12' m='6' x='6'>
                        <div className="mb-3">
                            <label htmlFor="estado" className="form-label"> *  Estado </label>
                            <select value={registroAddress.estado} name="estado" onChange={(e) => handleChangeEstados(e)} id="estado" className="form-select" aria-label="Default select example">
                                <option value="DEFAULT" disabled>Estados</option>
                                {
                                    listaEstados.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                                }
                            </select>
                        </div>
                    </ColumContainer>
                    <ColumContainer s='12' m='6' x='6'>
                        <div className="mb-3" >
                            <label htmlFor="municipio" className="form-label"> *  Municipio </label>
                            <select value={registroAddress.municipio} name="municipio" onChange={(e) => handleChangeMunicipios(e)} id="municipio" className="form-select" aria-label="Default select example">
                                <option value="DEFAULT" disabled>Municipios</option>
                                {
                                    listaMunicipios.length == 0 ? <option value="DEFAULT" disabled>Seleccciona un estado</option>
                                    : listaMunicipios.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                                }
                            </select>
                        </div>
                    </ColumContainer>
                    <ColumContainer s='12' m='6' x='6'>
                        <div className="mb-3" >
                            <label htmlFor="colonia" className="form-label"> *  Colonia </label>
                            <select value={registroAddress.colonia} name="colonia" onChange={(e) => handleChangeColonias(e)} id="colonia" className="form-select" aria-label="Default select example">
                                <option value="DEFAULT" disabled>Colonias</option>
                                {
                                    listaColonias.length == 0 ? <option value="DEFAULT" disabled>Seleccciona un municipio</option>
                                    : listaColonias.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                                }
                            </select>
                        </div>
                    </ColumContainer>
                    <ColumContainer s='12' m='6' x='6'>
                            <Input valor={registroAddress.codigo_postal} name='codigoPostal' label='Código postal' disabled={true}/>
                    </ColumContainer>
                </div>
            </>

            {/* datos direccion */}
            <>
            <div className='row mt-4'>
                <div className='line'> <strong>Datos de contacto</strong> </div>    
                <ColumContainer s='12' m='4' x='4'>
                    <Input valor={registroPerson.nombre} name='nombre' handleChange={handleChangePerson} label='Nombre' required={true} />
                </ColumContainer>
                <ColumContainer s='12' m='4' x='4'>
                    <Input valor={registroPerson.apellidoPaterno} name='apellidoPaterno' handleChange={handleChangePerson} label='Apellido paterno' required={true}/>
                </ColumContainer>
                <ColumContainer s='12' m='4' x='4'>
                    <Input valor={registroPerson.apellidoMaterno} name='apellidoMaterno' handleChange={handleChangePerson} label='Apellido materno'/>
                </ColumContainer>
                <ColumContainer s='12' m='4' x='4'>
                    <Input valor={registroPerson.telefono} name='telefono' handleChange={handleChangePerson} label='Telefono' maxLength="10" required={true} />
                </ColumContainer>
                <ColumContainer s='12' m='4' x='4'>
                    <Input valor={registroPerson.email} name='email' type='email' handleChange={handleChangePerson} label='Correo electrónico' required={true}/>
                </ColumContainer>
                <ColumContainer s='12' m='4' x='4'>
                    <label htmlFor="genero" className="col-md-4 col-lg-3 col-form-label form-label">Genero</label>
                    <div className="col-md-8 col-lg-9">
                        <div className="form-check">
                            <input value='0' checked={registroPerson.genero==0} name="genero" onChange={handleChangePerson} className="form-check-input" type="radio" id="flexRadioDefault1" />
                            <label className="form-check-label " htmlFor="flexRadioDefault1">
                                Mujer
                            </label>
                        </div>
                        <div className="form-check">
                            <input value='1' checked={registroPerson.genero==1} name="genero"  onChange={handleChangePerson} className="form-check-input" type="radio" id="flexRadioDefault2" />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                Hombre
                            </label>
                        </div>
                    </div>
                </ColumContainer>
            </div>
            </>

            <div className='text-end mt-4'>
                <Boton type="submit" clases="btn_principal">Guardar</Boton>
            </div>
        </form>
    );
};
