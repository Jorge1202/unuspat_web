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
import Load from '../components/Load';
import Alert from '../components/Alert';

import Fetch from '../assets/js/fetch';
import './styles/form.scss';

let objAgregar = {
  p:{  
    "idTipoUsuario": 2,
    genero:0
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

  const [user, setUser] = useState('0');

  const [sowload, setSowload] = useState(false);
  const [alert, setShowAlert] = useState({ show: false, mesagge: '', color: '' });

  const [activeKey, setactiveKey] = useState('person');
  const [estado, setEstado] = useState({ done: true, success: true, mensaje: '', form: true });
  const [disabled, setdisabled] = useState({disabledPerson: true, disabledDireccion: true});
  const [registroPerson, setRegistroPerson] = useState(Data.p);
  const [registroAddress, setRegistroAddress] = useState(Data.a);


  useEffect(() => {
    setUser(localStorage.getItem('_T_U'));
  },[]); 

  const handleChangePerson = e => {
      const { name, value } = e.target;
      setRegistroPerson({ ...registroPerson, [name]: value });
  };

  const handleChangeAddress = (e, json = false) => {

    if(json){
      setRegistroAddress(e);
    } else {
      const { name, value } = e.target;
      setRegistroAddress({ ...registroAddress, [name]: value });

    }
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
  const saveFormPerson = async (e)=>{
    e.preventDefault();
    
    await Fetch.GET({
      url: `user/perfil/validEmail?email=${registroPerson.email}`
    })
    .then(data=>{
        if(!data.error && data.status === 200){
          setactiveKey('address')
        } else {
          setShowAlert({ show: true, mesagge: data.body, color: `info` });
          setTimeout(() => {
              setShowAlert({ show: false });
          }, 3000);
        }
    }).catch((error) => {
      console.warn(error);
      let valores = {
        done: true,
        form: false,
        success: false,
        mensaje: 'Error 500',
      };
      setEstado(valores);
    }).finally(()=>{
    })
  }

  const handleSubmit = async e => {
    e.preventDefault();

    if(!registroAddress.codigo_postal){
      setShowAlert({ show: true, mesagge: 'Completa tu dirección', color: `info` });
      setTimeout(() => {
          setShowAlert({ show: false });
      }, 3000);

    } else {

      setSowload(true)

      let objeto = {
        person: registroPerson,
        address: registroAddress
      }
  
      await Fetch.POST({
        url: 'user/admin/agregar',
        obj: objeto
      })
      .then(data=>{
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
      }).catch((error) => {
        console.warn(error);
        let valores = {
            done: true,
            form: false,
            success: false,
            mensaje: 'Error 500',
        };
        setEstado(valores);
      });

      setSowload(false)
    }
  }
  //#endregion

  const backTo = (type) => {
    setactiveKey(type)
  }

  return (
    <React.Fragment>
      <Alert visible={alert.show} color={alert.color}>{alert.mesagge}</Alert>
      <Load show={sowload}/>
      
      {
        estado.done ? 
        <>
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
                                <FormDireccion registro={registroAddress} handleChange={(e, json)=>{handleChangeAddress(e, json)}}/>
                                <div className='text-end'>
                                    <Boton handleClick={()=>{backTo('person')}} type="button" clases="btn_principal">Regresar</Boton>
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
        </>
        :
        <Contenedor>
          <Mensaje icono="arrow-clockwise" mensaje="Cargando contenidos..." />
        </Contenedor>
        
      }
    </React.Fragment>
  )
}

export default FormAdmin;