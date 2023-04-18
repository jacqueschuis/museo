const Museum = require('../models/museum');
const Artwork = require('../models/artwork');
const {cloudinary} = require('../utilities/cloudinary');

module.exports.submitArtwork = async (req, res) => {
    const {id} = req.params;
    const museum = await Museum.findById(id);
    const artwork = new Artwork(req.body.artwork);
    artwork.postedBy = req.user._id;
    artwork.museum.push(museum);
    const image = {
        url: req.body.image,
        postedBy: req.user._id,
    };
    artwork.images.push(image);
    console.log(artwork);

}