const Artist = require("../models/artist");
const Museum = require("../models/museum");
const Artwork = require("../models/artwork");
const artist = require("../models/artist");

module.exports.index = async (req, res) => {
  const museums = await Museum.find({});
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
  const museums = await Museum.find({});
  const { name, filterBornDate, filterDeathDate, filterMuseum } = req.body;
  if (filterMuseum) {
    console.log("museum");
    const artists = await Artist.find()
      .where("museums")
      .all([filterMuseum]);
    return res.render("artist/index", { artists, museums });
  }
  if (filterBornDate && filterDeathDate) {
    console.log("both dates");
    const artists = await Artist.find({})
      .where("deathDate")
      .lte(filterDeathDate)
      .where("bornDate")
      .gte(filterBornDate);
    return res.render("artist/index", { artists, museums });
  }
  if (filterBornDate) {
    console.log("birth only");
    const artists = await Artist.find({}).where("bornDate").gte(filterBornDate);
    return res.render("artist/index", { artists, museums });
  }
  if (filterDeathDate) {
    console.log("death only");
    const artists = await Artist.find({})
      .where("deathDate")
      .lte(filterDeathDate);
    return res.render("artist/index", { artists, museums });
  }
  if (name) {
    console.log("name only");
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
      // {
      //   $match: {
      //     bornDate: {$gte: parseInt(queryBornDate)},
      //     deathDate: {$lte: parseInt(queryDeathDate)},
      //   }
      // }
    ];
    const artists = await Artist.aggregate(agg);
    return res.render("artist/index", { artists, museums });
  }
  console.log("reg branch", queryBornDate, queryDeathDate);
  const artists = await Artist.find({});
  res.render("artist/index", { artists, museums });
};
