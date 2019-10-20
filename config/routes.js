/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  // Views
  '/login': { view: 'pages/login' },

  // NavController
  'GET /': 'NavController.home',
  'GET /create': 'NavController.createDeck',
  'GET /me': 'NavController.userDecks',

  // DeckController
  'GET /create/:id': 'DeckController.editView',
  'POST /v1/decks': 'DeckController.create',
  'POST /v1/decks/:id/publish': 'DeckController.publish',
  'GET /:username/:deckname': 'DeckController.getDeckView',
  'GET /:username': 'DeckController.getUserDecksView',

  // AuthController
  '/authorize': 'AuthController.authorize',
  '/authorize/callback': 'AuthController.callbackHandler',

  // LinkController
  'POST /v1/links': 'LinkController.create',
  'POST /v1/links/scrape': 'LinkController.scrape'

};
