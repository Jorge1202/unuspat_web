import React from 'react';
import './styles/Table.css'

const table = ({children, listThead, clases=''}) => {
    return (
        <div className={`listTable table-wrapper ${clases}`}>
            <table className="table table-striped ">
                <thead>
                    <tr>
                        {
                            listThead.map((item, i) => <th key={i} scope="col">{item}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    );
};

export default table;