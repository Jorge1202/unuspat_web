import React from 'react';
import './styles/Input.scss'

const Input = ({textarea= false, name, handleChange, valor, type='text', label='', placeholder='',xclass='', show=true, disabled=false, required=false,}) => {
    return (
        <>
            <div className={`mb-3 ${xclass} ${show?'d-block':'d-none'}`} >
                <label htmlFor={name} className="form-label">
                    {required && label != '' &&<span className='requered'> *</span>} 
                    {label}
                </label>
                {
                    textarea ?
                    <textarea value={valor} type={type} name={name} onChange={(e)=>{handleChange(e)}} disabled={disabled} class="form-control" id={name} placeholder={placeholder} required={required} rows="3"></textarea>
                    :
                    <input value={valor} type={type} name={name} onChange={(e)=>{handleChange(e)}} disabled={disabled} className="form-control input" id={name} placeholder={placeholder} required={required}/>
                }

            </div>   
        </>


    );
};

export default Input;