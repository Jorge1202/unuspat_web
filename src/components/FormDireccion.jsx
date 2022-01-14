import React, {useEffect, useState, useRef} from 'react';

import Fetch from '../assets/js/fetch';

const ESTADO = 1; 
const MUNICIPIO = 1001; 

const FormDireccion = (register) => {
    const [listaEstados, setListaEstados] = useState([]);
    const [listaMunicipios, setListaMunicipios] = useState([]);
    const [listaColonias, setListaColonias] = useState([]);
    const [registro, setRegistro] = useState(register);

    useEffect(async () => {
        await getEstados();
        await handleChangeMunicipios(ESTADO);
        await handleChangeColonias(MUNICIPIO);
    },[]);

    const handleChange = e => {
        const { name, value } = e.target;
        setAdd({ ...registro, [name]: value });
    };

    const handleBlur = e => {
        let cp = e.target;
        console.log(cp);
    };

    const getEstados = () => {
        console.log('Estados');

        Fetch.GET({ url: 'ema/estados' })
        .then(data=>{
            if(!data.error && data.status === 200){
                console.log(data);
                setListaEstados(data.body);
            } 
        }).catch((e) => {
            setEstado({
                done: true,
            })
        })
    };

    const handleChangeMunicipios = (e) => {
        // console.log(e.target.value);
        let id = e.target ? e.target.value : e;

        Fetch.GET({ url: `ema/municipios?id=${id}` })
        .then(async data=>{
            if(!data.error && data.status === 200){
                console.log(data);
                setListaMunicipios(data.body)
                await handleChangeColonias(data.body[0].id);
            } 
        }).catch((e) => {
            console.log(e);
        })
        
    };

    const handleChangeColonias = e => {
        let id = e.target ? e.target.value : e;

        Fetch.GET({ url: `ema/colonias?id=${id}` })
        .then(data=>{
            if(!data.error && data.status === 200){
                console.log(data);
                setListaColonias(data.body);
                setRegistro({
                    codigo_postal: data.body[0].codigo_postal,
                    ciudad: data.body[0].ciudad
                });
            } 
        }).catch((e) => {
            console.log(e);
        })
      
    };

    return (
        <React.Fragment>
            
            <div className="row mb-3">
                <label htmlFor="estado" className="col-md-4 col-lg-3 col-form-label">Estado</label>
                <div className="col-md-8 col-lg-9">
                <select value={registro.estado} name="estado" onChange={(e) => handleChangeMunicipios(e)} className="form-select" aria-label="Default select example">
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
                <select value={registro.municipio} name="municipio" onChange={(e) => {handleChangeColonias(e)}} className="form-select" aria-label="Default select example">               
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
                <select value={registro.colonia} name="colonia" className="form-select" aria-label="Default select example">
                    {
                        listaMunicipios.length == 0 ? <option value="DEFAULT" disabled>Selecciona un municipio</option>
                        : listaColonias.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                    }
                </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="codigoPostal" className="col-md-4 col-lg-3 col-form-label">Código postal</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.codigo_postal} name="codigoPostal" onBlur={handleBlur} type="text" className="form-control" id="codigoPostal" disabled />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="ciudad" className="col-md-4 col-lg-3 col-form-label">Ciudad</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.ciudad} name="ciudad" onChange={handleChange} placeholder={registro.ciudad == '' ? 'No aplica' : ''} type="text" className="form-control" id="ciudad" disabled/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="calle" className="col-md-4 col-lg-3 col-form-label">Calle</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.calle} name="calle" onChange={handleChange} type="text" className="form-control" id="calle" />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="no_ext" className="col-md-4 col-lg-3 col-form-label">No. exterior</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.no_ext} name="no_ext" onChange={handleChange} type="text" className="form-control" id="no_ext" />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="no_int" className="col-md-4 col-lg-3 col-form-label">No. interior</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.no_int} name="no_int" onChange={handleChange} type="text" className="form-control" id="no_int" />
                </div>
            </div>
        </React.Fragment>
    );
};

export default FormDireccion;