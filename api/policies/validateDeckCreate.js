const Ajv = require('ajv'),

  schema = {
    "$id": "http://json-schema.org/draft-04/schema#",
    "type": "object",
    "properties": {
      "name": {
        "type": "string"
      },
      "description": {
        "type": "string"
      },
      "type": {
        "type": "string",
        "enum": ["public", "private"]
      },
      "category": {
        "type": "string"
      }
    },
    "required": [
      "name",
      "description",
      "type",
      "category"
    ]
  },

  ajv = new Ajv(),
  validate = ajv.compile(schema);

module.exports = (req, res, next) => {
  const body = req.body,
    userId = _.get(req, 'session.userId', 1);

  if (!validate(body)) {
    return res.badRequest({
      name: 'invalidParamsError',
      message: validate.errors
    });
  }

  Deck
    .count({
      user: userId,
      name: body.name
    })
    .exec((err, count) => {
      if (err) { return next(err); }

      if (count > 0) {
        return res.badRequest({
          name: 'badRequest',
          message: 'Deck with this name already exists.'
        });
      }

      return next();
    });
};

