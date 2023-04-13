module.exports.devHome = (req, res) => {
    res.render('dev/devHome')
}

module.exports.newMuseumForm = (req, res) => {
    res.render('dev/devnewmuseum')
}

module.exports.newMuseumSubmit = async(req, res, next) => {
    console.log(req.body);
    res.redirect('/')
}