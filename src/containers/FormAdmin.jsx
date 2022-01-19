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
  "nombre": '',
  "telefono": '',
  "email": '',
  "estado": "DEFAULT",
  "municipio": "DEFAULT",
  "colonia": "DEFAULT",
}

const FormAdmin = ({ title, namebtn = 'Guardar registro', Data = objAgregar}) => {
  let history = useHistory();
  // const frmLogin = { username:'', password:''};

  const [user, setUser] = useState('0');
  useEffect(() => {
      setUser(localStorage.getItem('_T_U'));
  },[]);

  const [registro, setAdd] = useState(Data);
  const [estado, setEstado] = useState({ done: true, success: true, mensaje: '', form: true });

  const handleChange = e => {
    const { name, value } = e.target;
    setAdd({ ...registro, [name]: value });


    // if(e.target.name == 'estado'){setAdd({...registro, "municipio": "DEFAULT", "colonia": "DEFAULT"})}
    // if(e.target.name == 'municipio'){setAdd({...registro, "colonia": "DEFAULT"})}
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
    // setEstado({
    //   done: false
    // });

    console.log('agregar');
    console.log(registro);

    Fetch.POST({
      url: 'user/admin/agregar',
      obj: registro
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
                            <FormDataPerson user={user} registro={registro} handleChange={handleChange}/>
                          </Tab.Pane>
                          <Tab.Pane eventKey="address">
                            <FormDireccion registro={registro} handleChange={handleChange}/>
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