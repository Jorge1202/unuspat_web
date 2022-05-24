import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import ColumContainer from '../components/ColumContainer';
import RowContainer from '../components/RowContainer';
import Contenedor from '../components/Contenedor';
import Boton from '../components/Boton';
import Mensaje from '../components/Mensaje';
import FormDataPerson from '../components/FormDataPerson';
import FormDireccion from '../components/FormDireccion';


import Fetch from '../assets/js/fetch';
import './styles/form.scss';

let objAgregar = {
  p:{  
    "idTipoUsuario": 2,
  },
  a:{
    "estado": "DEFAULT",
    "municipio": "DEFAULT",
    "colonia": "DEFAULT",
    "calle":"",
    "no_ext":"",
    "no_int":"",
  },
  j:{}
}

const FormAdmin = ({ title, Data = objAgregar}) => {
  let history = useHistory();
  // const frmLogin = { username:'', password:''};

  const [user, setUser] = useState('0');
  useEffect(() => {
      setUser(localStorage.getItem('_T_U'));
  },[]);

  const [activeKey, setactiveKey] = useState('person');
  const [estado, setEstado] = useState({ done: true, success: true, mensaje: '', form: true });
  const [disabled, setdisabled] = useState({disabledPerson: true, disabledDireccion: true});
  const [registroPerson, setRegistroPerson] = useState(Data.p);
  const [registroAddress, setRegistroAddress] = useState(Data.a);

  const handleChangePerson = e => {
      const { name, value } = e.target;
      setRegistroPerson({ ...registroPerson, [name]: value });
  };
  const handleChangeAddress = e => {
      const { name, value } = e.target;
      setRegistroAddress({ ...registroAddress, [name]: value });
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

  //#region Datos personales
  const saveFormPerson = (e)=>{
    e.preventDefault();
    setdisabled({...disabled, statusDireccion: false})
    setactiveKey('address')
  }

  const handleSubmit = e => {
    e.preventDefault();
    // setEstado({
    //   done: false
    // });

    console.log('agregar');
    let objeto = {
      person: registroPerson,
      address: registroAddress
    }
    console.log(objeto);

    Fetch.POST({
      url: 'user/admin/agregar',
      obj: objeto
    })
    .then(data=>{
      debugger
        if(!data.error && data.status === 200){
          let valores = {
              done: true,
              success: true,
              form: false,
              mensaje: data.body,
          };
          setEstado(valores);

        } else {
          let valores = {
              done: true,
              success: false,
              form: false,
              mensaje: data.body,
          };
          setEstado(valores);
        }
    }).catch((e) => {
      let valores = {
          done: true,
          form: false,
          success: false,
          mensaje: 'Error 500',
      };
      setEstado(valores);
    })

  }
  //#endregion

  if (estado.done) {
    return (
      <React.Fragment>
        {
          estado.form ? (
            <Contenedor title={title}>
              <div className="registro">
                {/* <form onSubmit={handleSubmit}> */}
                  <Tab.Container id="left-tabs-example" activeKey={activeKey} defaultActiveKey="person">
                    <RowContainer>
                      <ColumContainer m="3" x="3">
                        <Nav variant="pills" className="flex-column">
                          <Nav.Item>
                            <Nav.Link eventKey="person" disabled={disabled.disabledPerson}>Datos personales</Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link eventKey="address" disabled={disabled.disabledDireccion}>Dirección</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </ColumContainer>        
                      <ColumContainer  m="9" x="9">
                        <Tab.Content>
                          <Tab.Pane eventKey="person">
                            <form onSubmit={saveFormPerson}>
                              <FormDataPerson user={user} registro={registroPerson} handleChange={handleChangePerson}/>
                              <div className='text-end'>
                                  <Boton type="submit" clases="btn_principal">Siguiente</Boton>
                              </div>
                            </form>
                            
                          </Tab.Pane>
                          <Tab.Pane eventKey="address">
                            <form onSubmit={handleSubmit}>
                              <FormDireccion registro={registroAddress} handleChange={handleChangeAddress}/>
                              <div className='text-end'>
                                  <Boton type="submit" clases="btn_principal">Guardar</Boton>
                              </div>
                            </form>
                          </Tab.Pane>
                        </Tab.Content>
                      </ColumContainer>
                      <div>
                        Datos obligatorios *
                      </div>
                    </RowContainer>
                  </Tab.Container>

                  {/* <div className="row">
                      <ColumContainer x="12" m="12" x_class="text-end">
                        <Boton type="submit" clases="btn_principal">{ namebtn }</Boton>
                      </ColumContainer>
                  </div>
                </form> */}
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