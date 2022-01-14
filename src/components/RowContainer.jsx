import React from 'react';
import './styles/RowContainer.scss'

const RowContainer = ({children, nameSubtitle}) => {
    return (
        <section className='RowContainer'>
            <h5 className='border-bottom'>{nameSubtitle}</h5>
            <div className='row'>
                {children}
            </div>
        </section>
    );
};

export default RowContainer;