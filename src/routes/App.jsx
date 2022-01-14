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
                    

                    <Route path="*" component={NotFound} />
                </Switch>
            </Layout>
        </HashRouter>
    );
}
export default App;


