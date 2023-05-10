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
  name: Joi.string().required(),
  bornDate: Joi.number().required(),
  deathDate: Joi.optional().allow("").allow(null),
}).when(Joi.object({ deathDate: Joi.exist() }), {
  then: Joi.object({
    deathDate: Joi.number().greater(Joi.ref("bornYear")),
  }),
});

module.exports.museumSchema = Joi.object({
  name: Joi.string().required(),
  url: Joi.string().required(),
  location: Joi.string().required(),
  summary: Joi.string().required(),
});

module.exports.imageSchema = Joi.object({
  url: Joi.string().required(),
});

module.exports.artworkSchema = Joi.object({
    title: Joi.string().required(),
    year: Joi.number().required(),
});
