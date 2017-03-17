const assert = require('assert');
const User   = require('../src/user');

describe('Creating records', () => {
   it('creates and saves a user', (done) => {
       let joe = new User({
           name: 'Joe'
       });

       joe.save()
           .then(() => {
               //has the new user been saved successfully?
               assert(!joe.isNew);
               done();
           });
   })
});
