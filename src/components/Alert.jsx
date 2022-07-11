import React, { useState, useEffect } from 'react';
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
const Alert = ({children, color="success", visible=false}) => {
    return (
        visible &&
        <div className={`alert alert-${color}`}  role="alert">
            {children}
        </div>
    );
}
export default Alert;