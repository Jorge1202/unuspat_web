import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Accordion } from 'react-bootstrap';
import Boton from '../components/Boton';
import RowContainer from './RowContainer';
import Fetch from '../assets/js/fetch';
// import FormDireccion from './FormDireccion';
import FormDataPerson from './FormDataPerson';

const DatosUser = ({ id, typeUser, perfil = 'edit' }) => {
    /*
    -id: id del usuario a visualizar
    -typeUser : refiere al tipo de usuario a visualisar
    -perfil: valida de donde se va a visualisar la información (Perfil=true, Modificación=false)
    -user: tipo de usuario logueado
    */
   const [key, setKey] = useState('home'); //se usa para el cambio de tabs
    const [user, setUser] = useState('0');
    const [DataUser, setDataUser] = useState({});
    const [DataDireccion, setDataDireccion] = useState({});
    const [Datalaboral, setDataLaboral] = useState({});
    const [listaEstados, setListaEstados] = useState([]);
    const [listaMunicipios, setListaMunicipios] = useState([]);
    const [listaColonias, setListaColonias] = useState([]);
    
    useEffect(() => {
        setUser(localStorage.getItem('_T_U'));
    });

    useEffect(async () => {
        await handleGET();
        await getEstados();
    }, [])
   
    const handleChangeUser = e => {
        const { name, value } = e.target;
        setDataUser({ ...DataUser, [name]: value });
    };
    const handleChangeLaboral = e => {
        const { name, value } = e.target;
        setDataLaboral({ ...Datalaboral, [name]: value });
    };
    const handleChangeDireccion = e => {
        const { name, value } = e.target;
        setDataDireccion({ ...DataDireccion, [name]: value });
    };

    async function handleGET (){
        Fetch.GET({
            url: `user/perfil?id=${id}&tipo=${typeUser}`,
        })
        .then(async data=>{
            if(!data.error && data.status === 200){
                console.log(data);
                setDataUser(data.body.user); 

                if(data.body.direcciones){
                    setDataDireccion(data.body.direcciones); 
                    await handleChangeEstados(data.body.direcciones.estado)
                    await handleChangeMunicipios(data.body.direcciones.municipio) 
                }
                if(data.body.laboral){
                    setDataLaboral(data.body.laboral); 
                }
            } else {
               console.log(data);
            }
        }).catch((e) => {
            console.log(e);

        });

    }

    const getEstados = () => {
        //get estados
        Fetch.GET({ url: 'ema/estados' })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setListaEstados(data.body);
            }
        }).catch((e) => {
            setEstado({
                done: true,
            })
        })
    };

    const handleChangeEstados = async e => {
        //get municipios
       let id = e.target ? e.target.value : e;
        await Fetch.GET({ url: `ema/municipios?id=${id}` })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setListaMunicipios(data.body)
                // setData({
                //     codigo_postal: "",
                //     ciudad: ""
                // })
                
            }
        }).catch((error) => {
            console.log(error);
        })

    };

    const handleChangeMunicipios = async e => {
        //get colonias
        let id = e.target ? e.target.value : e;
        await Fetch.GET({ url: `ema/colonias?id=${id}` })
        .then(async data=>{
            if(!data.error && data.status === 200){
                await setListaColonias(data.body);
                // setData({
                //     codigo_postal: "",
                //     ciudad: ""
                // })
    
            }
        }).catch((error) => {
            console.log(error);
        })

    };

    const handleChangeColonias = (e) => {
        // let id = e.target ? e.target.value : e;
        // if(e.target )handleChange(e);

        // let data = listaColonias.find(x=> x.id == id)
        // if(data){
        //     setData({
        //         codigo_postal: data.codigo_postal,
        //         ciudad: data.ciudad
        //     })
        // }
    };


    //#region Envio de datos submit segun el tipo de usuario
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
        console.log(DataDireccion);
    }
    const handleSubmitEditlaboralHH = e => {
        e.preventDefault();
        console.log('change contraseña');
    }
    const handleSubmitEditlaboralDoc = e => {
        e.preventDefault();
        console.log('change contraseña');
    }
    //#endregion
    
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
                            <div className="col-lg-9 col-md-8">{DataUser.nombre} {DataUser.apellidoPaterno} {DataUser.apellidoMaterno}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Teléfono</div>
                            <div className="col-lg-9 col-md-8">{DataUser.telefono}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Correo electrónico</div>
                            <div className="col-lg-9 col-md-8">{DataUser.email}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Genero</div>
                            <div className="col-lg-9 col-md-8">{DataUser.genero?'Hombre':'Mujer'}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label">Estatus </div>
                            <div className="col-lg-9 col-md-8">{DataUser.estatuusuario}</div>
                        </div>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 label ">Dirección</div>
                            <div className="col-lg-9 col-md-8"> 
                                calle {DataDireccion.calle} {DataDireccion.no_ext?`#${DataDireccion.no_ext}`:'s/n'} {DataDireccion.no_int?`int. ${DataDireccion.no_int}`:''}, 
                                col. {DataDireccion.n_colonia}, {DataDireccion.ciudad? `ciudad ${DataDireccion.ciudad}` : ''} <br />   {DataDireccion.n_municipio}, {DataDireccion.n_estado} C.P. {DataDireccion.codigo_postal} 
                            </div>
                        </div>
                    </RowContainer>
                </>

                {
                    typeUser == '3' &&
                    <>
                        <RowContainer nameSubtitle="Datos laborales">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Profesion</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.profesion}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">CURP</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.curp}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">RFC</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.rfc}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Razón Social</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.razonSocial}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Despacho</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.despacho}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Marca</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.marca}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Telefono Oficina</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.telefonoOficina}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Tipo Persona</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.idTipoPersona == 1 ? 'Física' : 'Moral'}</div>
                            </div>
                        </RowContainer>
                    </>
                }

                {
                    typeUser == '4' &&
                    <>
                        <RowContainer nameSubtitle="Datos laborales">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Cédula</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.cedula}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Clave</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.clave}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Especialidad</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.especialidad}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">RFC</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.rfc}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Razón Social</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.razonSocial}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Despacho Marca</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.despachoMarca}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Telefono de Oficina</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.telefonoOficina}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Página Web</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.paginaWeb}</div>
                            </div>
                            <div className="row">
                                <div className="col-lg-3 col-md-4 label ">Tipo Persona</div>
                                <div className="col-lg-9 col-md-8">{Datalaboral.idTipoPersona == 1 ? 'Física' : 'Moral'}</div>
                            </div>
                        </RowContainer>
                    </>
                }
                <RowContainer>
                    <div className='row'>
                        <div className="col-lg-3 col-md-4 label ">Creado por</div>
                        <div className="col-lg-9 col-md-8">{DataUser.userCreateName}</div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-3 col-md-4 label ">Fecha de creación</div>
                        <div className="col-lg-9 col-md-8">{DataUser.dateCreate}</div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-3 col-md-4 label ">Modificado por</div>
                        <div className="col-lg-9 col-md-8">{DataUser.userUpdateName}</div>
                    </div>
                    <div className='row'>
                        <div className="col-lg-3 col-md-4 label ">Fecha de modificación</div>
                        <div className="col-lg-9 col-md-8">{DataUser.dateUpdate}</div>
                    </div>
                </RowContainer>
            </Tab>

            <Tab eventKey="profile" title="Editar">
                <Accordion defaultActiveKey="0">

                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Datos de perfil</Accordion.Header>
                        <Accordion.Body>
                            <form onSubmit={handleSubmitEditPerfil}>
                                <FormDataPerson user={user} registro={DataUser} handleChange={handleChangeUser}/>

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
                                {/* <FormDireccion registro={DataDireccion} handleChange={handleChangeDireccion}/> */}

                                <div className="row mb-3">
                                    <label htmlFor="estado" className="col-md-4 col-lg-3 col-form-label">Estado</label>
                                    <div className="col-md-8 col-lg-9">
                                    <select value={DataDireccion.estado || ''} name="estado" onChange={handleChangeEstados} className="form-select" aria-label="Default select example" required>
                                        <option value="DEFAULT" disabled>Estados</option>
                                        {
                                            listaEstados.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                                        }
                                    </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="municipio" className="col-md-4 col-lg-3 col-form-label">Municipio</label>
                                    <div className="col-md-8 col-lg-9">
                                    <select value={DataDireccion.municipio } name="municipio" onChange={handleChangeMunicipios} className="form-select" aria-label="Default select example">
                                        <option value="DEFAULT" disabled>Municipios</option>
                                        {
                                            listaMunicipios.length == 0 ? <option value="DEFAULT" disabled>Seleccciona un estado</option>
                                            : listaMunicipios.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                                        }
                                    </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="colonia" className="col-md-4 col-lg-3 col-form-label">Colonia</label>
                                    <div className="col-md-8 col-lg-9">
                                    <select value={DataDireccion.colonia} name="colonia" onChange={handleChangeColonias}  className="form-select" aria-label="Default select example">
                                        <option value="DEFAULT" disabled>Colonias</option>
                                        {
                                            listaColonias.length == 0 ? <option value="DEFAULT" disabled>Selecciona un municipio</option>
                                            : listaColonias.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                                        }
                                    </select>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="codigoPostal" className="col-md-4 col-lg-3 col-form-label">Código postal</label>
                                    <div className="col-md-8 col-lg-9">
                                    <input value={DataDireccion.codigo_postal || ''} name="codigoPostal"  type="text" className="form-control" id="codigoPostal" disabled />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="ciudad" className="col-md-4 col-lg-3 col-form-label">Ciudad</label>
                                    <div className="col-md-8 col-lg-9">
                                    <input value={DataDireccion.ciudad || ''} name="ciudad" onChange={handleChangeDireccion} placeholder={DataDireccion.ciudad == '' ? 'No aplica' : ''} type="text" className="form-control" id="ciudad" disabled/>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="calle" className="col-md-4 col-lg-3 col-form-label">Calle</label>
                                    <div className="col-md-8 col-lg-9">
                                    <input value={DataDireccion.calle || ''} name="calle" onChange={handleChangeDireccion} type="text" className="form-control" id="calle" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="no_ext" className="col-md-4 col-lg-3 col-form-label">No. exterior</label>
                                    <div className="col-md-8 col-lg-9">
                                    <input value={DataDireccion.no_ext || ''} name="no_ext" onChange={handleChangeDireccion} type="text" className="form-control" id="no_ext" />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label htmlFor="no_int" className="col-md-4 col-lg-3 col-form-label">No. interior</label>
                                    <div className="col-md-8 col-lg-9">
                                    <input value={DataDireccion.no_int || ''} name="no_int" onChange={handleChangeDireccion} type="text" className="form-control" id="no_int" />
                                    </div>
                                </div>
                                <div className='text-end'>
                                    <Boton type="submit" clases="btn_principal">Guargar</Boton>
                                </div>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>

                    {
                        typeUser != '1' && typeUser != '2' &&
                        <>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Datos laborales</Accordion.Header>
                                <Accordion.Body>
                                    {typeUser == '3' &&
                                        <>
                                            <form onSubmit={handleSubmitEditlaboralHH}>
                                                <div className="row mb-3">
                                                    <label htmlFor="profesion" className="col-md-4 col-lg-3 col-form-label">Profesión</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.profesion} name="profesion" onChange={handleChangeLaboral} type="text" className="form-control" id="profesion" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="curp" className="col-md-4 col-lg-3 col-form-label">CURP</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.curp} name="curp" onChange={handleChangeLaboral} type="text" className="form-control" id="curp" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="rfc" className="col-md-4 col-lg-3 col-form-label">RFC</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.rfc} name="rfc" onChange={handleChangeLaboral} type="text" className="form-control" id="rfc" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="telefonoOficina" className="col-md-4 col-lg-3 col-form-label">Teléfono Oficina</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.telefonoOficina} name="telefonoOficina" onChange={handleChangeLaboral} type="text" className="form-control" id="telefonoOficina" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="razonSocial" className="col-md-4 col-lg-3 col-form-label">Razón Social</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.razonSocial} name="razonSocial" onChange={handleChangeLaboral} type="text" className="form-control" id="razonSocial" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="despacho" className="col-md-4 col-lg-3 col-form-label">Despacho</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.despacho} name="despacho" onChange={handleChangeLaboral} type="text" className="form-control" id="despacho" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="marca" className="col-md-4 col-lg-3 col-form-label">Marca</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.marca} name="marca" onChange={handleChangeLaboral} type="text" className="form-control" id="marca" />
                                                    </div>
                                                </div>
                                                {
                                                    perfil == 'edit' &&
                                                    <div className="row mb-3">
                                                        <label htmlFor="idTipoPersona" className="col-md-4 col-lg-3 col-form-label">Tipo Persona</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <div className="form-check">
                                                                <input value={Datalaboral.idTipoPersona} name="idTipoPersona" onChange={handleChangeLaboral} className="form-check-input" type="radio" id="idTipoPersona1" checked />
                                                                <label className="form-check-label" htmlFor="idTipoPersona1">
                                                                    Física
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input value={Datalaboral.idTipoPersona} name="idTipoPersona" onChange={handleChangeLaboral} className="form-check-input" type="radio" id="idTipoPersona2" />
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
                                    {typeUser == '4' &&
                                        <>
                                            <form onSubmit={handleSubmitEditlaboralDoc}>
                                                <div className="row mb-3">
                                                    <label htmlFor="cedula" className="col-md-4 col-lg-3 col-form-label">Cédula</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.cedula} name="cedula" onChange={handleChangeLaboral} type="text" className="form-control" id="cedula" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="especialidad" className="col-md-4 col-lg-3 col-form-label">Especialidad</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.especialidad} name="especialidad" onChange={handleChangeLaboral} type="text" className="form-control" id="especialidad" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="rfc" className="col-md-4 col-lg-3 col-form-label">RFC</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.rfc} name="rfc" onChange={handleChangeLaboral} type="text" className="form-control" id="rfc" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="telefonoOficina" className="col-md-4 col-lg-3 col-form-label">Telefono de Oficina </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.telefonoOficina} name="telefonoOficina" onChange={handleChangeLaboral} type="text" className="form-control" id="telefonoOficina" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="razonSocial" className="col-md-4 col-lg-3 col-form-label">Razón Social </label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.razonSocial} name="razonSocial" onChange={handleChangeLaboral} type="text" className="form-control" id="razonSocial" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="despachoMarca1" className="col-md-4 col-lg-3 col-form-label">Despacho</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.despachoMarca} name="despachoMarca" onChange={handleChangeLaboral} type="text" className="form-control" id="despachoMarca1" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="despachoMarca2" className="col-md-4 col-lg-3 col-form-label">Marca</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.despachoMarca} name="despachoMarca" onChange={handleChangeLaboral} type="text" className="form-control" id="despachoMarca2" />
                                                    </div>
                                                </div>
                                                <div className="row mb-3">
                                                    <label htmlFor="paginaWeb" className="col-md-4 col-lg-3 col-form-label">Página Web</label>
                                                    <div className="col-md-8 col-lg-9">
                                                        <input value={Datalaboral.paginaWeb} name="paginaWeb" onChange={handleChangeLaboral} type="text" className="form-control" id="paginaWeb" />
                                                    </div>
                                                </div>
                                                {
                                                    perfil == 'edit' &&
                                                    <div className="row mb-3">
                                                        <label htmlFor="idTipoPersona" className="col-md-4 col-lg-3 col-form-label">Tipo Persona</label>
                                                        <div className="col-md-8 col-lg-9">
                                                            <div className="form-check">
                                                                <input value={Datalaboral.idTipoPersona} name="idTipoPersona" onChange={handleChangeLaboral} className="form-check-input" type="radio" id="idTipoPersona1" checked />
                                                                <label className="form-check-label" htmlFor="idTipoPersona1">
                                                                    Física
                                                                </label>
                                                            </div>
                                                            <div className="form-check">
                                                                <input value={Datalaboral.idTipoPersona} name="idTipoPersona" onChange={handleChangeLaboral} className="form-check-input" type="radio" id="idTipoPersona2" />
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