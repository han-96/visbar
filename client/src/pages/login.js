import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../redux/actions/authAction';
import { useDispatch } from 'react-redux';


const Login = () => {
    const initialState = { email: '', password: '' };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;

    const [typePass, setTypePass] = useState(false) 
    
    const dispatch = useDispatch();

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(login(userData));
    }

    return (
        <div className="auth_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center mb-4" >Đăng nhập</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email:</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={handleChangeInput} value={email}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu:</label>
                    <div className="pass">
                        <input type={ typePass ? "text": "password"} className="form-control" id="exampleInputPassword1" name="password" onChange={handleChangeInput} value={password}/>
                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                        </small>
                    </div>
                </div>

                <button type="submit" className="btn btn-dark w-100" disabled={email && password ? false : true}>Đăng nhập</button>

                <p className="my-2">
                    Bạn chưa có tài khoản? Bấm vào <Link to="/register" style={{color: "crimson"}}>đây</Link> để đăng ký.
                </p>   
            </form>
        </div>
    )
}

export default Login;