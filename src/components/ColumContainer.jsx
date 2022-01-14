import React from 'react';

const ColumContainer = ({children, s="12", m="6", x="4", x_class=""}) => {
    return (
        <div className={`ColumContainer col-xs-${s} col-sm-${s} col-md-${m} col-lg-${m} col-xl-${x} col-xxl-${x} ${x_class}`}>
            {children}
        </div>
    );
};

export default ColumContainer;