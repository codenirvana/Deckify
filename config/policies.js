/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': 'sessionAuth',

  NavController: {
    createDeck: [],
    userDecks: [],
    home: []
  },

  AuthController: {
    authorize: [],
    callbackHandler: []
  },

  DeckController: {
    create: ['sessionAuth', 'validateDeckCreate'],
    publish: ['sessionAuth'],
    getDeck: [],
    getUserDecks: ['sessionAuth']
  },

  LinkController: {
    create: ['sessionAuth']
  }
};
