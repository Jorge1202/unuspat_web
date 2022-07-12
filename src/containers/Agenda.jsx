import React,{useState, useEffect} from 'react';
import moment from 'moment';
import Contenedor from '../components/Contenedor';
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

import Fetch from '../assets/js/fetch';
import './styles/Agenda.css';
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/0.19.38/system.js"></script>

let date = moment().subtract(31, 'days');;
const AgendaComponent = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        handleClick();
    },[]);

    const handleClick = () => {
        Fetch.GET({
            url: `agenda/data`,
        })
        .then(async data => {
            if(!data.error && data.status === 200){
                setData(data.body);      
            }else{

            }
        }).catch((error) => {
            console.warn(error);
        });
    }

    return (
        <Contenedor>
            <ScheduleComponent height='550px'
                currentView="Week"
                readonly={true}
                minDate={date}
                selectedDate={new Date()}
                eventSettings={{
                    dataSource: data,
                    fields: {
                        id: 'TravelId',
                        subject: { name: 'TravelSummary', title: 'Summary', default: '' },
                        location: { name: 'Source', default: 'ES' },
                        description: { name: 'Comments' },
                        startTime: { name: 'DepartureTime' },
                        endTime: { name: 'ArrivalTime' }
                    }
                }
                }>
                <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
            </ScheduleComponent>
        </Contenedor>
    );
};

export default AgendaComponent;
