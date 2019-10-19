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
  '/': { view: 'pages/homepage' },
  '/login': { view: 'pages/login' },

  // DeckController
  'GET /create': 'DeckController.createView',
  'GET /create/:id': 'DeckController.authorView',
  'POST /v1/decks': 'DeckController.create',
  'POST /v1/decks/:id/publish': 'DeckController.publish',
  'GET /:username/:deckname': 'DeckController.getDeck',
  'GET /v1/decks': 'DeckController.getUserDecks',

  // AuthController
  '/authorize': 'AuthController.authorize',
  '/authorize/callback': 'AuthController.callbackHandler',

  // LinkController
  'POST /v1/links': 'LinkController.create'

};
