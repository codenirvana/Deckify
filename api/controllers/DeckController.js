/**
 * DeckController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createView: (req, res) => {
    res.view('pages/deck/create');
  },

  editView: (req, res) => {
    Deck
      .findOne({
        id: req.param('id')
      })
      .populate('links')
      .exec((err, deck) => {
        if (err || !deck) {
          return res.redirect('/create');
        }

        _.set(deck, 'username', _.get(req, 'session.username'));

        res.view('pages/deck/edit', deck);
      });
  },

  create: (req, res) => {
    let { description, category } = req.body,
      user = _.get(req, 'session.userId', 1),
      name = req.body.name.replace(/[^a-z0-9_]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();

    Deck
      .create({
        user,
        name,
        description,
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

  getDeckView: (req, res) => {
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

      // return res.json({
      //   data: deck,
      //   meta: {}
      // });

      res.view('pages/deck/view', deck);
    });
  },

  getUserDecksView: (req, res) => {
    const username = req.param('username'),
      sessionUserId = _.get(req, 'session.userId', 1);

    User
      .findOne({username})
      .exec((err, user) => {
        if (err || !user) {
          return res.serverError({
            name: 'serverError',
            message: err ? err.message : 'user not found'
          });
        }

        let query = { user: user.id };

        if (user.id !== sessionUserId) {
          query.isPublished = 1;
        }

        Deck
          .find(query)
          .exec((err, decks) => {
            if (err) {
              return res.serverError({
                name: 'serverError',
                message: err.message
              });
            }

            res.view('pages/deck/list', {decks});
          });
      });
  },

  removeLinkAssociation: (req, res) => {
    const deckId = Number(_.get(req, 'params.deckId')),
      linkId = Number(_.get(req, 'params.linkId'));

    Link
      .removeFromCollection(
        linkId,
        'decks',
        deckId
      )
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
