/**
 * DeckController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    const { name, description, type, category } = req.body,
      user = _.get(req, 'session.userId', 1);

    Deck
      .create({
        user,
        name,
        description,
        type,
        category
      })
      .exec((err) => {
        if (err) {
          return res.serverError({
            name: 'serverError',
            message: err.message
          });
        }

        return res.json({
          data: {},
          meta: {}
        });
      });
  }
};
