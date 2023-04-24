const Artist = require("../models/artist");
const Museum = require("../models/museum");
const Artwork = require("../models/artwork");

module.exports.index = async (req, res) => {
  const museums = await Museum.find({})
  const artists = await Artist.find({});
  res.render("artist/index", { artists, museums });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id)
    .populate("artworks")
    .populate("museums");
  res.render("artist/show", { artist });
};

module.exports.filterArtists = async (req, res) => {
    const museums = await Museum.find({})
    const {name, filterBornDate, filterDeathDate, filterMuseum} = req.body;
    (name ? queryName = name : queryName = null);
    (filterBornDate ? queryBornDate = filterBornDate : queryBornDate = null);
    (filterDeathDate ? queryDeathDate = filterDeathDate : queryDeathDate = null);
    (filterMuseum ? queryMuseum = filterMuseum : queryMuseum = null);
    console.log(queryBornDate,queryDeathDate,queryMuseum,queryName);

    const agg = [
      {$search: {autocomplete: {query: queryName, path: "name"}}},
      {$limit: 20},
      {$project: {_id: 0, name:1}}
    ]

    const filteredArtists = await Artist.aggregate(agg)
        
    console.log(filteredArtists);
    const artists = await Artist.find({})
    res.render('artist/index', {artists, museums})
}