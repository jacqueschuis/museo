const User = require('../models/user');

module.exports.registerForm = (req, res) => {
    res.render('user/register')
}

module.exports.registerUser = async (req, res, next) => {
    res.redirect('/')
}

module.exports.loginForm = (req, res) => {
    res.redirect('/')
}

module.exports.loginUser = async (req, res) => {
    res.redirect('/')
}

module.exports.logout = (req,res,next) => {
    res.redirect('/')
}