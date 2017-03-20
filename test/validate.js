const assert = require('assert');
const User  = require('../src/user');

describe('Recrods validation', () => {
   it('Requires a user name', (done) => {
       const user = new User({name: undefined});
       const validationRes = user.validateSync();
       const {message} = validationRes.errors.name;

       assert(message === 'Name is required');
       done();
   });
});