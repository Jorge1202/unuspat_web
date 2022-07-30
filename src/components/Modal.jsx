//https://react-bootstrap.github.io/components/modal/
import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';

const VentanaEmergente = ({children, handleClick, title, nameBtn, size='lg', namebtnSave='Aceptar'}) => {

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () =>{
        setShow(true);
    } 

    const handleAction = async () =>{
        await handleClick();
        setShow(false);
    } 

    return (
        <>
            <div  onClick={handleShow} >{nameBtn}</div>
            {/* <Boton handleClick={handleShow} clases="btn-link btn-sm">{nameBtn}</Boton> */}
            {/* <Button variant="primary" onClick={handleShow} size="sm">
            {nameBtn}
            </Button> */}

            <Modal show={show}  onHide={handleClose} size={size} aria-labelledby="example-modal-sizes-title-lg" centered={size=='md'}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    {
                        size == 'md'
                        ?<Button variant={title=='Eliminar' ? 'danger' : title=='Activar'?'success':''} onClick={handleAction}> {namebtnSave} </Button>
                        : ''
                    }
                    
                </Modal.Footer>
                    {/* <Button variant="primary" onClick={handleClose}> */}
            </Modal>
        </>
    );
};

export default VentanaEmergente;