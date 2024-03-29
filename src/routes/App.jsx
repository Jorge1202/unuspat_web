import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from '../containers/Layout';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Login from '../pages/Login';
import Perfil from '../pages/Perfil';
import FormHH from '../pages/FormHH';
import FormAdmin from '../pages/FormAdmin';
import FormDoctor from '../pages/FormDoctor';
import ListAdmin from '../pages/ListAdmin';
import ListasHH from '../pages/ListasHH';
import ListDoctor from '../pages/ListDoctor';
import Agenda from '../pages/Agenda';
import AgendaPublic from '../pages/AgendaPublic';
import Recovery from '../pages/Recovery';
import Code from '../pages/Code';
import FormularioDoctor from '../pages/FormularioDoctor';
import Dashboard from '../pages/Doctor/Dashboard';
import Colaboradores from '../pages/Doctor/Colaboradores';
import FormDataPersonal from '../pages/Doctor/FormDataPersonal';
import Proveedores from '../pages/Doctor/Proveedores';
import FormProveedores from '../pages/Doctor/FormProveedores';
import Reportes from '../pages/Doctor/Reportes';
import Ingresos from '../pages/Doctor/Ingresos';
import Egresos from '../pages/Doctor/Egresos';
import Catalogos from '../pages/Doctor/Catalogos';
import AgendaDoc from '../pages/Doctor/Agenda';

import '../assets/css/index.css'
import '../assets/css/Bootstrap.scss'
import '../assets/css/Generales.scss'
 
const App = () => {
    return (
        <HashRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/recovery" component={Recovery} />
                    <Route exact path="/code" component={Code} />
                    <Route exact path="/agenda" component={AgendaPublic} />

                    <Route exact path="/perfil" component={Perfil} />
                    <Route exact path="/headhunters" component={ListasHH} />
                    <Route exact path="/formHH" component={FormHH} />
                    <Route exact path="/formAdmin" component={FormAdmin} />
                    <Route exact path="/administradores" component={ListAdmin} />

                    <Route exact path="/doctores" component={ListDoctor} />
                    <Route exact path="/agenda-hh" component={Agenda} />
                    <Route exact path="/formDoc" component={FormDoctor} />
                    <Route exact path="/Formulario" component={FormularioDoctor} />
                    
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/colaboradores" component={Colaboradores} />
                    <Route exact path="/colaboradores-registro" component={FormDataPersonal} />
                    <Route exact path="/proveedores" component={Proveedores} />
                    <Route exact path="/proveedores-registro" component={FormProveedores} />
                    <Route exact path="/reportes" component={Reportes} />
                    <Route exact path="/ingresos" component={Ingresos} />
                    <Route exact path="/egresos" component={Egresos} />
                    <Route exact path="/calendario" component={AgendaDoc} />
                    <Route exact path="/catalogos" component={Catalogos} />
                    <Route exact path="/catalogos-puestos" component={Catalogos} />
                    <Route exact path="/catalogos-tipoproveedor" component={Catalogos} />

                    <Route path="*" component={NotFound} />
                </Switch>
            </Layout>
        </HashRouter>
    );
}
export default App;


