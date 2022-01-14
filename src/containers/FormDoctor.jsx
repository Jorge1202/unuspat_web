import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import Contenedor from '../components/Contenedor';
import ColumContainer from '../components/ColumContainer';
import RowContainer from '../components/RowContainer';
import Boton from '../components/Boton';
import Mensaje from '../components/Mensaje';
import FormDireccion from '../components/FormDireccion';
import './styles/form.scss';

let objAgregar = {
    "nombre": '',
    "telefono": '',
    "email": '',
    "especialidad": '',
    "cedula": '',

    "invitacion": '',
    "relacioMedico": '',
    "fechaInvitacion": '',

    "estado": '',
    "municipio": '',

    // "rfc": '',
    // "despachoMarca": '',
    // "paginaWeb": '',
    // "telefonoOficina": '',
    // "razonSocial": body.razonSocial,
    // "genero": body.genero,
    // "apellidoPaterno": body.apellidoPaterno,
    // "apellidoMaterno": body.apellidoMaterno,
    // "correoRecuperacion": body.correoRecuperacion,
};

const FormDoctor = ({ title, namebtn = 'Guardar registro', Data = objAgregar }) => {

    let history = useHistory();

    const [registro, setAdd] = useState(Data);
    const [estado, setEstado] = useState({ done: true, success: true, mensaje: '', form: true });

    const handleChange = e => {
        const { name, value } = e.target;
        setAdd({ ...registro, [name]: value });
    };

    const backFormulario = () => {
        if (estado.success) {
            history.push('doctores');
        } else {
            let valores = {
                done: true,
                form: true
            };
            setEstado(valores);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        let valores = {
            done: false
        };
        setEstado(valores);
        if (edicion) {
            //editar
            console.log("edicion formulario");
        } else {
            console.log("agregar formulario");
            //agregar

            // let fetch = new Fetch();
            // let objFetch = {
            //   url: 'user/admin/agregar',
            //   obj: registro
            // }
            // fetch.POST(objFetch)
            // .then(data=>{
            //     if(!data.error && data.status === 200){
            //       let valores = {
            //           done: true,
            //           success: true,
            //           form: false,
            //           mensaje: data.body,
            //       };
            //       setEstado(valores);

            //     } else {
            //       let valores = {
            //           done: true,
            //           success: false,
            //           form: false,
            //           mensaje: data.body,
            //       };
            //       setEstado(valores);
            //     }
            // }).catch((e) => {
            //   let valores = {
            //       done: true,
            //       form: false,
            //       success: false,
            //       mensaje: 'Error 500',
            //   };
            //   setEstado(valores);
            // })
        }

    }

    if (estado.done) {
        return (
            <React.Fragment>
                {
                    estado.form ? (
                        <Contenedor title={title}>
                            <div className="registro">
                                <form onSubmit={handleSubmit}>
                                    <Tab.Container id="left-tabs-example" defaultActiveKey="person">
                                        <RowContainer>
                                            <ColumContainer m="3" x="3">
                                                <Nav variant="pills" className="flex-column">
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="person">Datos personales</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="job">Laboral</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="address">Dirección</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </ColumContainer>
                                            <ColumContainer m="9" x="9">
                                                <Tab.Content>
                                                    <Tab.Pane eventKey="person">
                                                        <div className="row mb-3">
                                                            <label htmlFor="nombre" className="col-md-4 col-lg-3 col-form-label">Nombre *</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.nombre} name="nombre" onChange={handleChange} type="text" className="form-control" id="nombre" required />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="apellidoPaterno" className="col-md-4 col-lg-3 col-form-label">Apellido paterno *</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.apellidoPaterno} name="apellidoPaterno" onChange={handleChange} type="text" className="form-control" id="apellidoPaterno" required/>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="apellidoMaterno" className="col-md-4 col-lg-3 col-form-label">Apellido materno *</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.apellidoMaterno} name="apellidoMaterno" onChange={handleChange} type="text" className="form-control" id="apellidoMaterno" required/>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="telefono" className="col-md-4 col-lg-3 col-form-label">Teléfono *</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.telefono} name="telefono" onChange={handleChange} type="phone" className="form-control" id="telefono" required/>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Correo electrónico *</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.email} name="email" onChange={handleChange} type="email" className="form-control" id="email" required/>
                                                            </div>
                                                        </div>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="job">
                                                        <div className="row mb-3">
                                                            <label htmlFor="cedula" className="col-md-4 col-lg-3 col-form-label">Cédula *</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.cedula} name="cedula" onChange={handleChange} type="text" className="form-control" id="cedula" required/>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="especialidad" className="col-md-4 col-lg-3 col-form-label">Especialidad</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.especialidad} name="especialidad" onChange={handleChange} type="text" className="form-control" id="especialidad" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="rfc" className="col-md-4 col-lg-3 col-form-label">RFC</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.rfc} name="rfc" onChange={handleChange} type="text" className="form-control" id="rfc" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="razonSocial" className="col-md-4 col-lg-3 col-form-label">Razón Social </label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.razonSocial} name="razonSocial" onChange={handleChange} type="text" className="form-control" id="razonSocial" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="despachoMarca1" className="col-md-4 col-lg-3 col-form-label">Despacho</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.despachoMarca} name="despachoMarca" onChange={handleChange} type="text" className="form-control" id="despachoMarca1" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="despachoMarca2" className="col-md-4 col-lg-3 col-form-label">Marca</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.despachoMarca} name="despachoMarca" onChange={handleChange} type="text" className="form-control" id="despachoMarca2" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="telefonoOficina" className="col-md-4 col-lg-3 col-form-label">Telefono de Oficina </label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.telefonoOficina} name="telefonoOficina" onChange={handleChange} type="text" className="form-control" id="telefonoOficina" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label htmlFor="paginaWeb" className="col-md-4 col-lg-3 col-form-label">Página Web</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <input value={registro.paginaWeb} name="paginaWeb" onChange={handleChange} type="text" className="form-control" id="paginaWeb" />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <label className="col-md-4 col-lg-3 col-form-label">Tipo Persona</label>
                                                            <div className="col-md-8 col-lg-9">
                                                                <div className="form-check">
                                                                    <input value={registro.idTipoPersona} name="idTipoPersona" onChange={handleChange} className="form-check-input" type="radio" id="idTipoPersona1" checked />
                                                                    <label className="form-check-label" htmlFor="idTipoPersona1">
                                                                        Física
                                                                    </label>
                                                                </div>
                                                                <div className="form-check">
                                                                    <input value={registro.idTipoPersona} name="idTipoPersona" onChange={handleChange} className="form-check-input" type="radio" id="idTipoPersona2" />
                                                                    <label className="form-check-label" htmlFor="idTipoPersona2">
                                                                        Moral
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="address">
                                                        <FormDireccion register={registro}/>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </ColumContainer>
                                            <div>
                                                Datos obligatorios *
                                            </div>
                                        </RowContainer>
                                    </Tab.Container>

                                    <div className="row">
                                        <ColumContainer x="12" m="12" x_class="text-end">
                                            <Boton type="submit" clases="btn_principal">{namebtn}</Boton>
                                        </ColumContainer>
                                    </div>
                                </form>
                            </div>
                        </Contenedor>

                    ) : (
                        <Contenedor>
                            {estado.success
                                ?
                                <Mensaje icono="check-circle" mensaje="Registro de Administrador, realizado con éxito">
                                    <button onClick={backFormulario} type="button" className="btn btn-primary btn-sm">Ir a Administrador</button>
                                </Mensaje>
                                :
                                <Mensaje icono="emoji-frown" mensaje={estado.mensaje}>
                                    <button onClick={backFormulario} type="button" className="btn btn-primary btn-sm">Regresar</button>
                                </Mensaje>
                            }
                        </Contenedor>
                    )
                }
            </React.Fragment>
        )
    } else {
        return (
            <Contenedor>
                <Mensaje icono="arrow-clockwise" mensaje="Cargando contenidos..." />
            </Contenedor>
        )
    }
};

export default FormDoctor;