//https://react-bootstrap.github.io/components/modal/
import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';

const VentanaEmergente = (
    {   
        children, 
        title="", 
        show=false, 
        form=false,
        size='lg', 
        centered=false,
        
        btnShowAccion=true, 
        btnColorAccion='success', 
        btnNameAccion='Aceptar',
        handleClick,  
        btnColorClose='secondary', 
        btnNameClose='Cerrar',
        handleClose,  

        showFooter=true
    }) => {

    // const [show, setShow] = useState(false);

    // const handleClose = () => {
    //     setShow(false);
    // }

    // const handleShow = () =>{
    //     setShow(true);
    // } 

    const handleSubmit = (e) =>{
        e.preventDefault();
        handleClick();
    } 

    return (
        <>
            <Modal show={show} onHide={handleClose} size={size} centered={centered}>
                {
                    form ? 
                    <form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {children}
                        </Modal.Body>
                        {
                            showFooter &&
                            <Modal.Footer>
                                <Button variant={btnColorClose} onClick={handleClose}>
                                    {btnNameClose}
                                </Button>
                                {
                                    btnShowAccion
                                    ?<Button type="submit" variant={btnColorAccion}> {btnNameAccion} </Button>
                                    : ''
                                }
                            </Modal.Footer>
                        }
                    </form>
                    :
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {children}
                        </Modal.Body>
                        {
                            showFooter &&
                            <Modal.Footer>
                                <Button variant={btnColorClose} onClick={handleClose}>
                                    {btnNameClose}
                                </Button>
                                {
                                    btnShowAccion
                                    ?<Button variant={btnColorAccion} onClick={handleClick}> {btnNameAccion} </Button>
                                    : ''
                                }
                            </Modal.Footer>
                        }
                    </>
                }
            </Modal>
        </>
    );
};

export default VentanaEmergente;