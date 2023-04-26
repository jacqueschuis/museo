const Artist = require('../models/artist');
const Museum = require('../models/museum');
const Artwork =require('../models/artwork');

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
      const artists = await Artist.aggregate(artistAgg);
      const museums = await Museum.aggregate(museumAgg);
      const artworks = await Artwork.aggregate(artworkAgg);
    res.render('app/search', {artists, museums, artworks, search});
}