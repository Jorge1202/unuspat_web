import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import './styles/Alert.scss';

/**
 * primary
 * secondary 
 * success 
 * danger
 * warning
 * info 
 * light
 * dark 
 */

const AlertExample = ({children, color="success", visible=false}) => {
    const [show, setShow] = useState(false);
    useEffect(()=>{
        setShow(visible)
    });
        
    return (
        <Alert show={show} variant={color}>
            {children}
        </Alert>
    );
}

export default AlertExample;