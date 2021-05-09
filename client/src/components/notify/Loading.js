import React from 'react';

const Loading = () => {
    
    return (
        <div className="position-fixed w-100 h-100 text-center loading"
        style={{top: 0, left: 0, zIndex: 500}}>
            <div className="loading"> <img src="images/loading-icon.gif" alt="Vui lòng đợi..."/> </div>
            <div className="loading" style={{width: "400px", background: "#fff"}}> <text x="5" y="47">Loading</text></div>
        </div>
    )
}

export default Loading