import React, {useState, useEffect} from 'react';
import ColumContainer from '../components/ColumContainer';
import Input from '../components/Input';
import { useHistory } from 'react-router-dom';
import Formulario_seccion from '../components/Formulario_seccion';
import Boton from '../components/Boton';
import Fetch from '../assets/js/fetch';

import './styles/Formulario.scss';
import logo from '@img/logo/logo-color.png';

const Formulario = () => {
  
    let history = useHistory();
    const [doctor,setdoctor] = useState({});
    const [consulta,setconsulta] = useState({});
    const [consultorio,setconsultorio] = useState({});
    const [usuario, setUser] = useState({nombre:''});

    useEffect(() => {
        ValidUser();
    },[]);

    const handleChangeDoctor = e => { 
        const {name,value} = e.target;
        setdoctor({...doctor,[name]:value}); 
    };
    const handleChangeConsulta = e => { 
        if(e.target.type == "checkbox"){
            const {name,checked} = e.target;
            setconsulta({...consulta,[name]:checked}); 
        } else{
            const {name,value} = e.target;
            setconsulta({...consulta,[name]:value}); 
        }
    };
    const handleChangeConsultorio = e => { 
        if(e.target.type == "checkbox"){
            const {name,checked} = e.target;
            setconsultorio({...consultorio,[name]:checked}); 
        } else{
            const {name,value} = e.target;
            setconsultorio({...consultorio,[name]:value}); 
        } 
    };

    const ValidUser = () => {
        console.log(location.hash.split('?')[1]);
        debugger
        Fetch.GET({
            url: `user/doctores/verifyUser?id=${location.hash.split('?')[1]}`,
        })
        .then(async data => {
            debugger
            if(!data.error && data.status === 200){
                setUser(data.body.usuarios[0])
                setdoctor(data.body.doctor[0])
            }else{
                history.push('error404');
            }
        }).catch((e) => {
            console.log(e);
        })
    }

    async function handleSubmit (e){
        e.preventDefault();

        let datos ={
            doctor: doctor,
            consulta: consulta,
            consultorio: consultorio,
            usuario: usuario
        }
        console.log(datos);
        await Fetch.POST({
            url: `user/doctores/formulario`,
            obj: datos
        }).then(data =>{
            console.log(data);
            if(!data.error && data.status === 200){
                history.push('/');
            }else{
                console.log(data);
            }
        }).catch(e =>{
            console.log(e);
        })
    }

    return (
        <div className='Formulario row'>
            <ColumContainer m='10' x='7' x_class='Formulario_colum'>
                <form onSubmit={handleSubmit}>
                        <div className='Formulario__container'>
                            <div className='row'>
                                <ColumContainer m='12' x='12'>
                                    <img src={logo} alt="unuspat" className='Formulario_logo'/>
                                </ColumContainer>
                            </div>
                            <Formulario_seccion title="INFORMACIÓN DEL MÉDICO">
                                <div className='row'>
                                    <ColumContainer m='12' x='12'>
                                        <label><strong>Nombre del medico</strong></label> <br />
                                        <Input valor={`${usuario.nombre} ${usuario.apellidoPaterno} ${usuario.apellidoMaterno}`}  name='nombres' label='(Apellido paterno, Apellido materno, Nombre o nombres )' xclass='Formulario_input' disabled={true} />
                                    </ColumContainer>
                                    <ColumContainer m='6' x='6'>
                                        <label><strong>Cédula Profesional:</strong></label> <br />
                                        <Input valor={doctor.cedula} handleChange={handleChangeDoctor} name='cedula' label='(Dato conformado por 8 caracteres numéricos)' placeholder='Escribe aqui' xclass='Formulario_input' disabled={false} />
                                    </ColumContainer>
                                    <ColumContainer m='6' x='6'>
                                        <label><strong>Cédula de Especialidad de Médica:</strong></label> <br />
                                        <Input valor={doctor.cedulaEspecialidad} handleChange={handleChangeDoctor} name='cedulaEspecialidad' label='(Dato conformado por 13 caracteres alfanuméricos)' placeholder='Escribe aqui'  xclass='Formulario_input' disabled={false} />
                                    </ColumContainer>
                                    <ColumContainer m='6' x='6'>
                                        <label><strong>Tiempo ejerciendo la profesión:</strong></label> <br />
                                        <Input valor={doctor.tiempoEjerciendo} handleChange={handleChangeDoctor} name='tiempoEjerciendo' type='number' label='(En años)' xclass='Formulario_input' placeholder='Escribe aqui'  disabled={false} />
                                    </ColumContainer>
                                    <ColumContainer m='6' x='6'>
                                        <label><strong>Tiempo ejerciendo la especialidad:</strong></label> <br />
                                        <Input valor={doctor.tiempoEjerciendoEspecialidad} handleChange={handleChangeDoctor} type='number' name='tiempoEjerciendoEspecialidad' label='(En años)' xclass='Formulario_input' placeholder='Escribe aqui'  disabled={false} />
                                    </ColumContainer>
                                </div>
                            </Formulario_seccion>
                        
                            <Formulario_seccion title='INFORMACIÓN DEL CONSULTORIO'>
                                <div className='row'>
                                    <ColumContainer m='12' x='12'>
                                        <div className='row'>
                                            <ColumContainer m='12' x='12'>
                                                Favor de marcar con una “X” el tipo de consultorio en el que presta su servicio:
                                            </ColumContainer>
                                            <ColumContainer m='12' x='12'>
                                                <div className="form-check">
                                                    <input value="1" onChange={handleChangeConsultorio} checked={consultorio.idTipoConsultorio=="1"} name="idTipoConsultorio" id="idTipoConsultorio1" className="form-check-input" type="radio"/>
                                                    <label className="form-check-label" htmlFor="idTipoConsultorio1">
                                                    Consultorio de Medicina General o Familiar
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input value="2" onChange={handleChangeConsultorio} checked={consultorio.idTipoConsultorio=="2"} name="idTipoConsultorio" id="idTipoConsultorio2" className="form-check-input" type="radio"/>
                                                    <label className="form-check-label" htmlFor="typeConsultorio2">
                                                    Consultorio de Atención Médica Especializada
                                                    </label>
                                                </div>
                                            </ColumContainer>
                                        </div>
                                    </ColumContainer>
                                    <ColumContainer m='12' x='12' x_class='f_line'>                                
                                        <div className='row'>
                                            <ColumContainer m='6' x='6'>
                                                Favor de marcar con una “X” la opción que sea aplicable a su consultorio:
                                            </ColumContainer>
                                            <ColumContainer m='12' x='12'>
                                                <div className="form-check">
                                                    <input value="1" onChange={handleChangeConsultorio} checked={consultorio.idConsultorioFisico=="1"} name="idConsultorioFisico" id="idConsultorioFisico1" className="form-check-input" type="radio"/>
                                                    <label className="form-check-label" htmlFor="idConsultorioFisico1">
                                                    Consultorio Propio
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input value="2" onChange={handleChangeConsultorio} checked={consultorio.idConsultorioFisico=="2"} name="idConsultorioFisico" id="idConsultorioFisico2" className="form-check-input" type="radio"/>
                                                    <label className="form-check-label" htmlFor="idConsultorioFisico2">
                                                    Consultorio Rentado
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input value="3" onChange={handleChangeConsultorio} checked={consultorio.idConsultorioFisico=="3"} name="idConsultorioFisico" id="idConsultorioFisico3" className="form-check-input" type="radio"/>
                                                    <label className="form-check-label" htmlFor="idConsultorioFisico3">
                                                    Consultorio Compartido
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input value="4" onChange={handleChangeConsultorio} checked={consultorio.idConsultorioFisico=="4"} name="idConsultorioFisico" id="idConsultorioFisico4" className="form-check-input" type="radio"/>
                                                    <label className="form-check-label" htmlFor="idConsultorioFisico4">
                                                    Consultorio Ligado a un Servicio Hospitalario
                                                    </label>
                                                </div>
                                            </ColumContainer>
                                        </div>
                                    </ColumContainer>
                                    <ColumContainer m='12' x='12' x_class='f_line'>
                                        <label><strong>Domicilio del Consultorio:</strong></label> <br />
                                        <Input valor={doctor.domicilio} handleChange={handleChangeDoctor} name='domicilio' label='(Calle, Avenida, Número Exterior o Interior, Colonia, Municipio, Entidad Federativa y Código Postal)' placeholder='Escribe aqui'  xclass='Formulario_input' disabled={false} />
                                    </ColumContainer>
                                </div>
                            </Formulario_seccion>

                            <Formulario_seccion title='PERMISOS'>
                                <div className='row'>
                                    <ColumContainer m='12' x='12'>
                                        Marque  los permisos vigentes con los que cuenta el consultorio:
                                    </ColumContainer>
                                    <ColumContainer m='12' x='12'>
                                        <div className="form-check">
                                            <input value={consultorio.permisoAvisoFuncionamiento} onChange={handleChangeConsultorio} name="permisoAvisoFuncionamiento" className="form-check-input" type="checkbox" id="flexCheckDefault"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Aviso de Funcionamiento 
                                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input value={consultorio.permisoAvisoResponsble} onChange={handleChangeConsultorio} name="permisoAvisoResponsble" className="form-check-input" type="checkbox" id="flexCheckDefault"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Aviso de Responsable Sanitario
                                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input value={consultorio.permisoLicenciaUso} onChange={handleChangeConsultorio} name="permisoLicenciaUso" className="form-check-input" type="checkbox" id="flexCheckDefault"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Licencia de Uso de Suelo
                                                </label>
                                        </div>
                                        <div className="form-check">
                                            <input value={consultorio.permisoLicenciaFuncionamiento} onChange={handleChangeConsultorio} name="permisoLicenciaFuncionamiento" className="form-check-input" type="checkbox" id="flexCheckDefault"/>
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Licencia de Funcionamiento Municipal
                                                </label>
                                        </div>
                                        <div className='w-100'>
                                            
                                        </div>
                                    </ColumContainer>
                                </div>
                            </Formulario_seccion>
                            
                            <Formulario_seccion title='PERSONAL QUE LABORA DENTRO DEL CONSULTORIO'>
                                <div className='row'>
                                    <ColumContainer m='12' x='12'>
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Número</th>
                                                    <th scope="col">Actividad(es) que realiza(n)</th>
                                                    <th scope="col">Tipo de Contrato</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Personal Médico </th>
                                                    <td><input value={consultorio.personalMedicoNumero} onChange={handleChangeConsultorio} name="personalMedicoNumero" type="number" className='table_input'/></td>
                                                    <td><input value={consultorio.personalMedicoActividades} onChange={handleChangeConsultorio} name="personalMedicoActividades" type="text" className='table_input'/></td>
                                                    <td><input value={consultorio.personalMedicoContrato} onChange={handleChangeConsultorio} name="personalMedicoContrato" type="text" className='table_input'/></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Personal de Enfermería</th>
                                                    <td><input value={consultorio.personalEnfermeriaNumero} onChange={handleChangeConsultorio} name="personalEnfermeriaNumero" type="number" className='table_input'/></td>
                                                    <td><input value={consultorio.personalEnfermeriaActividades} onChange={handleChangeConsultorio} name="personalEnfermeriaActividades" type="text" className='table_input'/></td>
                                                    <td><input value={consultorio.personalEnfermeriaContrato} onChange={handleChangeConsultorio} name="personalEnfermeriaContrato" type="text" className='table_input'/></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Personal Administrativo</th>
                                                    <td><input value={consultorio.personalAdminNumero} onChange={handleChangeConsultorio} name="personalAdminNumero" type="number" className='table_input'/></td>
                                                    <td><input value={consultorio.personalAdminActividades} onChange={handleChangeConsultorio} name="personalAdminActividades" type="text" className='table_input'/></td>
                                                    <td><input value={consultorio.personalAdminContrato} onChange={handleChangeConsultorio} name="personalAdminContrato" type="text" className='table_input'/></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Personal de Limpieza </th>
                                                    <td><input value={consultorio.personalLimpiezaNumero} onChange={handleChangeConsultorio} name="personalLimpiezaNumero" type="number" className='table_input'/></td>
                                                    <td><input value={consultorio.personalLimpiezaActividades} onChange={handleChangeConsultorio} name="personalLimpiezaActividades" type="text" className='table_input'/></td>
                                                    <td><input value={consultorio.personalLimpiezaContrato} onChange={handleChangeConsultorio} name="personalLimpiezaContrato" type="text" className='table_input'/></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </ColumContainer>
                                </div>
                            </Formulario_seccion>
                            
                            <Formulario_seccion title='CONSULTA'>
                                <div className='row'>
                                    <ColumContainer m='6' x='6'>
                                        <Input value={consulta.costo} handleChange={handleChangeConsulta} name='costo' type='number' label='Costo de la Consulta:' xclass='Formulario_input' disabled={false} />
                                    </ColumContainer>
                                    <ColumContainer m='6' x='6'>
                                        <Input value={consulta.consultasPorDia} handleChange={handleChangeConsulta} name='consultasPorDia' type='number' label='Cuantas Consultas realiza aproximadamente al día:' xclass='Formulario_input' disabled={false} />
                                    </ColumContainer>
                                    <ColumContainer m='12' x='12'>
                                        <Input value={consulta.diasLaborales} handleChange={handleChangeConsulta} name='diasLaborales' label='Días que labora en el Consultorio: ' xclass='Formulario_input' disabled={false} />
                                    </ColumContainer>
                                </div>
                            </Formulario_seccion>
                        
                            <Formulario_seccion title='MÉTODO DE PAGO POR LA CONSULTA'>
                                <div className='row'>
                                    <ColumContainer m='12' x='12'>
                                        Señalar el porcentaje aproximado de ingresos mensuales por cada método de pago
                                    </ColumContainer>
                                    <ColumContainer m='12' x='12'>
                                        <table className="table">
                                            <tbody>
                                                <tr>
                                                    <th scope="row">Efectivo  </th>
                                                    <td><input value={consulta.metodoPagoEfectivo} onChange={handleChangeConsulta} name="metodoPagoEfectivo" type="number" className='table_input' /></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Transferencia</th>
                                                    <td><input value={consulta.metodoPagoTransferencia} onChange={handleChangeConsulta} name="metodoPagoTransferencia" type="number" className='table_input' /></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Cheque</th>
                                                    <td><input value={consulta.metodoPagoCheque} onChange={handleChangeConsulta} name="metodoPagoCheque" type="number" className='table_input' /></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Tarjeta de Crédito </th>
                                                    <td><input value={consulta.metodoPagoTCredito} onChange={handleChangeConsulta} name="metodoPagoTCredito" type="number" className='table_input' /></td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">Tarjeta de Débito  </th>
                                                    <td><input value={consulta.metodoPagoTDebito} onChange={handleChangeConsulta} name="metodoPagoTDebito" type="number" className='table_input' /></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </ColumContainer>
                                    <ColumContainer m='12' x='12'>
                                        <Input valor={consulta.ingresoMensual} handleChange={handleChangeConsulta} name='ingresoMensual' type='number' label='Ingresos aproximados por mes en moneda nacional:' xclass='Formulario_input' disabled={false} />
                                    </ColumContainer>
                                </div>
                            </Formulario_seccion>
                        
                            <Formulario_seccion title='INGRESOS POR INTERVENCIONES EN HOSPITALES U OTROS'>
                                <div className='row'>
                                    <ColumContainer m='12' x='12'>
                                        En caso de realizar intervenciones, favor de señalar con una “X” el lugar donde presta el servicio, pudiendo ser mas de uno
                                    </ColumContainer>
                                    <ColumContainer m='12' x='12'>
                                        <div className="form-check">
                                            <input value={consulta.intervencionHospital} onChange={handleChangeConsulta} name="intervencionHospital" className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                                Hospital 
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input value={consulta.intervencionClinica} onChange={handleChangeConsulta} name="intervencionClinica" className="form-check-input" type="checkbox" id="flexCheckDefault2" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                Clínica
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input value={consulta.intervencionOtros} onChange={handleChangeConsulta} name="intervencionOtros" className="form-check-input" type="checkbox" id="flexCheckDefault3" />
                                            <label className="form-check-label" htmlFor="flexCheckDefault3">
                                                Otros
                                            </label>
                                        </div>
                                    </ColumContainer>
                                    <ColumContainer m='12' x='12'>
                                        <Input valor={consulta.ingresoMensualIntervenciones} handleChange={handleChangeConsulta} name='ingresoMensualIntervenciones' type='number' label='Ingresos aproximados por intervenciones al mes: ' xclass='Formulario_input' disabled={false} />
                                    </ColumContainer>
                                </div>
                            </Formulario_seccion>
                        
                            <Formulario_seccion title='RÉGIMEN FISCAL'>
                                <div className='row'>
                                    <ColumContainer m='12' x='12'>
                                        Favor de indicar con una “X” el Régimen Fiscal en el que tributa
                                    </ColumContainer>
                                    <ColumContainer m='12' x='12'>
                                        <div className="form-check">
                                            <input value="1" onChange={handleChangeDoctor} checked={doctor.idRegimenfiscal=="1"} name="idRegimenfiscal" id="idRegimenfiscal1" className="form-check-input" type="radio"/>
                                            <label className="form-check-label" htmlFor="idRegimenfiscal1">
                                                Régimen Fiscal Servicios Profesionales (Honorarios)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input value="2" onChange={handleChangeDoctor} checked={doctor.idRegimenfiscal=="2"} name="idRegimenfiscal" id="idRegimenfiscal2" className="form-check-input" type="radio"/>
                                            <label className="form-check-label" htmlFor="idRegimenfiscal2">
                                                Régimen Fiscal Régimen Simplificado de Confianza (RESICO)
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input value="3" onChange={handleChangeDoctor} checked={doctor.idRegimenfiscal=="3"} name="idRegimenfiscal" id="idRegimenfiscal3" className="form-check-input" type="radio"/>
                                            <label className="form-check-label" htmlFor="idRegimenfiscal3">
                                                Régimen Fiscal Asalariado
                                            </label>
                                        </div>
                                    </ColumContainer>
                                </div>
                            </Formulario_seccion>

                            <div className='button-submit'>
                                <Boton type="submit" clases="btn_principal" texto="Ingresar"> Enviar formulario</Boton>
                            </div>
                        </div>
                </form>
            </ColumContainer>
        </div>
    );
};

export default Formulario;