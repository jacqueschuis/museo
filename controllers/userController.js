const User = require('../models/user');

module.exports.registerForm = (req, res) => {
    res.render('user/register')
}

module.exports.registerUser = async (req, res, next) => {
    try {
        const {email, username, password, firstName, lastName } = req.body;
        const isAdmin = false;
        const user = new User({email,username,firstName,lastName, isAdmin });
        const registeredUser = await User.register(user,password);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', 'welcome back');
            res.redirect('/')
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.loginForm = (req, res) => {
    res.render('user/login')
}

module.exports.loginUser = async (req, res) => {
    req.flash('success', 'welcome back!');
    const redirectUrl = req.session.returnTo || '/';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'you have been signed out')
        res.redirect('/')
    })
}