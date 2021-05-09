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
            
            const access_token = createAccessToken({id: newUser._id});
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
            const { email, password } = req.body;

            const user = await Users.findOne({email}).populate("followers following", "-password");

            if (!user) return res.status(400).json({msg: "Địa chỉ email này chưa được đăng ký!"})

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({msg: "Mật khẩu không chính xác!"})

            const access_token = createAccessToken({id: user._id});
            const refresh_token = createRefreshToken({id: user._id});
            
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/api/refresh_token',
                maxAge: 7*24*60*60*1000, //7 days
            });

            res.json({
                msg: "Đăng nhập thành công! Welcome back!",
                access_token,
                user: {
                    ...user._doc,
                    password: '' 
                }
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: './api.refresh_token'});
            return res.json({msg: "Bạn vừa đăng xuất khỏi Visbar. Hãy quay lại sớm nhé!"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    generateAccessToken: async (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Hãy đăng nhập!"});
            
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, async(err, result) => {
                if (err) return res.status(400).json({msg: "Hãy đăng nhập!"})
                
                const user = await Users.findById(result.id).select('-password').populate('followers following', '-password');

                if (!user) return res.status(400).json({msg: "Oop! Tài khoản này không tồn tại trong hệ thống"});

                const access_token = createAccessToken({id: result.id});

                res.json({
                    access_token,
                    user
                });
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}



module.exports = authCtrl

