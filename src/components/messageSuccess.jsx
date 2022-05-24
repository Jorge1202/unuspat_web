import React from 'react';
import success from '../assets/media/img/success.svg';
import Warning from '../assets/media/img/Warning.svg';
import './styles/messageSuccess.scss'

const messageSuccess = ({children, status, message}) => {
    return (
        <div className='messageSuccess'>
             <section className='messageSuccess_seccion'>
                <p>{message}</p>
                <img src={status?success:Warning} alt={status?`success`:'Warning'}/>
                <div className='messageSuccess_text'>
                    {children}
                </div>
            </section>
        </div>
    );
};

export default messageSuccess;