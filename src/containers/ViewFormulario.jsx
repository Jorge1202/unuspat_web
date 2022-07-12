import React, {useState, useEffect, useRef} from 'react';
import Fetch from '../assets/js/fetch';
import FormularioDoctor from '../components/FormularioDoctor';
import Boton from '../components/Boton';
import './styles/ViewFormulario.scss';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';


const ViewFormulario = ({idUser}) => {
    const [disable,setdisable] = useState(true);
    const [doctor,setdoctor] = useState({});
    const [consulta,setconsulta] = useState({});
    const [consultorio,setconsultorio] = useState({});
    const [usuario, setUser] = useState({nombre:''});

    const pdfExportComponent = useRef(null);
    const archivo = useRef(null);

    useEffect(() => {
        getDataFormulario();
    },[]);

    const getDataFormulario = async () => {
        await Fetch.GET({
            url: `user/doctores/getDataFormulario?id=${idUser}`,
        })
        .then(async data => {
            if(!data.error && data.status === 200){
                setUser(data.body.usuarios)
                setdoctor(data.body.doctor)
                setconsulta(data.body.consulta)
                setconsultorio(data.body.consultorio)
            }
        }).catch((error) => {
            console.warn(error);
        });
    }

    const exportPDF = () => {
        setdisable(false)
        let element = archivo.current;
        
         if(element !== null){
            savePDF(element, {
                scale:0.62,
                repeatHeaders: false,
                paperSize: 'letter',
                margin: '1.5cm',
                fileName: `Unuspat ${usuario.nombre} ${usuario.apellidoPaterno}`
            })
        }
        setdisable(true)
    }

    return (
        <>
            <div className='contBotonPDF'>
                <Boton type="submit" clases="btn_principal" texto="Ingresar" handleClick={()=>{exportPDF()}}> Descargar pdf</Boton>
            </div>
            <div className='contpdf'>
                <PDFExport ref={pdfExportComponent} author="Unuspat">
                    <div ref={archivo} className="pdf">
                        <FormularioDoctor 
                            disabled={disable}
                            usuario={usuario} 
                            doctor={doctor} 
                            consulta={consulta} 
                            consultorio={consultorio} 
                        />                
                    </div>
                </PDFExport>
            </div>
        </>
    );
};

export default ViewFormulario;