import React from 'react';

const Toast = ({msg, handleShow, bgColor}) => {
    
    return (
        <div className={`toast show position-fixed ${bgColor}`} style={{top: '5px', right: '5px',minWidth: '200px', zIndex: 50}}>
            <div className={`toast-header ${bgColor}`} style={{display: "flex", justifyContent: "space-between"}}>
                <div><strong className="ml-2" style={{color: 'black'}}>{msg.title}</strong></div>
                <button className="mr-2 mb-1 close" data-dismiss="toast" style={{outline: 'none', float: "right"}} onClick={handleShow}>&times;</button>
            </div>
            <div className="toast-body" style={{color: 'black'}}>
                {msg.body}
            </div>
        </div>
    )
}

export default Toast