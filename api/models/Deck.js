module.exports = {
  schema: true,
  primaryKey: 'id',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    user: {
      model: 'user'
    },
    isPublished: {
      type: 'number',
      defaultsTo: 0
    },
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string'
    },
    type: {
      type: 'string'
    },
    category: {
      type: 'string'
    },
    links: {
      collection: 'link',
      via: 'decks'
    }
  }
};
