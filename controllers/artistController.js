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
    (filterBornDate ? queryBornDate = filterBornDate : queryBornDate = -9999);
    (filterDeathDate ? queryDeathDate = filterDeathDate : queryDeathDate = 9999);
    (filterMuseum ? queryMuseum = filterMuseum : queryMuseum = null);
if (queryName) {
  console.log('queryname branch')
  const agg = [
    {
      $search: {
        index: "artist-name",
        autocomplete: {
          query: queryName,
          path: "name",
          "fuzzy": {
            "maxEdits": 2,
          }
        }
      }
    },
    {
      $match: {
        bornDate: {$gte: parseInt(queryBornDate)},
        deathDate: {$lte: parseInt(queryDeathDate)},
      }
    }
  ]
  const artists = await Artist.aggregate(agg)
  return res.render('artist/index', {artists, museums});
} if (queryMuseum) {
  console.log('querymuseum branch')
  const artists = await Artist.find()
    .where('bornDate').gte(queryBornDate)
    .where('deathDate').lte(queryDeathDate)
    .where('museums').all([queryMuseum]);
  return res.render('artist/index', {artists, museums})
}
console.log('reg branch')
  const artists = await Artist.find({})
    .where('bornDate').gte(parseInt(queryBornDate))
    .where('deathDate').lte(parseInt(queryDeathDate))
  res.render('artist/index', {artists, museums})
}