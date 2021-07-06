/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name :{
      type:'string',
      required: true
    },
    email:{
      type:'string',
      required: true,
      unique: true
    },
    password:{
      type:'string',
      required: true,
    },

  },
  validationMessages: { //hand for i18n & l10n
    email: {
        required: 'Email is required',
        email: 'Provide valid email address',
        unique: 'Email address is already taken'
    },
    name: {
        required: 'Username is required'
    },
    password: {
        required: 'Username is required'
    }
},
  datastore: "mongodb"

};

