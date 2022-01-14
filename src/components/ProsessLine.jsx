import React from 'react';
import './styles/ProsessLine.scss'

const ProsessLine = ({status}) => {
    return (
        
        <div className='ProsessLine'>
            <div className='barProgress'>
                <div className="progress">
                    <div className={`progress-bar ${status>=1?'w-100':''}`} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div className='barProgress'>
                <div className="progress">
                    <div className={`progress-bar ${status>=2?'w-100':''}`} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div className='barProgress'>
                <div className="progress">
                    <div className={`progress-bar ${status>=3?'w-100':''}`} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div className='barProgress'>
                <div className="progress">
                    <div className={`progress-bar ${status>=4?'w-100':''}`} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
        </div>
    );
};

export default ProsessLine;