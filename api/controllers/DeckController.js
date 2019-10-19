/**
 * DeckController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    let { description, type, category } = req.body,
      user = _.get(req, 'session.userId', 1),
      name = req.body.name.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
    Deck
      .create({
        user,
        name,
        description,
        type,
        category
      })
      .fetch()
      .exec((err, deck) => {
        if (err) {
          return res.serverError({
            name: 'serverError',
            message: err.message
          });
        }

        return res.json({
          data: {
            id: deck.id,
            name: name
          },
          meta: {}
        });
      });
  },

  publish: (req, res) => {
    const deckId = Number(_.get(req.params, 'id'));

    Deck
      .update({
        id: deckId
      })
      .set({
        isPublished: 1
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
  },

  getDeck: (req, res) => {
    const username = _.get(req.params, 'username'),
      deckName = _.get(req.params, 'deckname');

    async.waterfall([
      (next) => {
        User
          .findOne({
            username
          })
          .exec((err, user) => {
            return next(err, user.id);
          });
      },
      (userId, next) => {
        Deck
          .findOne({
            user: userId,
            name: deckName,
            isPublished: 1
          })
          .populate('links')
          .exec((err, deck) => {
            if (err || _.isUndefined(deck)) {
              return next(new Error('deckNotFoundError'));
            } 
            
            return next(null, deck);
          });
      }
    ], (err, deck) => {
      if (err) {
        if (err.message === 'deckNotFoundError') {
          return res.notFound();
        }

        return res.serverError({
          name: 'serverError',
          message: err.message
        });
      }

      return res.json({
        data: deck,
        meta: {}
      });
    });
  },

  getUserDecks: (req, res) => {
    const user = _.get(req, 'session.userId', 1);

    Deck
      .find({
        user
      })
      .exec((err, decks) => {
        if (err) {
          return res.serverError({
            name: 'serverError',
            message: err.message
          });
        }

        return res.json({
          data: decks,
          meta: {}
        });
      });
  }
};
