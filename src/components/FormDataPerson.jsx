import React from 'react';

const FormDataPerson = ({user, registro, handleChange}) => {
    return (
        <React.Fragment>
            <div className="row mb-3">
                <label htmlFor="nombre" className="col-md-4 col-lg-3 col-form-label">Nombre *</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.nombre} name="nombre" onChange={(e) => {handleChange(e)}} type="text" className="form-control" id="nombre" required/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="apellidoPaterno" className="col-md-4 col-lg-3 col-form-label">Apellido paterno *</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.apellidoPaterno} name="apellidoPaterno" onChange={(e) => {handleChange(e)}} type="text" className="form-control" id="apellidoPaterno" required/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="apellidoMaterno" className="col-md-4 col-lg-3 col-form-label">Apellido materno</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.apellidoMaterno} name="apellidoMaterno" onChange={(e) => {handleChange(e)}} type="text" className="form-control" id="apellidoMaterno" />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="telefono" className="col-md-4 col-lg-3 col-form-label">Teléfono *</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.telefono} name="telefono" onChange={(e) => {handleChange(e)}} type="phone" className="form-control" id="telefono" required/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="email" className="col-md-4 col-lg-3 col-form-label">Correo electrónico *</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.email} name="email" onChange={(e) => {handleChange(e)}} type="email" className="form-control" id="email" required/>
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="genero" className="col-md-4 col-lg-3 col-form-label">Genero</label>
                <div className="col-md-8 col-lg-9">
                    <div className="form-check">
                        <input value="0" checked={registro.genero=="0"} name="genero" onChange={(e) => {handleChange(e)}} className="form-check-input" type="radio" id="flexRadioDefault1" />
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Mujer
                        </label>
                    </div>
                    <div className="form-check">
                        <input value="1" checked={registro.genero=="1"} name="genero"  onChange={(e) => {handleChange(e)}} className="form-check-input" type="radio" id="flexRadioDefault2" />
                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                            Hombre
                        </label>
                    </div>
                </div>
            </div>
            {user == "1" &&
                <div className="row mb-3">
                    <label htmlFor="idTipoUsuario" className="col-md-4 col-lg-3 col-form-label">Tipo Administrador *</label>
                    <div className="col-md-8 col-lg-9">
                        <select value={registro.idTipoUsuario || '1'} name="idTipoUsuario" onChange={(e) => {handleChange(e)}} className="form-select" aria-label="Default select example" required>
                        <option value="2">Administrador</option>
                        <option value="1">Administrador maestro</option>
                        </select>
                    </div>
                </div>
            }
        </React.Fragment>
    );
};

export default FormDataPerson;