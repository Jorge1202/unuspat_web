import React, { useState, useEffect } from 'react';

const AgendaPublica = () => {
    const [idUser, setUser] = useState('home');
    useEffect(() => {
        setUser(location.hash.split('=')[1])
    },[])

    /**
     * Validar si el id usuario es correcta sino enviarlo a notFound
     * Validar que el estatus de estatusprospecto sea 1 sino (enviar un mensaje que ya ha sido generado su llamada)
     * Mostrar formulario para agendar 
     * Al agendar se le enviara un correo al HeadHunter y al medico de su fecha y hora de la reunion
     * se insertará el registro en estatusProspecto con estatusRegistro 2
     */

    return (
        <div>
            Este es una prueba {idUser}
        </div>
    );
};

export default AgendaPublica;