import React from 'react';
import ColumContainer from '../components/ColumContainer';
import Input from '../components/Input';
import Formulario_seccion from '../components/Formulario_seccion';
import './styles/Formulario.scss';
import logo from '@img/logo/logo-color.png';

const Formulario = () => {
    return (
        <div className='Formulario row'>
            <ColumContainer m='10' x='7' x_class='Formulario_colum'>
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
                                <Input name='nombres' label='(Apellido paterno, Apellido materno, Nombre o nombres )' xclass='Formulario_input' disabled={true} />
                            </ColumContainer>
                            <ColumContainer m='6' x='6'>
                                <label><strong>Cédula Profesional:</strong></label> <br />
                                <Input name='nombres' label='(Dato conformado por 8 caracteres numéricos)' placeholder='Escribe aqui' xclass='Formulario_input' disabled={false} />
                            </ColumContainer>
                            <ColumContainer m='6' x='6'>
                                <label><strong>Cédula de Especialidad de Médica:</strong></label> <br />
                                <Input name='nombres' label='(Dato conformado por 13 caracteres alfanuméricos)' placeholder='Escribe aqui'  xclass='Formulario_input' disabled={false} />
                            </ColumContainer>
                            <ColumContainer m='6' x='6'>
                                <label><strong>Tiempo ejerciendo la profesión:</strong></label> <br />
                                <Input name='nombres' label='(En años)' xclass='Formulario_input' placeholder='Escribe aqui'  disabled={false} />
                            </ColumContainer>
                            <ColumContainer m='6' x='6'>
                                <label><strong>Tiempo ejerciendo la especialidad:</strong></label> <br />
                                <Input name='nombres' label='(En años)' xclass='Formulario_input' placeholder='Escribe aqui'  disabled={false} />
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
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="typeConsultorio" id="typeConsultorio1"/>
                                            <label class="form-check-label" for="typeConsultorio1">
                                            Consultorio de Medicina General o Familiar
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="typeConsultorio" id="typeConsultorio2"/>
                                            <label class="form-check-label" for="typeConsultorio2">
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
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="aplicaConsultorio" id="aplicaConsultorio1"/>
                                                <label class="form-check-label" for="aplicaConsultorio1">
                                                Consultorio Propio
                                                </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="aplicaConsultorio" id="aplicaConsultorio2"/>
                                                <label class="form-check-label" for="aplicaConsultorio2">
                                                Consultorio Rentado
                                                </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="aplicaConsultorio" id="aplicaConsultorio3"/>
                                                <label class="form-check-label" for="aplicaConsultorio3">
                                                Consultorio Compartido
                                                </label>
                                        </div>
                                        <div class="form-check">
                                            <input class="form-check-input" type="radio" name="aplicaConsultorio" id="aplicaConsultorio4"/>
                                                <label class="form-check-label" for="aplicaConsultorio4">
                                                Consultorio Ligado a un Servicio Hospitalario
                                                </label>
                                        </div>
                                    </ColumContainer>
                                </div>
                            </ColumContainer>
                            <ColumContainer m='12' x='12' x_class='f_line'>
                                <label><strong>Domicilio del Consultorio:</strong></label> <br />
                                <Input name='nombres' label='(Calle, Avenida, Número Exterior o Interior, Colonia, Municipio, Entidad Federativa y Código Postal)' placeholder='Escribe aqui'  xclass='Formulario_input' disabled={false} />
                            </ColumContainer>
                        </div>
                    </Formulario_seccion>
                    <Formulario_seccion title='PERMISOS'>
                        <div className='row'>
                            <ColumContainer m='12' x='12'>
                                Marque  los permisos vigentes con los que cuenta el consultorio:
                            </ColumContainer>
                            <ColumContainer m='12' x='12'>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Aviso de Funcionamiento 
                                        </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Aviso de Responsable Sanitario
                                        </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            Licencia de Uso de Suelo
                                        </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                        <label class="form-check-label" for="flexCheckDefault">
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
                                <table class="table">
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
                                            <td><input type="text" className='table_input'/></td>
                                            <td><input type="text" className='table_input'/></td>
                                            <td><input type="text" className='table_input'/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Personal de Enfermería</th>
                                            <td><input type="text" className='table_input'/></td>
                                            <td><input type="text" className='table_input'/></td>
                                            <td><input type="text" className='table_input'/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Personal Administrativo</th>
                                            <td><input type="text" className='table_input'/></td>
                                            <td><input type="text" className='table_input'/></td>
                                            <td><input type="text" className='table_input'/></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Personal de Limpieza </th>
                                            <td><input type="text" className='table_input'/></td>
                                            <td><input type="text" className='table_input'/></td>
                                            <td><input type="text" className='table_input'/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ColumContainer>
                        </div>
                    </Formulario_seccion>
                    <Formulario_seccion title='CONSULTA'>
                        <div className='row'>
                            <ColumContainer m='6' x='6'>
                                <Input name='nombres' label='Costo de la Consulta:' xclass='Formulario_input' disabled={false} />
                            </ColumContainer>
                            <ColumContainer m='6' x='6'>
                                <Input name='nombres' label='Cuantas Consultas realiza aproximadamente al día:' xclass='Formulario_input' disabled={false} />
                            </ColumContainer>
                            <ColumContainer m='12' x='12'>
                                <Input name='nombres' label='Días que labora en el Consultorio: ' xclass='Formulario_input' disabled={false} />
                            </ColumContainer>
                        </div>
                    </Formulario_seccion>
                    <Formulario_seccion title='MÉTODO DE PAGO POR LA CONSULTA'>
                        <div className='row'>
                            <ColumContainer m='12' x='12'>
                                Señalar el porcentaje aproximado de ingresos mensuales por cada método de pago
                            </ColumContainer>
                            <ColumContainer m='12' x='12'>
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <th scope="row">Efectivo  </th>
                                            <td><input type="text" className='table_input' /></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Transferencia</th>
                                            <td><input type="text" className='table_input' /></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Cheque</th>
                                            <td><input type="text" className='table_input' /></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tarjeta de Crédito </th>
                                            <td><input type="text" className='table_input' /></td>
                                        </tr>
                                        <tr>
                                            <th scope="row">Tarjeta de Débito  </th>
                                            <td><input type="text" className='table_input' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </ColumContainer>
                            <ColumContainer m='12' x='12'>
                                <Input name='nombres' label='Ingresos aproximados por mes en moneda nacional:' xclass='Formulario_input' disabled={false} />
                            </ColumContainer>
                        </div>
                    </Formulario_seccion>
                    <Formulario_seccion title='INGRESOS POR INTERVENCIONES EN HOSPITALES U OTROS'>
                        <div className='row'>
                            <ColumContainer m='12' x='12'>
                                En caso de realizar intervenciones, favor de señalar con una “X” el lugar donde presta el servicio, pudiendo ser mas de uno
                            </ColumContainer>
                            <ColumContainer m='12' x='12'>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Hospital 
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Clínica
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Otros
                                    </label>
                                </div>
                            </ColumContainer>
                            <ColumContainer m='12' x='12'>
                                <Input name='nombres' label='Ingresos aproximados por intervenciones al mes: ' xclass='Formulario_input' disabled={false} />
                            </ColumContainer>
                        </div>
                    </Formulario_seccion>
                    <Formulario_seccion title='RÉGIMEN FISCAL'>
                        <div className='row'>
                            <ColumContainer m='12' x='12'>
                                Favor de indicar con una “X” el Régimen Fiscal en el que tributa
                            </ColumContainer>
                            <ColumContainer m='12' x='12'>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="regimenFiscal" id="regimenFiscal1" />
                                    <label class="form-check-label" for="regimenFiscal1">
                                        Régimen Fiscal Servicios Profesionales (Honorarios)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="regimenFiscal" id="regimenFiscal2" />
                                    <label class="form-check-label" for="regimenFiscal2">
                                        Régimen Fiscal Régimen Simplificado de Confianza (RESICO)
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="regimenFiscal" id="regimenFiscal3" />
                                    <label class="form-check-label" for="regimenFiscal3">
                                        Régimen Fiscal Asalariado
                                    </label>
                                </div>
                            </ColumContainer>
                        </div>
                    </Formulario_seccion>
                </div>
            </ColumContainer>
        </div>
    );
};

export default Formulario;