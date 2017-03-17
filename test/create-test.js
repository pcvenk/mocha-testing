const assert = require('assert');
const User   = require('../src/user');

describe('Creating records', () => {
   it('saves a user', () => {
       let joe = new User({
           name: 'Joe'
       });

       joe.save();
   })
});
