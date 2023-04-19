const Artist = require('../models/artist');
const Museum = require('../models/museum');

module.exports.index = async (req, res) => {
    const artists = await Artist.find({});
    res.render('artist/index', {artists});
}