import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import ColumContainer from '../components/ColumContainer';
import RowContainer from '../components/RowContainer';
import Contenedor from '../components/Contenedor';
import Boton from '../components/Boton';
import Mensaje from '../components/Mensaje';
import FormDireccion from '../components/FormDireccion';
import './styles/form.scss';

let objAgregar = {
  "nombre": '',
  "telefono": '',
  "email": '',
  "profesion": '',
  "rfc": '',
  "curp": '',
  "despacho": '',
  "marca": '',
  "paginaWeb": '',
  "telefonoOficina": '',
  "estado": '',
  "direccion": '',
  // "razonSocial": body.razonSocial,
  // "genero": body.genero,
  // "apellidoPaterno": body.apellidoPaterno,
  // "apellidoMaterno": body.apellidoMaterno,
  // "correoRecuperacion": body.correoRecuperacion,
}

const FormAdmin = ({ title, namebtn = 'Guardar registro', Data = objAgregar}) => {
  let history = useHistory();
  // const frmLogin = { username:'', password:''};

  const [user, setUser] = useState('0');
  useEffect(() => {
      setUser(localStorage.getItem('_T_U'));
  });

  const [registro, setAdd] = useState(Data);
  const [estado, setEstado] = useState({ done: true, success: true, mensaje: '', form: true });

  const handleChange = e => {
    const { name, value } = e.target;
    setAdd({ ...registro, [name]: value });
  };
  
  const backFormulario = () => {
    if (estado.success) {
      history.push('administradores');
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
    } else {
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
                            <Nav.Link eventKey="address">Dirección</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </ColumContainer>
                      <ColumContainer  m="9" x="9">
                        <Tab.Content>
                          <Tab.Pane eventKey="person">
                            <div className="row mb-3">
                              <label htmlFor="nombre" className="col-md-4 col-lg-3 col-form-label">Nombre *</label>
                              <div className="col-md-8 col-lg-9">
                                <input value={registro.nombre} name="nombre" onChange={handleChange} type="text" className="form-control" id="currentPassword" required/>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label htmlFor="apellidoPaterno" className="col-md-4 col-lg-3 col-form-label">Apellido paterno *</label>
                              <div className="col-md-8 col-lg-9">
                                <input value={registro.apellidoPaterno} name="apellidoPaterno" onChange={handleChange} type="text" className="form-control" id="currentPassword" required/>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label htmlFor="apellidoMaterno" className="col-md-4 col-lg-3 col-form-label">Apellido materno</label>
                              <div className="col-md-8 col-lg-9">
                                <input value={registro.apellidoMaterno} name="apellidoMaterno" onChange={handleChange} type="text" className="form-control" id="currentPassword" />
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label htmlFor="telefono" className="col-md-4 col-lg-3 col-form-label">Teléfono *</label>
                              <div className="col-md-8 col-lg-9">
                                <input value={registro.telefono} name="telefono" onChange={handleChange} type="phone" className="form-control" id="currentPassword" required/>
                              </div>
                            </div>
                            <div className="row mb-3">
                              <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Correo electrónico *</label>
                              <div className="col-md-8 col-lg-9">
                                <input value={registro.email} name="email" onChange={handleChange} type="email" className="form-control" id="currentPassword" required/>
                              </div>
                            </div>
                            {user == "1" &&
                              <div className="row mb-3">
                                <label htmlFor="idTipoUsuario" className="col-md-4 col-lg-3 col-form-label">Tipo Administrador *</label>
                                <div className="col-md-8 col-lg-9">
                                  <select value={registro.idTipoUsuario} name="idTipoUsuario" onChange={handleChange} className="form-select" aria-label="Default select example" required>
                                    <option value="2">Administrador</option>
                                    <option value="1">Administrador maestro</option>
                                  </select>
                                </div>
                              </div>
                            }
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
}

export default FormAdmin;