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
    (filterBornDate ? queryBornDate = filterBornDate : queryBornDate = -99999);
    (filterDeathDate ? queryDeathDate = filterDeathDate : queryDeathDate = 99999);
    (filterMuseum ? queryMuseum = filterMuseum : queryMuseum = null);
// if (queryName && filterMuseum) {
//   console.log('queryname and museum branch')
//   const agg = [
//     {
//       $search: {
//         index: "artist-name",
//         autocomplete: {
//           query: queryName,
//           path: "name",
//           "fuzzy": {
//             "maxEdits": 1,
//           }
//         }
//       }
//     },
//     // {
//     //   $match: {
//     //     museums: {$all: [queryMuseum]}
//     //   }
//     // }
//   ]
//   const artists = await Artist.aggregate(agg)
//   return res.render('artist/index', {artists, museums});
// } 
if (queryName && filterBornDate && filterDeathDate) {
  console.log('name birth death');
  const agg = [
    {
      $search: {
        index: "artist-name",
        autocomplete: {
          query: queryName,
          path: "name",
          "fuzzy": {
            "maxEdits": 1,
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
  const artists = await Artist.aggregate(agg);
  return res.render('artist/index', {artists, museums});
}
if (queryName && filterBornDate) {
  console.log('name birth');
  const agg = [
    {
      $search: {
        index: "artist-name",
        autocomplete: {
          query: queryName,
          path: "name",
          "fuzzy": {
            "maxEdits": 1,
          }
        }
      }
    },
    {
      $match: {
        bornDate: {$gte: parseInt(queryBornDate)},
    //     deathDate: {$lte: parseInt(queryDeathDate)},
      }
    }
  ]
  const artists = await Artist.aggregate(agg);
  return res.render('artist/index', {artists, museums});

}
if (queryName && filterDeathDate) {
  console.log('name death');
  const agg = [
    {
      $search: {
        index: "artist-name",
        autocomplete: {
          query: queryName,
          path: "name",
          "fuzzy": {
            "maxEdits": 1,
          }
        }
      }
    },
    {
      $match: {
        // bornDate: {$gte: parseInt(queryBornDate)},
        deathDate: {$lte: parseInt(queryDeathDate)},
      }
    }
  ]
  const artists = await Artist.aggregate(agg);
  return res.render('artist/index', {artists, museums});

} 
// if (queryMuseum && filterBornDate && filterDeathDate) {
//     console.log('museum born death');
//     const artists = await Artist.find()
//       .where('museums').all([queryMuseum])
//       .and([{birthDate: {$gte: queryBornDate}}, {deathDate: {$lte: queryDeathDate}}])
//       // .where('birthDate').gte(queryBornDate)
//       // .where('deathDate').lte(queryDeathDate);
//     return res.render('artist/index', {artists, museums});
//   } 
if (queryMuseum && filterDeathDate) {
    console.log('museum death');
    const artists = await Artist.find()
    .where('museums').all([queryMuseum])
    .where('deathDate').lte(queryDeathDate);
    return res.render('artist/index', {artists, museums});
}
if (queryMuseum) {
  console.log('museum only, museum birth')
  const artists = await Artist.find()
  .where('bornDate').gte(queryBornDate)
  .where('museums').all([queryMuseum]);
  return res.render('artist/index', {artists, museums})
}
if (filterBornDate && filterDeathDate) {
  console.log ('both dates');
  const artists = await Artist.find({})
  .where('deathDate').lte(queryDeathDate)
  .where('bornDate').gte(queryBornDate);
  return res.render('artist/index', {artists, museums});
}
if (filterBornDate) {
  console.log('birth only');
  const artists = await Artist.find({})
  .where('bornDate').gte(queryBornDate)
  return res.render('artist/index', {artists, museums})
}
if (filterDeathDate) {
  console.log('death only');
  const artists = await Artist.find({})
  .where('deathDate').lte(queryDeathDate);
  return res.render('artist/index', {artists, museums})
} 
if (queryName) {
  console.log('name only')
  const agg = [
    {
      $search: {
        index: "artist-name",
        autocomplete: {
          query: queryName,
          path: "name",
          "fuzzy": {
            "maxEdits": 1,
          }
        }
      }
    },
    // {
    //   $match: {
    //     bornDate: {$gte: parseInt(queryBornDate)},
    //     deathDate: {$lte: parseInt(queryDeathDate)},
    //   }
    // }
  ]
  const artists = await Artist.aggregate(agg);
  return res.render('artist/index', {artists, museums});
} 
console.log('reg branch', queryBornDate, queryDeathDate)
const artists = await Artist.find({})
res.render('artist/index', {artists, museums})
}