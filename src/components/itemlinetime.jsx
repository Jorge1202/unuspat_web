import React, { useState } from 'react';
import Fetch from '../assets/js/fetch';
import './styles/itemlinetime.css'

const itemlinetime = ({data}) => { 
    const divStyle = {
        width: data.activo ? '100%' : '0%'
    };

    const [estado,setEstado] = useState({ done:true, success:false, mensaje:''});
    const [coment,setcomentario] = useState({ boton:!data.comentario, editar: false});
    const [txtComentario,setTxtComentario] = useState({ comentario:data.comentario ? data.comentario : ''});

    const handleChange = e => { 
        const {name,value} = e.target;
        setTxtComentario({...txtComentario,[name]:value}); 
    };

    function handleClick_add() {
        let com = {
            "boton": false,
            "editar": true
        }
        setcomentario(com)
    }

    function handleClick_edit() {
        let com = {
            "editar": true
        }
        setcomentario(com)
    }

    function handleClick_cancel() {
        document.getElementById(`comentari_${data.idlineTime}`).classList.remove('is-invalid');
        if(txtComentario.comentario.length !== 0){
            let com = {
                "editar": false
            }
            setcomentario(com)
        } else {
            let com = {
                "boton": true,
                "editar": false
            }
            setcomentario(com)
        }
    }
    
    function handleClick_send() {
        if(txtComentario.comentario.trim().length !== 0){
            let obj = {
                id: data.idlineTime,
                comentario: txtComentario.comentario,
            }
            let valores = {
                done: false,
            };
            setEstado(valores);

            let objFetch = {
                url: 'estatusProspecto',
                obj: obj
            }
            Fetch.PUT(objFetch)
            .then(data=>{
                if(!data.error && data.status === 200){
                    let valores = {
                        done: true,
                    };
                    setEstado(valores);
                    handleClick_cancel();
                } else {
                  
                }
            }).catch((error) => {
                console.warn(error);
            });
        } else {
            // document.getElementById(`comentari_${data.idlineTime}`).classList.toggle('is-invalid');
            document.getElementById(`comentari_${data.idlineTime}`).classList.add('is-invalid');
        }
    }

    return (
        <React.Fragment>   
            <div className="section">
                <div className="contline">
                    <div className="line">
                        <div className="progress ">
                            <div className="progress-bar bg-principal" role="progressbar" style={divStyle} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" ></div>
                        </div>
                    </div>
                    <div className="contIcon">
                        {
                            data.activo 
                            ?   <i className="bi-check-circle"></i>
                            :   <i className="bi-circle"></i>
                        }
                    </div>
                </div>
                <div className="dataline mt-2">
                    <div className="conData">
                        <div className="conData__info">
                            <div className="conData_div lh-1">{data.estatus}</div>
                            <div className="conData_div fw-bold clr-principal">{data.activo ? data.fecha : ''}</div>
                            {data.activo
                            ?   coment.boton
                                ?   <div className="conData_div"><button onClick={handleClick_add} disabled={!data.activo} type="button" className="btn btn-outline-secondary btn-sm">Agregar comentario</button></div>                          
                                : ''
                            : <div className="conData_div"><button disabled type="button" className="btn btn-outline-secondary btn-sm">Agregar comentario</button></div>
                            }
   
                        </div> 
                    </div>  
                    <div className="conData__comentario">
                            {
                                estado.done
                                ?   data.activo && !coment.boton
                                    ?  !coment.editar 
                                        ? <>
                                            <div className="contIcon__comentario iconEdit"><i onClick={handleClick_edit} className="bi-pencil-fill"></i></div>
                                            <div className="text-start">
                                                {txtComentario.comentario}
                                            </div>
                                        </>
                                        : <>
                                            <div className="contIntp__text">
                                                <form className="row g-3">
                                                    <div className="mb-3">
                                                        <textarea value={txtComentario.comentario} name="comentario" onChange={handleChange} className="form-control" id={`comentari_${data.idlineTime}`} rows="2" required></textarea>
                                                        <div className="contIcon__comentario">
                                                            <i onClick={handleClick_cancel} className="fz-icon mg-icon bi-x-circle-fill"></i> 
                                                            <i onClick={handleClick_send} className="fz-icon bi-cursor-fill"></i> 
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </>
                                    : ''
                                : <div>Cargando ...</div>
                            }
                            
                            {
                                
                            }
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default itemlinetime;