import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './Loading';
import Toast from './Toast';

const Notify = () => {
    const { notify } = useSelector(state => state);
    const dispatch = useDispatch()
    
    return (
        <div>
            {notify.loading && <Loading/>}

            {
                notify.error && 
                <Toast 
                    msg={{title:'Oop! Có lỗi rồi...', body: notify.error}} 
                    handleShow={() => dispatch({type: 'NOTIFY', payload: {}})} 
                    bgColor='#8E9B97'
                />
            }

            {
                notify.success && 
                <Toast 
                    msg={{title:'Welcome back!', body: notify.success}} 
                    handleShow={() => dispatch({type: 'NOTIFY', payload: {}})}  
                    bgColor='#8E9B97'
                />
            }

        </div>
    )
}

export default Notify