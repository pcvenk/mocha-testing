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

   it('Adding subdocuments to an existing record', (done) => {
       let user = new User({
           name: 'Joe',
           posts: []
       });

       user.save()
       //the user does not need to be returned, since the function implicitly returns it
           .then(() => User.findOne({name: 'Joe'}))
           .then((user) => {
               user.posts.push({title: 'Second Post Title'});
               //return the user to chain another promise to it
               return user.save();
           })
           .then(() => User.findOne({name: 'Joe'}))
           .then((user) => {
               assert(user.posts[0].title = 'Second Post Title');
               done();
           });
   });
});
