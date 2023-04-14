// const BaseJoi = require("joi");
// const sanitizeHtml = require("sanitize-html");

// const extension = (joi) => ({
//   type: "string",
//   base: joi.string(),
//   messages: {
//     "string.excapeHTML": "{{#label} must not include HTML!}",
//   },
//   rules: {
//     escapeHTML: {
//       validate(value, helpers) {
//         const clean = sanitizeHtml(value, {
//           allowedTags: [],
//           allowedAttributes: {},
//         });
//         if (clean !== value)
//           return helpers.error("string.escapeHTML", { value });
//         return clean;
//       },
//     },
//   },
// });

// const Joi = BaseJoi.extend(extension);

// // module.exports.museumSchema = Joi.object({
// //     museum: Joi.object({

// //     })
// // })

// // module.exports.artworkSchema =

// // module.exports.reviewSchema =
