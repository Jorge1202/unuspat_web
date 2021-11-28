import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')
// import Moment from 'react-moment';
/*
    // Hora mundial a local y local a munial
    const fecha = new Date('2021-09-08T03:26:00Z'); 
    // mostrará la fecha en la zona horaria del cliente
    console.log(fecha.toString());
    // mostrará la fecha en la zona horaria UTC (MUNDIAL)
    console.log(fecha.toUTCString());
*/

const fechas = {
    moment: (date = new Date(), tipo = 0, format='') => {
        if(tipo === 0) return moment(date).format(format);   // 2021-10-17T05:02:35.806Z default
        else if(tipo === 1) return moment(date).format('LT');   // 3:03 PM
        else if(tipo === 2) return moment(date).format('LTS');  // 3:03:47 PM
        else if(tipo === 4) return moment(date).format('L');    // 10/01/2021
        else if(tipo === 5) return moment(date).format('l');    // 10/1/2021
        else if(tipo === 6) return moment(date).format('LL');   // October 1, 2021
        else if(tipo === 7) return moment(date).format('ll');   // Oct 1, 2021
        else if(tipo === 8) return moment(date).format('LLL');  // October 1, 2021 3:03 PM
        else if(tipo === 9) return moment(date).format('lll');  // Oct 1, 2021 3:03 PM
        else if(tipo === 10) return moment(date).format('LLLL'); // Friday, October 1, 2021 3:03 PM
        else if(tipo === 11) return moment(date).format('llll');  
        else if(tipo === 12) return moment(date).isoWeekday();  
    },

    operaciones: (objetofecha, op='add') => {
        let fecha_op = {
            date : objetofecha.date ? objetofecha.date : new Date(),
            cantidad: objetofecha.cantidad ? objetofecha.cantidad : 1,
            tipo: objetofecha.tipo ? objetofecha.tipo : 'd'
        }
        //#region 
            // años (y): años
            // cuartos (Q): cuarto
            // meses (M): mes
            // semanas (w): semanas
            // días (d): día
            // horas (h): hora
            // minutos (m): minutos
            // segundos (s): segundos
            // milisegundos (ms): milisegundos
        //#endregion 
        console.log(fecha_op);
        // var time = moment.duration("00:03:15");
        // var date = moment("2014-06-07 09:22:06");
        // date.subtract(time);
       
        if(op === 'add') {
            let fech = moment(fecha_op.date).add(fecha_op.cantidad, fecha_op.tipo)
            return fech 
        } else  if(op === 'delete'){
            let fech =  moment(fecha_op.date).subtract(fecha_op.cantidad, fecha_op.tipo);
            return fech._d;
        }
    },

    fechaApi: (date) => {
        const start = moment(date).format(); 
        return start;  
    },
    local: (date, tipo=8) => {
        //Conversión Mundial - Local
        let fecha =  _hora_mundialLocal_master(date, tipo, '')
        return fecha;
    },
    mundial: (date) => {
        //Conversión Local - Mundial
        let fecha =  _hora_localMundial_master(date, 0, 'YYYY/MM/D hh:mm:ss')
        return fecha;
    }
}

function _hora_mundialLocal_master(horaMuncial, tipo = 6, format) {
    let l = new Date(new Date(horaMuncial) - (new Date().getTimezoneOffset() * 60 * 1000));
    return fechas.moment(l, tipo, format);
}   
function _hora_localMundial_master(horaLocal, tipo = 6, format) {
    let l = new Date(new Date(horaLocal).getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
    return fechas.moment(l, tipo, format);
}


export default fechas;
