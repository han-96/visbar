const Users = require('../models/userModel');
const bcrypt = require('bcrypt');
const { response } = require('express');
const jwt = require('jsonwebtoken');

const authCtrl = {
    register: async (req, res) => {
        try {
            const { fullname, username, email, password, gender } = req.body;
            let newUserName = username.toLowerCase().replace(/ /g, '');

            const user_name = await Users.findOne({username: newUserName});
            if(user_name) return res.status(400).json({msg: "Tên người dùng đã tồn tại. Vui lòng chọn tên khác"});

            const user_email = await Users.findOne({email});
            if(user_email) return res.status(400).json({msg: "Địa chỉ email này đã dùng để đăng ký tài khoản khác. Vui lòng chọn đăng nhập nếu bạn đã có tài khoản"});
            
            if(password.length < 6) return res.status(400).json({msg: "Mật khẩu cần chứa ít nhất 6 ký tự"});
            
            const passwordHash = await bcrypt.hash(password,12);
            
            const newUser = new Users({
                fullname, username: newUserName, email, password: passwordHash, gender
            });
            
            const access_token = createAcessToken({id: newUser._id});
            const refresh_token = createRefreshToken({id: newUser._id});
            
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7*24*60*60*1000, //7 days
            });

            await newUser.save()

            res.json({
                msg: "Đăng ký thành công! Chào mừng bạn đã tham gia Visbar",
                access_token,
                user: {
                    ...newUser._doc,
                    password: '' 
                }
            })

            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async (req, res) => {
        try {

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAcessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}



module.exports = authCtrl

