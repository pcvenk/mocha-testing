const assert = require('assert');
const User   = require('../src/user');

describe('Embedding subdocuments', () => {
   it('Creating a subdocument', (done) => {
       let user = new User({
           name: 'Joe',
           posts: [{title: 'PostTitle'}]
       });

       user.save()
           .then(() => User.findOne({name: 'Joe'}))
           .then((user) => {
               assert(user.posts[0].title === 'PostTitle');
               done();
           });
   });
});
