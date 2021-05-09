import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Login = () => {
    const initialState = { email: '', password: '' };
    const [userData, setUserData] = useState(initialState);
    const { email, password } = userData;

    const handleChangeInput = e => {
        const {name, value} = e.target;
        setUserData({...userData, [name]:value})
    }

    return (
        <div className="auth_page">
            <form>
                <h3 className="text-uppercase">Đăng nhập</h3>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" onChange={handleChangeInput} value={email}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" onChange={handleChangeInput} value={password}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>   
            </form>
        </div>
    )
}

export default Login;