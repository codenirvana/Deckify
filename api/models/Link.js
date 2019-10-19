module.exports = {
  schema: true,
  primaryKey: 'id',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    name: {
      type: 'string',
      required: true
    },
    link: {
      type: 'string',
      required: true
    },
    comment: {
      type: 'string'
    },
    imageUrl: {
      type: 'string'
    },
    decks: {
      collection: 'deck',
      via: 'links'
    }
  }
};
