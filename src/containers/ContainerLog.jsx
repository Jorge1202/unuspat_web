import React from 'react';
import './styles/ContainerLog.css'

const ContainerLog = ({title, children}) => {
    return (
        <div className="ContainerLog">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-4 imgLogin"></div>
                        <div className="col-md-12 col-lg-8 form">
                            <div className="form__inputs">
                                <div className="form__inputs-input">
                                    <div className="title">{title}</div>
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContainerLog;