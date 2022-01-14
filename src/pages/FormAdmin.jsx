import React from 'react';
import Conteiner from '../containers/Container'
import Form_Admin from '../containers/FormAdmin';

const FormAdmin = () => {
    return (
        <Conteiner>
            <Form_Admin title="Agregar administrador"/>
        </Conteiner>
    );
};

export default FormAdmin;