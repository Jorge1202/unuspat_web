import React, { useState, useEffect } from 'react';
import Contenedor from '../../components/Contenedor';
import Load from '../../components/Load'
import Alert from '../../components/Alert';
import Fetch from '../../assets/js/fetch';
import Input from '../../components/Input';
import Boton from '../../components/Boton';
import ColumContainer from '../../components/ColumContainer'

const FormDataPersonal = ({editar = false, title='', idUsuario}) => {
    const [sowload, setSowload] = useState(false);
    const [alert, setShowAlert] = useState({ show: false, mesagge: '', color: '' });
    const [registroPerson, setRegistroPerson] = useState({puesto:'DEFAULT', genero:0});
    const [colaborador, setColaborador] = useState({puesto:'DEFAULT', genero:0});
    const [registroAddress, setRegistroAddress] = useState({estado:'DEFAULT', municipio:'DEFAULT', colonia:'DEFAULT'});
    // const [registroJob, setRegistroJob] = useState({});
    
    const [listaPuestos, setlistaPuestos] = useState([]);
    const [listaEstados, setListaEstados] = useState([]);
    const [listaMunicipios, setListaMunicipios] = useState([]);
    const [listaColonias, setListaColonias] = useState([]);

    useEffect(async () => {
        getEstados();
        getPuestos();
        if(editar){
            getDataUsuario()
        }
    },[]);

    //#region PERSONAL
    const handleChangePerson = e => {
        const { name, value } = e.target;
        setRegistroPerson({ ...registroPerson, [name]: value });
    };
    const handleChangeColaborador = e => {
        const { name, value } = e.target;
        setColaborador({ ...colaborador, [name]: value });
    };
    const getPuestos= () => {
        //get estados
        Fetch.GET({ url: 'puesto/puestos' })
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
    const getDataUsuario= () => {
        //get
        Fetch.GET({ url: 'user/colaboradorDoctor/informacion', obk:{idUsuario:idUsuario} })
        .then(async data=>{
            if(!data.error && data.status === 200){
                setRegistroPerson(data.body.usuario)
                setColaborador(data.body.colaborador)
                setRegistroAddress(data.body.direccion)
            }
        }).catch((error) => {
            console.warn(error);
            setEstado({
                done: true,
            })
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
            setEstado({
                done: true,
            })
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

    //#region Validacion y guardar
    const ValidSubmit = async e => {
        e.preventDefault();

        if(colaborador.puesto == 'DEFAULT'){
            setShowAlert({ show: true, mesagge: 'Selecciona el puesto que desempeña', color: `info` });
            setTimeout(() => {
                setShowAlert({ show: false });
            }, 3000);
        } else if(registroAddress.estado == 'DEFAULT'){
            setShowAlert({ show: true, mesagge: 'Selecciona el estado', color: `info` });
            setTimeout(() => {
                setShowAlert({ show: false });
            }, 3000);
        } else if(registroAddress.municipio == 'DEFAULT'){
            setShowAlert({ show: true, mesagge: 'Selecciona el municipio', color: `info` });
            setTimeout(() => {
                setShowAlert({ show: false });
            }, 3000);
        } else if(registroAddress.colonia == 'DEFAULT'){
            setShowAlert({ show: true, mesagge: 'Selecciona la colonia', color: `info` });
            setTimeout(() => {
                setShowAlert({ show: false });
            }, 3000);
        } else {
            if(editar){
                handleSubmitEditar()
            } else {
                handleSubmitPerson()
            }
        }

    }
    
    const handleSubmitPerson = async () => {
        await Fetch.GET({
            url: `user/perfil/validEmail?email=${registroPerson.email}`
        })
        .then(data=>{
            if(!data.error && data.status === 200){
                if(editar){
                    handleSubmitEditar()
                } else {
                    handleSubmit()
                }
            } else {
                setShowAlert({ show: true, mesagge: data.body, color: `info` });
                setTimeout(() => {
                    setShowAlert({ show: false });
                }, 3000);
            }
        }).catch((error) => {
            console.log(error);
        }).finally(()=>{

        })
    }

    const handleSubmit = async () => {
        setSowload(true)
        let objeto = {
            person: registroPerson,
            address: registroAddress,
            colaborador: colaborador
        }

        await Fetch.POST({
            url: 'user/colaboradorDoctor/agregar',
            obj: objeto
        })
        .then(data=>{
            if(!data.error && data.status === 200){
                setShowAlert({ show: true, mesagge: data.body, color: `success` });
                setTimeout(() => {
                    setShowAlert({ show: false });
                }, 3000);
            } else {
                setShowAlert({ show: true, mesagge: data.body, color: `warning` });
                setTimeout(() => {
                    setShowAlert({ show: false });
                }, 3000);
            }
        }).catch((error) => {
            console.warn(error);
        }).finally(() =>{
            setSowload(false)
        })

    }

    const handleSubmitEditar = async () => {
        setSowload(true)
        let objeto = {
            person: registroPerson,
            address: registroAddress
        }

        await Fetch.POST({
            url: 'user/colaboradorDoctor/agregar',
            obj: objeto
        })
        .then(data=>{
            if(!data.error && data.status === 200){
                setShowAlert({ show: true, mesagge: data.body, color: `success` });
                setTimeout(() => {
                    setShowAlert({ show: false });
                }, 3000);
            } else {
                setShowAlert({ show: true, mesagge: data.body, color: `warning` });
                setTimeout(() => {
                    setShowAlert({ show: false });
                }, 3000);
            }
        }).catch((error) => {
            console.warn(error);
        }).finally(() =>{
            setSowload(false)
        })
    }
    //#endregion

    return (
        <Contenedor title={editar?'':'Agregar nuevo'}>
            <Alert visible={alert.show} color={alert.color}>{alert.mesagge}</Alert>
            <Load show={sowload}/>
            <form onSubmit={ValidSubmit}>
                <div> Los campos marcados con * son obligatorios </div>
                <>
                    {/* datos personales */}
                    <div> <strong>Datos personales</strong> </div>
                    <div className='row'>
                        <ColumContainer s='12' m='6' x='6'>
                            <Input valor={registroPerson.nombre} name='nombre' handleChange={handleChangePerson} label='Nombre' required={true} />
                        </ColumContainer>
                        <ColumContainer s='12' m='6' x='6'>
                            <Input valor={registroPerson.apellidoPaterno} name='apellidoPaterno' handleChange={handleChangePerson} label='Apellido paterno' required={true}/>
                        </ColumContainer>
                    </div>
                    <div className='row'>
                        <ColumContainer s='12' m='6' x='6'>
                            <Input valor={registroPerson.apellidoMaterno} name='apellidoMaterno' handleChange={handleChangePerson} label='Apellido materno'/>
                        </ColumContainer>
                        <ColumContainer s='12' m='6' x='6'>
                            <Input valor={registroPerson.telefono} name='telefono' handleChange={handleChangePerson} label='Telefono' maxLength="10" required={true} />
                        </ColumContainer>
                    </div>
                    <div className='row'>
                        <ColumContainer s='12' m='6' x='6'>
                            <Input valor={registroPerson.email} name='email' type='email' handleChange={handleChangePerson} label='Correo electrónico' required={true} disabled={editar}/>
                        </ColumContainer>
                        <ColumContainer s='12' m='6' x='6'>
                            <Input valor={colaborador.rfc} name='rfc' handleChange={handleChangeColaborador} label='RFC' maxLength="13" required={true} />
                        </ColumContainer>
                    </div>
                </>

                {/* datos colaborador */}
                <>
                    <div className='row'>
                        <ColumContainer s='12' m='6' x='6'>
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
                        <ColumContainer s='12' m='6' x='6'>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="puesto" className="form-label"> *  Puestos </label>
                                    <select value={colaborador.puesto} name="puesto" onChange={handleChangeColaborador} id="puesto" className="form-select" aria-label="Default select example">
                                        <option value="DEFAULT" disabled>Puesto</option>
                                        {
                                            listaPuestos.map((item) => <option key={item.id} value={item.id}>{item.puesto}</option> )
                                        }
                                    </select>
                                </div>
                            </div>
                        </ColumContainer>
                    </div>
                </>

                {/* datos direccion */}
                <>
                    <div className='row mt-4'>
                        <div> <strong>Datos de dirección</strong> </div>
                        <ColumContainer s='12' m='6' x='6'>
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="estado" className="form-label"> *  Estado </label>
                                    <select value={registroAddress.estado} name="estado" onChange={(e) => handleChangeEstados(e)} id="estado" className="form-select" aria-label="Default select example">
                                        <option value="DEFAULT" disabled>Estados</option>
                                        {
                                            listaEstados.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="row">
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
                            </div>
                        </ColumContainer>
                        <ColumContainer s='12' m='6' x='6'>
                            <div className="row">
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
                            </div>
                            <div className="row">
                                <Input valor={registroAddress.codigo_postal} name='codigoPostal' label='Código postal' disabled={true}/>
                            </div>
                        </ColumContainer>
                    </div>
                </>

                <div className='text-end mt-4'>
                    <Boton type="submit" clases="btn_principal">Guardar</Boton>
                </div>
            </form>
        </Contenedor>
    );
};

export default FormDataPersonal;