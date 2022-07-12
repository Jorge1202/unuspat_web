import React, {useEffect, useState} from 'react';
import Fetch from '../assets/js/fetch';

const FormDireccion = ({registro, handleChange}) => {
    const [listaEstados, setListaEstados] = useState([]);
    const [listaMunicipios, setListaMunicipios] = useState([]);
    const [listaColonias, setListaColonias] = useState([]);

    useEffect(async () => {
        // if(Object.keys(registro).length !== 0){
        //     setDataRegistro(registro);
        //     handleChangeEstados(registro.estado);
        // }
    });
    useEffect(async () => {
        await getEstados();
    },[]);

    const handleBlur = e => {
        let cp = e.target;
        console.log(cp);
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
                    handleChange({...registro, 
                        [name]: id, 
                        municipio:data.body[0].id,
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
                        handleChange({...registro,
                            [name]: id,
                            colonia: data.body[0].id,
                            codigo_postal: _data.codigo_postal,
                            ciudad: _data.ciudad
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
            handleChange({...registro,
                [name]: value,
                codigo_postal: data.codigo_postal,
                ciudad: data.ciudad
            }, true)
        }
    };
    
    return (
        <React.Fragment>

            <div className="row mb-3">
                <label htmlFor="estado" className="col-md-4 col-lg-3 col-form-label">Estado *</label>
                <div className="col-md-8 col-lg-9">
                <select value={registro.estado} name="estado" onChange={(e) => handleChangeEstados(e)} className="form-select" aria-label="Default select example" required>
                    <option value="DEFAULT" disabled>Estados</option>
                    {
                        listaEstados.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                    }
                </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="municipio" className="col-md-4 col-lg-3 col-form-label">Municipio *</label>
                <div className="col-md-8 col-lg-9">
                <select value={registro.municipio} name="municipio" onChange={(e) => {handleChangeMunicipios(e)}} className="form-select" aria-label="Default select example">
                    <option value="DEFAULT" disabled>Municipios</option>
                    {
                        listaMunicipios.length == 0 ? <option value="DEFAULT" disabled>Seleccciona un estado</option>
                        : listaMunicipios.map((item) => <option key={item.id} value={item.id}>{item.nombre}</option> )
                    }
                </select>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="colonia" className="col-md-4 col-lg-3 col-form-label">Colonia *</label>
                <div className="col-md-8 col-lg-9">
                <select value={registro.colonia} name="colonia" onChange={(e) => {handleChangeColonias(e)}}  className="form-select" aria-label="Default select example">
                    <option value="DEFAULT" disabled>Colonias</option>
                    {
                        listaColonias.length == 0 ? <option value="DEFAULT" disabled>Selecciona un municipio</option>
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
                <input value={registro.ciudad} name="ciudad" onChange={(e)=> {handleChange(e)}} placeholder={registro.ciudad == '' ? 'No aplica' : ''} type="text" className="form-control" id="ciudad" disabled/>
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="calle" className="col-md-4 col-lg-3 col-form-label">Calle *</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.calle} name="calle" onChange={(e)=> {handleChange(e)}} type="text" className="form-control" id="calle" required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="no_ext" className="col-md-4 col-lg-3 col-form-label">No. exterior *</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.no_ext} name="no_ext" onChange={(e)=> {handleChange(e)}} type="text" className="form-control" id="no_ext" required />
                </div>
            </div>
            <div className="row mb-3">
                <label htmlFor="no_int" className="col-md-4 col-lg-3 col-form-label">No. interior</label>
                <div className="col-md-8 col-lg-9">
                <input value={registro.no_int} name="no_int" onChange={(e)=> {handleChange(e)}} type="text" className="form-control" id="no_int" />
                </div>
            </div>
        </React.Fragment>
    );
};

export default FormDireccion;