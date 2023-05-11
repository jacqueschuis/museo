const Artist = require("../models/artist");
const Museum = require("../models/museum");
const Artwork = require("../models/artwork");

module.exports.searchMuseo = async (req, res) => {
  const { search } = req.body;
  const artistAgg = [
    {
      $search: {
        index: "artist-name",
        autocomplete: {
          query: search,
          path: "name",
          fuzzy: {
            maxEdits: 1,
          },
        },
      },
    },
  ];
  const museumAgg = [
    {
      $search: {
        index: "default",
        autocomplete: {
          query: search,
          path: "name",
          fuzzy: {
            maxEdits: 1,
          },
        },
      },
    },
  ];
  const artworkAgg = [
    {
      $search: {
        index: "artwork-name",
        autocomplete: {
          query: search,
          path: "title",
          fuzzy: {
            maxEdits: 1,
          },
        },
      },
    },
  ];
  const artists = await Artist.aggregate(artistAgg).limit(5);
  const museums = await Museum.aggregate(museumAgg).limit(5);
  const artworks = await Artwork.aggregate(artworkAgg).limit(5);
  res.render("app/search", { artists, museums, artworks, search });
};

module.exports.renderSearch = (req, res) => {
  res.render('app/searchWidget')
}
