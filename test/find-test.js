const assert = require('assert');
const User   = require('../src/user');

describe('Query the user from the DB', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({
            name: 'Joe'
        });
        joe.save()
            .then(() => done());
    });

    it('Find all the users by the name of Joe', (done) => {
        User.find({name: 'Joe'})
            .then((users) => {
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            });
    });

    it('Finds all the users by the name of Joe', (done) => {
       User.findOne({_id: joe._id})
           .then((user) => {
               assert(user.name === 'Joe');
               done();
           });
    });
});
