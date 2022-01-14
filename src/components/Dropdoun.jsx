import React from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './styles/Dropdown.css'

const Dropdoun = ({handleClick, itemData, ItemDropdoun}) => {
    return (
        <>
            <DropdownButton id="dropdown-basic-button" title="">
                {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item> */}
                {
                    ItemDropdoun.map(item => 
                        item == 'Activar' 
                        ? <Dropdown.Item key={item} onClick={handleClick} href={`/#/doctores?${item}/account=${itemData.id}`} disabled={itemData.Estado!=4}>{item}</Dropdown.Item> 
                        : <Dropdown.Item key={item} onClick={handleClick} href={`/#/doctores?${item}/account=${itemData.id}`}>{item}</Dropdown.Item>
                    )
                }
            </DropdownButton>
        </>
    );
};

export default Dropdoun;