import React from 'react';
import Conteiner from '../containers/Container'
import List_Admin from '../containers/ListAdmin'

const ListAdmin = () => {
    return (
        <Conteiner>
            <List_Admin/>

            <div className="col-sm-10">
      <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
    </div>
        </Conteiner>
    );
};

export default ListAdmin;