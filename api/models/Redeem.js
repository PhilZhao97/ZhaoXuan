
/**
 * Redeem.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    dining_id: {
      type: 'number'
    },

    user_id: {
      type: 'number',
    },

    user_name: {
      type: 'string'
    },

    title: {
      type: "string"
    },

    restaurant: {
      type: "string"
    },
    
    region: {
      type: "string"
    },

    mall: {
      type: "string"
    },

    image: {
      type: "string"
    },

    quota: {
      type: "number"
    },

    coins: {
      type: "number"
    },

    deal_valid_till: {
      type: "string"
    },

    detail: {
      type: "string"
    },

    has_redeemed: {
      type: 'boolean',
      defaultsTo: true
    }
  },

};

