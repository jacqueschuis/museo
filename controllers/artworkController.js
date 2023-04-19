const Museum = require('../models/museum');
const Artwork = require('../models/artwork');
const Artist = require('../models/artist');
// const {cloudinary} = require('../utilities/cloudinary');

module.exports.submitArtwork = async (req, res) => {
    const {museumId} = req.params;
    const artist = await Artist.findById(req.body.artwork.artist);
    const artwork = new Artwork(req.body.artwork);
    artwork.postedBy = req.user._id;
    artwork.museum = museumId;
    const image = {
        url: req.body.image,
        postedBy: req.user._id,
    };
    artwork.images.push(image);
    artist.artworks.push(artwork._id);
    console.log(artwork, artist);
}