/**
 * LinkController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  create: (req, res) => {
    const { name, link, comment, deckId, imageUrl } = req.body;

    async.waterfall([
      (next) => {
        Link
          .find({
            link
          })
          .exec((err, links) => {
            return next(err, links);
          });
      },
      (links, next) => {
        if (links.length > 0) {
          return next(null, links[0].id);
        }

        Link
          .create({
            name,
            link,
            comment,
            imageUrl
          })
          .fetch()
          .exec((err, link) => {
            return next(err, link.id);
          });
      },
      (linkId, next) => {
        Link
          .addToCollection(linkId, 'decks', deckId)
          .exec((err) => {
            return next(err);
          });
      }
    ], (err) => {
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

  scrape: (req, res) => {
    const { link } = req.body;

    UtilService.scrape(link, (err, data) => {
      if (err) {
        return res.serverError({
          name: 'serverError',
          message: err.message
        });
      }

      return res.json({
        data: data,
        meta: {}
      });
    });
  }
};

