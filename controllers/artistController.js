const Artist = require("../models/artist");
const Museum = require("../models/museum");
const Artwork = require("../models/artwork");
const artist = require("../models/artist");

module.exports.index = async (req, res) => {
  const museums = await Museum.find({});
  const artists = await Artist.find({});
  const allArtists = artists
  res.render("artist/index", { artists, museums, allArtists });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id)
    .populate("artworks")
    .populate("museums")
    .populate('postedBy')
  res.render("artist/show", { artist });
};

module.exports.filterArtists = async (req, res) => {
  const museums = await Museum.find({});
  const { name, filterBornDate, filterDeathDate, filterMuseum } = req.body;
  const allArtists = await Artist.find({})
  if (filterMuseum) {
    const artists = await Artist.find()
      .where("museums")
      .all([filterMuseum]);
    return res.render("artist/index", { artists, museums, allArtists });
  } if (filterBornDate && filterDeathDate) {
    const artists = await Artist.find({})
      .where("deathDate")
      .lte(filterDeathDate)
      .where("bornDate")
      .gte(filterBornDate);
    return res.render("artist/index", { artists, museums, allArtists });
  } if (filterBornDate) {
    const artists = await Artist.find({}).where("bornDate").gte(filterBornDate);
    return res.render("artist/index", { artists, museums, allArtists });
  } if (filterDeathDate) {
    const artists = await Artist.find({})
      .where("deathDate")
      .lte(filterDeathDate);
    return res.render("artist/index", { artists, museums, allArtists });
  } if (name) {
    const agg = [
      {
        $search: {
          index: "artist-name",
          autocomplete: {
            query: name,
            path: "name",
            fuzzy: {
              maxEdits: 1,
            },
          },
        },
      }
    ];
    const artists = await Artist.aggregate(agg);
    return res.render("artist/index", { artists, museums, allArtists });
  }
  const artists = await Artist.find({});
  res.render("artist/index", { artists, museums });
};

module.exports.renderNewArtistForm = async (req, res) => {
  res.render('artist/new');
}

module.exports.createNewArtist = async (req, res) => {
  const artist = new Artist(req.body.artist)
  artist.images = req.files.map(f => ({url: f.path, filename: f.filename}));
  artist.postedBy= req.user._id;
  await artist.save();
  req.flash('success', `${artist.name} added to museo`)
  res.redirect(`/artists/${artist._id}`);
}
