const BaseJoi = require("joi");
const sanitizeHtml = require("sanitize-html");

const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.excapeHTML": "{{#label} must not include HTML!}",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});

const Joi = BaseJoi.extend(extension);

module.exports.artistSchema = Joi.object({
  artist: Joi.object({
    name: Joi.string().required(),
    bornDate: Joi.number().required(),
    deathDate: Joi.optional().allow("").allow(null),
  })
    .required()
    .when(Joi.object({ deathDeate: Joi.exist() }), {
      then: Joi.object({
        deathDate: Joi.number().greater(Joi.ref("bornDate")),
      }),
    }),
});

// // module.exports.artworkSchema =

// // module.exports.reviewSchema =
