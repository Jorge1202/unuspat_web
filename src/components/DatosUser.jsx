import React, { useState, useEffect, useRef } from 'react';
import { Tabs, Tab, Accordion } from 'react-bootstrap';
import Boton from '../components/Boton';
import RowContainer from './RowContainer';

const DatosUser = ({ userShow, Data, perfil = 'edit' }) => {
    /*
    -userShow : refiere al tipo de usuario a visualisar
    -Data: es el objeto a visualizar
    -user: tipo de usuario logueado
    -perfil: valida de donde se va a visualisar la información (Perfil=true, Modificación=false)
    */
    const [user, setUser] = useState('0');
    
    const [registro, setAdd] = useState(Data);
    
    // const DataEditar = useRef(Data);  
    // console.log(DataEditar);
    
    useEffect(() => {
        setUser(localStorage.getItem('_T_U'));
        // setAdd(Data);     
    });

    const [key, setKey] = useState('home');
   
    const handleChange = e => {
        const { name, value } = e.target;
        setAdd({ ...registro, [name]: value });
    };

    const handleSubmitChangePasswors = e => {
        e.preventDefault();
        console.log('change contraseña');
    }
    const handleSubmitEditPerfil = e => {
        e.preventDefault();
        console.log('change contraseña');
    }
    const handleSubmitEditDireccion = e => {
        e.preventDefault();
        console.log('change contraseña');
    }
    const handleSubmitEditlaboralHH = e => {
        e.preventDefault();
        console.log('change contraseña');
    }
    const handleSubmitEditlaboralDoc = e => {
        e.preventDefault();
        console.log('change contraseña');
    }


    return (
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
        >
            <Tab eventKey="home" title="Información">

                <>
                    <RowContainer nameSubtitle="Datos de perfil">
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label ">Nombre completo</div>
                            <div className="col-lg-9 col-md-8">{Data.nombre}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Teléfono</div>
                            <div className="col-lg-9 col-md-8">{Data.telefono}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Correo electrónico</div>
                            <div className="col-lg-9 col-md-8">{Data.email}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Genero</div>
                            <div className="col-lg-9 col-md-8">{Data.genero?'Hombre':'Mujer'}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Estatus </div>
                            <div className="col-lg-9 col-md-8">{Data.idEstatusUsuario}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label ">Dirección</div>
                            <div className="col-lg-9 col-md-8"> 
                                {Data.calle} ext.{Data.no_ext?Data.no_ext:'s/n'} int. {Data.no_int?Data.no_int:'s/n'}, {Data.ciudad? `ciudad ${Data.ciudad}` : ''}, 
                                col. {Data.n_colonia} <br />  {Data.n_municipio}, {Data.n_estado} C.P. {Data.codigoPostal} 
                            </div>
                        </div>
                    </RowContainer>
                </>

                {
                    userShow == '3' &&
                    <>
                        <RowContainer nameSubtitle="Datos laborales">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Profesion</div>
                                <div className="col-lg-9 col-md-8">profesion</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">CURP</div>
                                <div className="col-lg-9 col-md-8">curp</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">RFC</div>
                                <div className="col-lg-9 col-md-8">rfc</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Razón Social</div>
                                <div className="col-lg-9 col-md-8">razonSocial</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Despacho</div>
                                <div className="col-lg-9 col-md-8">despacho</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Marca</div>
                                <div className="col-lg-9 col-md-8">marca</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Telefono Oficina</div>
                                <div className="col-lg-9 col-md-8">telefonoOficina</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Tipo Persona</div>
                                <div className="col-lg-9 col-md-8">idTipoPersona</div>
                            </div>
                        </RowContainer>
                    </>
                }

                {
                    userShow == '4' &&
                    <>
                        <RowContainer nameSubtitle="Datos laborales">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Cédula</div>
                                <div className="col-lg-9 col-md-8">cedula</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Clave</div>
                                <div className="col-lg-9 col-md-8">clave</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Especialidad</div>
                                <div className="col-lg-9 col-md-8">especialidad</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">RFC</div>
                                <div className="col-lg-9 col-md-8">rfc</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Razón Social</div>
                                <div className="col-lg-9 col-md-8">razonSocial</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Despacho Marca</div>
                                <div className="col-lg-9 col-md-8">despachoMarca</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Telefono de Oficina</div>
                                <div className="col-lg-9 col-md-8">telefonoOficina</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Página Web</div>
                                <div className="col-lg-9 col-md-8">paginaWeb</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Tipo Persona</div>
                                <div className="col-lg-9 col-md-8">idTipoPersona</div>
                            </div>
                        </RowContainer>
                    </>
                }
                <RowContainer>
                    <div className='row'>
                        <div className="col-lg-3 col-md-4 label ">Creado por</div>
                        <div className="col-lg-9 col-md-8">{Data.userCreate}</div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-3 col-md-4 label ">Fecha de creación</div>
                        <div className="col-lg-9 col-md-8">{Data.dateCreate}</div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-3 col-md-4 label ">Modificado por</div>
                        <div className="col-lg-9 col-md-8">{Data.userUpdate}</div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-3 col-md-4 label ">Fecha de modificación</div>
                        <div className="col-lg-9 col-md-8">{Data.dateUpdate}</div>
                    </div>
                </RowContainer>
            </Tab>

            <Tab eventKey="profile" title="Editar">
                <Accordion defaultActiveKey="0">

                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Datos de perfil</Accordion.Header>
                        <Accordion.Body>
                            <form onSubmit={handleSubmitEditPerfil}>
                                <div className="row mb-3">
                                    <label htmlFor="nombre" className="col-md-4 col-lg-3 col-form-label">Nombre</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.nombre} name="nombre" onChange={handleChange} type="text" className="form-control" id="currentPassword" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="apellidoPaterno" className="col-md-4 col-lg-3 col-form-label">Apellido paterno</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.apellidoPaterno} name="apellidoPaterno" onChange={handleChange} type="text" className="form-control" id="currentPassword" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="apellidoMaterno" className="col-md-4 col-lg-3 col-form-label">Apellido materno</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.apellidoMaterno} name="apellidoMaterno" onChange={handleChange} type="text" className="form-control" id="currentPassword" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="telefono" className="col-md-4 col-lg-3 col-form-label">Teléfono</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.telefono} name="telefono" onChange={handleChange} type="phone" className="form-control" id="currentPassword" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Correo electrónico</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.email} name="email" onChange={handleChange} type="email" className="form-control" id="currentPassword" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="genero" className="col-md-4 col-lg-3 col-form-label">Genero</label>
                                    <div className="col-md-8 col-lg-9">
                                        <div className="form-check">
                                            <input checked={Data.genero=="0"} name="genero" className="form-check-input" type="radio" id="flexRadioDefault1" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Mujer
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input checked={Data.genero=="1"} name="genero"  className="form-check-input" type="radio" id="flexRadioDefault2" />
                                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                                Hombre
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {user == "1" && userShow=="2" &&
                                    <div className="row mb-3">
                                        <label htmlFor="idTipoUsuario" className="col-md-4 col-lg-3 col-form-label">Tipo Administrador</label>
                                        <div className="col-md-8 col-lg-9">
                                            <select value={Data.idTipoUsuario} name="idTipoUsuario" onChange={handleChange} className="form-select" aria-label="Default select example" required>
                                                <option value="2">Administrador</option>
                                                <option value="1">Administrador maestro</option>
                                            </select>
                                        </div>
                                    </div>
                                }
                                <div className='text-end'>
                                    <Boton type="submit" clases="btn_principal">Guargar</Boton>
                                </div>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Dirección</Accordion.Header>
                        <Accordion.Body>
                            <form onSubmit={handleSubmitEditDireccion}>
                                <div className="row mb-3">
                                    <label htmlFor="codigoPostal" className="col-md-4 col-lg-3 col-form-label">Código postal</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.codigoPostal} name="codigoPostal" onChange={handleChange} type="text" className="form-control" id="codigoPostal" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="estado" className="col-md-4 col-lg-3 col-form-label">Estado</label>
                                    <div className="col-md-8 col-lg-9">
                                        <select value={Data.estado} name="estado" onChange={handleChange} className="form-select" aria-label="Default select example">
                                            <option value="DEFAULT" disabled>Estados</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="municipio" className="col-md-4 col-lg-3 col-form-label">Municipio</label>
                                    <div className="col-md-8 col-lg-9">
                                        <select value={Data.municipio} name="municipio" onChange={handleChange} className="form-select" aria-label="Default select example">
                                            <option value="DEFAULT" disabled>Municipios</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colonia" className="col-md-4 col-lg-3 col-form-label">Colonia</label>
                                    <div className="col-md-8 col-lg-9">
                                        <select value={Data.colonia} name="colonia" onChange={handleChange} className="form-select" aria-label="Default select example">
                                            <option value="DEFAULT" disabled>Colonias</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label htmlFor="ciudad" className="col-md-4 col-lg-3 col-form-label">Ciudad</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.ciudad} name="ciudad" onChange={handleChange} type="text" className="form-control" id="ciudad" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="calle" className="col-md-4 col-lg-3 col-form-label">Calle</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.calle} name="calle" onChange={handleChange} type="text" className="form-control" id="calle" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="no_ext" className="col-md-4 col-lg-3 col-form-label">No. exterior</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.no_ext} name="no_ext" onChange={handleChange} type="text" className="form-control" id="no_ext" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="no_int" className="col-md-4 col-lg-3 col-form-label">No. interior</label>
                                    <div className="col-md-8 col-lg-9">
                                        <input value={Data.no_int} name="no_int" onChange={handleChange} type="text" className="form-control" id="no_int" />
                                    </div>
                                </div>

                                <div className='text-end'>
                                    <Boton type="submit" clases="btn_principal">Guargar</Boton>
                                </div>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>

                    {
                        userShow != '1' && userShow != '2' &&
                        <>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Datos laborales</Accordion.Header>
                                <Accordion.Body>
                                    {userShow == '3' &&
                                        <>
                                            <form onSubmit={handleSubmitEditlaboralHH}>
                                                <div className="row mb-3">
                                                    <label htmlFor="profesion" className="col-md-4 col-lg-3 col-form-label">Profesión</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.profesion} name="profesion" onChange={handleChange} type="text" className="form-control" id="profesion" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="curp" className="col-md-4 col-lg-3 col-form-label">CURP</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.curp} name="curp" onChange={handleChange} type="text" className="form-control" id="curp" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="rfc" className="col-md-4 col-lg-3 col-form-label">RFC</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.rfc} name="rfc" onChange={handleChange} type="text" className="form-control" id="rfc" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="telefonoOficina" className="col-md-4 col-lg-3 col-form-label">Teléfono Oficina</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.telefonoOficina} name="telefonoOficina" onChange={handleChange} type="text" className="form-control" id="telefonoOficina" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="razonSocial" className="col-md-4 col-lg-3 col-form-label">Razón Social</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.razonSocial} name="razonSocial" onChange={handleChange} type="text" className="form-control" id="razonSocial" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="despacho" className="col-md-4 col-lg-3 col-form-label">Despacho</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.despacho} name="despacho" onChange={handleChange} type="text" className="form-control" id="despacho" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="marca" className="col-md-4 col-lg-3 col-form-label">Marca</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.marca} name="marca" onChange={handleChange} type="text" className="form-control" id="marca" />
                                                    </div>
                                                </div>
                                                {
                                                    perfil == 'edit' &&
                                                    <div className="row mb-3">
                                                        <label htmlFor="idTipoPersona" className="col-md-4 col-lg-3 col-form-label">Tipo Persona</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <div className="form-check">
                                                                <input value={Data.idTipoPersona} name="idTipoPersona" onChange={handleChange} className="form-check-input" type="radio" id="idTipoPersona1" checked />
                                                                <label className="form-check-label" htmlFor="idTipoPersona1">
                                                                    Física
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input value={Data.idTipoPersona} name="idTipoPersona" onChange={handleChange} className="form-check-input" type="radio" id="idTipoPersona2" />
                                                                <label className="form-check-label" htmlFor="idTipoPersona2">
                                                                    Moral
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                <div className='text-end'>
                                                    <Boton type="submit" clases="btn_principal">Guargar</Boton>
                                                </div>
                                            </form>
                                        </>
                                    }
                                    {userShow == '4' &&
                                        <>
                                            <form onSubmit={handleSubmitEditlaboralDoc}>
                                                <div className="row mb-3">
                                                    <label htmlFor="cedula" className="col-md-4 col-lg-3 col-form-label">Cédula</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.cedula} name="cedula" onChange={handleChange} type="text" className="form-control" id="cedula" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="especialidad" className="col-md-4 col-lg-3 col-form-label">Especialidad</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.especialidad} name="especialidad" onChange={handleChange} type="text" className="form-control" id="especialidad" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="rfc" className="col-md-4 col-lg-3 col-form-label">RFC</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.rfc} name="rfc" onChange={handleChange} type="text" className="form-control" id="rfc" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="telefonoOficina" className="col-md-4 col-lg-3 col-form-label">Telefono de Oficina </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.telefonoOficina} name="telefonoOficina" onChange={handleChange} type="text" className="form-control" id="telefonoOficina" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="razonSocial" className="col-md-4 col-lg-3 col-form-label">Razón Social </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.razonSocial} name="razonSocial" onChange={handleChange} type="text" className="form-control" id="razonSocial" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="despachoMarca1" className="col-md-4 col-lg-3 col-form-label">Despacho</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.despachoMarca} name="despachoMarca" onChange={handleChange} type="text" className="form-control" id="despachoMarca1" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="despachoMarca2" className="col-md-4 col-lg-3 col-form-label">Marca</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.despachoMarca} name="despachoMarca" onChange={handleChange} type="text" className="form-control" id="despachoMarca2" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="paginaWeb" className="col-md-4 col-lg-3 col-form-label">Página Web</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Data.paginaWeb} name="paginaWeb" onChange={handleChange} type="text" className="form-control" id="paginaWeb" />
                                                    </div>
                                                </div>
                                                {
                                                    perfil == 'edit' &&
                                                    <div className="row mb-3">
                                                        <label htmlFor="idTipoPersona" className="col-md-4 col-lg-3 col-form-label">Tipo Persona</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <div className="form-check">
                                                                <input value={Data.idTipoPersona} name="idTipoPersona" onChange={handleChange} className="form-check-input" type="radio" id="idTipoPersona1" checked />
                                                                <label className="form-check-label" htmlFor="idTipoPersona1">
                                                                    Física
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input value={Data.idTipoPersona} name="idTipoPersona" onChange={handleChange} className="form-check-input" type="radio" id="idTipoPersona2" />
                                                                <label className="form-check-label" htmlFor="idTipoPersona2">
                                                                    Moral
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                <div className='text-end'>
                                                    <Boton type="submit" clases="btn_principal">Guargar</Boton>
                                                </div>
                                            </form>
                                        </>
                                    }
                                </Accordion.Body>
                            </Accordion.Item>
                        </>
                    }
                </Accordion>
            </Tab>

            {
                perfil=="perfil" &&
                <Tab eventKey="contact" title="Seguridad">
                    <Accordion >

                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Cambiar contraseña</Accordion.Header>
                            <Accordion.Body>
                                <form onSubmit={handleSubmitChangePasswors}>
                                    <div className="row mb-3">
                                        <label htmlFor="currentPassword" className="col-md-4 col-lg-3 col-form-label">Contraseña actual</label>
                                        <div className="col-md-8 col-lg-9">
                                            <input name="password" type="password" className="form-control" id="currentPassword" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">Nueva contraseña</label>
                                        <div className="col-md-8 col-lg-9">
                                            <input name="newpassword" type="password" className="form-control" id="newPassword" />
                                        </div>
                                    </div>

                                    <div className="row mb-3">
                                        <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Confirmar contraseña </label>
                                        <div className="col-md-8 col-lg-9">
                                            <input name="renewpassword" type="password" className="form-control" id="renewPassword" />
                                        </div>
                                    </div>

                                    <div className="text-end">
                                        <Boton type="submit" clases="btn_principal">Cambiar contraseña</Boton>
                                    </div>
                                </form>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Dispositivos conectados</Accordion.Header>
                            <Accordion.Body>
                                dispositivos
                            </Accordion.Body>
                        </Accordion.Item>

                    </Accordion>
                </Tab>
            }
        </Tabs>
    );
};

export default DatosUser;