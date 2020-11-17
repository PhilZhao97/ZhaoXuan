
/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: "string",
      unique: true,
      required: true
    },

    role: {
      type: "string",
      isIn: ['admin', 'member', 'visitor'],
      defaultsTo: 'visitor'
    },

    password: {
      type: "string",
      defaultsTo: 'admin'
    },

    coins: {
      type: "number",
      defaultsTo: 99999
    }

  },

};

