const Artist = require("../models/artist");
const Museum = require("../models/museum");
const Artwork = require("../models/artwork");

module.exports.index = async (req, res) => {
  const museums = await Museum.find({});
  const artists = await Artist.find({});
  const allArtists = artists;
  res.render("artist/index", { artists, museums, allArtists });
};

module.exports.show = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id)
    .populate("artworks")
    .populate("museums")
    .populate("postedBy");
  res.render("artist/show", { artist });
};

module.exports.filterArtists = async (req, res) => {
  const museums = await Museum.find({});
  const { name, filterBornDate, filterDeathDate, filterMuseum } = req.body;
  const allArtists = await Artist.find({});
  if (filterMuseum) {
    const artists = await Artist.find().where("museums").all([filterMuseum]);
    return res.render("artist/index", { artists, museums, allArtists });
  }
  if (filterBornDate && filterDeathDate) {
    const artists = await Artist.find({})
      .where("deathDate")
      .lte(filterDeathDate)
      .where("bornDate")
      .gte(filterBornDate);
    return res.render("artist/index", { artists, museums, allArtists });
  }
  if (filterBornDate) {
    const artists = await Artist.find({}).where("bornDate").gte(filterBornDate);
    return res.render("artist/index", { artists, museums, allArtists });
  }
  if (filterDeathDate) {
    const artists = await Artist.find({})
      .where("deathDate")
      .lte(filterDeathDate);
    return res.render("artist/index", { artists, museums, allArtists });
  }
  if (name) {
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
      },
    ];
    const artists = await Artist.aggregate(agg);
    return res.render("artist/index", { artists, museums, allArtists });
  }
  const artists = await Artist.find({});
  res.render("artist/index", { artists, museums });
};

module.exports.renderNewArtistForm = async (req, res) => {
  res.render("artist/new");
};

module.exports.newByUpload = async (req, res) => {
  const artist = new Artist(req.body.artist);
  artist.images = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  artist.postedBy = req.user._id;
  await artist.save();
  req.flash("success", `${artist.name} added to museo`);
  res.redirect(`/artists/${artist._id}`);
};

module.exports.newByUrl = async (req, res) => {
  console.log(req.body);
  const image = {
    url: req.body.imageUrl,
  };
  const { artist } = req.body;
  const newArtist = new Artist(artist);
  newArtist.images.push(image);
  newArtist.postedBy = req.user._id;
  await newArtist.save();
  req.flash("success", `${newArtist.name} added to museo`);
  res.redirect(`/artists/${newArtist._id}`);
};

module.exports.deleteArtist = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id);
  await Artwork.deleteMany({ artist: id });
  await Artist.findByIdAndDelete(id);
  req.flash("success", `${artist.name} removed from museo`);
  res.redirect("/artists");
};

module.exports.editArtistForm = async (req, res) => {
  const { id } = req.params;
  const artist = await Artist.findById(id);
  res.render("artist/edit", { artist });
};
