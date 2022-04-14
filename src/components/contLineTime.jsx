import React, {useState, useEffect} from 'react';
import Itemlinetime from './itemlinetime';
import Fetch from '../assets/js/fetch';
import fechas from '../assets/js/fechas';

const constLineTime = ({item}) => {

    const [linetime, setLinetime] = useState({ data:[]});


    useEffect(async() => {
        await getStatus()
    }, [])


    const getStatus = () => {

        Fetch.GET({
            url: `estatusProspecto/${item.id}`
          })
        .then(data=>{
          debugger
            if(!data.error && data.status === 200){
                var b = data.body;
                b.estatus.forEach(x => {
                    let e = b.linetime.find(z => x.id === z.idEstatusRegistro);
                    if(e){ 
                        x.comentario = e.comentario
                        x.fecha = fechas.local(e.dateCreate, 6) 
                        x.idlineTime = e.id
                        x.idDoctor = e.idDoctor
                        x.activo = true
                    } else {
                        x.comentario = null
                        x.fecha = null
                        x.idlineTime = null
                        x.idDoctor = item.id
                        x.activo = false
                    };
                    return e;
                });
                setLinetime({data: b.estatus});
            } 
  
        }).catch((e) => {
            console.log(e);
        })
      }

    return (
        <div id={item.id} className="contlineTime" >
            {
                linetime.data.map((i) => {
                    return <Itemlinetime data={i}/>
                })
            }
        </div>
    );
};

export default constLineTime;